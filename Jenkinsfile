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
                    sh 'npm test test'
                }
            }
        }
        stage('sonar') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                  	input(id: "sonar", message: "SonarQube", ok: 'OK')
                }
                dir("node_app"){
                    // sh 'mvn clean verify sonar:sonar \
                    //         -Dsonar.projectKey=kislaya \
                    //         -Dsonar.host.url=http://35.206.100.225:9000 \
                    //         -Dsonar.login=sqp_6ab0c20b3f0ae2249d921f656dc8930bb7f6fec7' 
                    sh "echo hello"
                }    
            }
        }

        stage('Docker build image') {
            steps {
                script{
                        sh "docker build -t kissriva/node-app"
                }
            }
        }
        stage('Docker push image') {
            steps {
                script{
                    dir("Api1"){
                        withDockerRegistry(credentialsId: 'nexus', url: "http://${NEXUS_DOCKER_URL}") {
                            sh "docker tag simple-app ${NEXUS_DOCKER_URL}/${IMAGE_NAME}:${IMAGE_TAG}"
                            sh "docker push ${NEXUS_DOCKER_URL}/${IMAGE_NAME}:${IMAGE_TAG}"
                        }
                    }
                }
            }
        }
        
        stage("Install Docker"){
            steps{
                script{
                    ansiblePlaybook credentialsId: 'jenkins-chat-app', disableHostKeyChecking: true, inventory: 'ansible/dev.inv', playbook: 'ansible/install_docker.yaml'
                }
            }
        }
        stage("Deploy docker image"){
            steps{
                script{
                    timeout(time: 5, unit: 'MINUTES') {
                		input(id: "private-repo", message: "private repo", ok: 'ok')
                    }
                    ansiblePlaybook credentialsId: 'jenkins-chat-app', extras: '--extra-vars="image_tag=${IMAGE_TAG}"', inventory: 'ansible/dev.inv', playbook: 'ansible/run_docker.yaml', vaultCredentialsId: 'ansible-vault'
                }
            }
        }
    }
    post{
        always{
            deleteDir()
            sh "docker rmi ${NEXUS_DOCKER_URL}/${IMAGE_NAME}:${IMAGE_TAG}"
        }
    }
}