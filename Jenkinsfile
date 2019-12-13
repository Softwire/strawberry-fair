node (label: 'linux') {
    try {
        checkout scm

        stage('Merge into prod') {
            sh 'git checkout SF-29-prod'
            sh 'git merge --no-ff origin/SF-29'
        }

        docker.image('node:12.13').inside {
            withEnv(['HOME="."' ]) {
                dir('frontend'){
                    stage('Build') {
                        sh 'node --version'
                        sh 'npm install'
                        
                    }
                    stage('Test') {
                        sh 'npm run lint'
                        sh 'npm run test'
                        sh 'npm run build'
                    }
                } 
            }
        }
        
        stage('Deploy') {
            echo 'Tests successful. Deploying to production...'
            sh 'git push origin HEAD:SF-29-prod'
        }
    } catch (e) {
        currentBuild.result = 'FAILED'
    } finally {
        stage('Notify') {
            def currentResult = currentBuild.result ?: 'SUCCESS'
            if (currentResult == 'SUCCESS') {
                color = 'GREEN'
                colorCode = '#00FF00'
                echo 'Successfully executed!'
                notifySlack(colorCode, 'Merge to production successful! :)')
            } else {
                def colorName = 'RED'
                def colorCode = '#FF0000'
                echo 'Unsuccessful'
                notifySlack(colorCode, 'Merge to production failed! :(')
            }
        }
    }
}

def notifySlack(color, message) {
    withCredentials([string(credentialsId: 'slack-token', variable: 'SLACKTOKEN')]) {
        slackSend color: color, teamDomain: "softwire", channel: "#team-strawberryfair-jenkins", token: "$SLACKTOKEN", message: "*${message}* - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    }
}