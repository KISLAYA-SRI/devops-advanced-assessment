pipeline{
    agent any 

    environment {
        IMAGE_NAME="node-app"
        IMAGE_TAG="${env.BUILD_ID}"
    }

    stages{
        stage('npm install') {
            steps {
                dir("node_app"){
                    sh 'npm install'
                }
            }
        }
        stage('npm test') {
            steps {
                dir("node_app"){
                    sh 'npm test'
                }
            }
        }
        stage('sonar') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                  	input(id: "sonar", message: "SonarQube", ok: 'OK')
                }
                dir("node_app"){
                    sh 'sonar-scanner \
                            -Dsonar.projectKey=kislaya \
                            -Dsonar.host.url=http://35.206.100.225:9000 \
                            -Dsonar.login="${sonar_cred}"' 
                }    
            }
        }

        stage('Docker build image') {
            steps {
                script{
                        sh "docker build -t kissriva/node-app ."
                }
            }
        }
        stage('Docker push image') {
            steps {
                script{
                    sh 'docker push kissriva/node-app'
                }
            }
        }
        
        stage("Install Docker"){
            steps{
                script{
                    ansiblePlaybook credentialsId: 'ansible-pvt-key', disableHostKeyChecking: true, inventory: 'ansible/dev.inv', playbook: 'ansible/install_docker.yaml'
                }
            }
        }
        stage("Deploy docker image"){
            steps{
                script{
                    ansiblePlaybook credentialsId: 'ansible-pvt-key', inventory: 'ansible/dev.inv', playbook: 'ansible/run_docker.yaml'
                }
            }
        }
    }
    post{
        always{
            deleteDir()
        }
    }
}
