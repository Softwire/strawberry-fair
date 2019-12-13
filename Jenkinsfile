node (label: 'linux') {
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
}
