node (label: 'linux') {
    checkout scm

    withEnv([
        """COMMIT_AUTHOR=${sh(
            returnStdout: true,
            script: 'git show -s --pretty=%an'
        ).trim()}""",
        """COMMIT_HASH_SHORT=${sh(
            returnStdout: true,
            script: 'git rev-parse --short HEAD'
        ).trim()}""",
        """COMMIT_SUBJECT=${sh(
            returnStdout: true,
            script: 'git show -s --format=%B'
        ).trim()}""",
        "CLOUDINARY_CLOUD_NAME='strawberryfair'",
        "CLOUDINARY_API_KEY='631814456675255'",
        "HOME=${WORKSPACE}"
    ]) {
        try {
            stage('Merge into prod') {
                sh 'git checkout -f sf-170-prod'
                sh 'git merge --no-ff -X theirs origin/sf-170'
            }

            docker.image('node:12.13').inside {
                dir('frontend'){
                    stage('Build') {
                        sh 'node --version'
                        sh 'npm ci'
                        
                    }
                    stage('Test') {
                        withCredentials([string(credentialsId: 'CLOUDINARY_API_SECRET', variable: 'CLOUDINARY_API_SECRET')]) {                           
                            sh 'npm run lint'
                            sh 'npm run test'
                            sh 'npm run build'
                        }
                    }
                } 
            }
            
            stage('Deploy') {
                echo 'Tests successful.'
                dir('frontend') {
                    echo 'Committing build artefact.'
                    sh 'git rm .gitignore'
                    sh 'git add public'
                    sh 'git commit --amend --no-edit'
                    sh 'git push origin HEAD:sf-170-prod'
                }

            }
        } catch (e) {
            currentBuild.result = 'FAILED'
        } finally {
            stage('Notify') {
                currentBuild.result = currentBuild.result ?: 'SUCCESS'
                
                // Notify via slack
                if (currentBuild.result == 'SUCCESS') {
                    color = 'GREEN'
                    colorCode = '#00FF00'
                    echo 'Successfully executed!'
                   // notifySlack(colorCode, 'Success! :)', COMMIT_AUTHOR, COMMIT_HASH_SHORT, COMMIT_SUBJECT)
                } else {
                    def colorName = 'RED'
                    def colorCode = '#FF0000'
                    echo 'Unsuccessful'
                   // notifySlack(colorCode, '@here Failure! :(', COMMIT_AUTHOR, COMMIT_HASH_SHORT, COMMIT_SUBJECT)
                    /*
                    // Notify via emails
                    emailext body: """${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}.
                            \n${getCommitInfoMessage(COMMIT_AUTHOR, COMMIT_HASH_SHORT, COMMIT_SUBJECT)}
                            \nMore info at: ${env.BUILD_URL}""",
                        subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                        to: "Team-StrawberryFair@softwire.com"
                        */
                    
                }
            }
            stage('Clean') {
                deleteDir()
            }
        }
    } 
}

def notifySlack(color, message, commitAuthor, commitHashShort, commitSubject) {
    withCredentials([string(credentialsId: 'slack-token', variable: 'SLACKTOKEN')]) {
        slackSend color: color, 
            teamDomain: "softwire", 
            channel: "#team-strawberryfair-build", 
            token: "$SLACKTOKEN", 
            message: """*${message}* - ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>). \n${getCommitInfoMessage(commitAuthor, commitHashShort, commitSubject)} """
    }
}

def getCommitInfoMessage(commitAuthor, commitHashShort, commitSubject) {
    return "Build triggered by ${commitAuthor}'s commit ${commitHashShort}: ${commitSubject}"
}