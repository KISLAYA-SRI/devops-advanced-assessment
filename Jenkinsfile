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
                    // sh 'npm test'
                    sh "echo testing"
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
    // post{
    //     always{
    //         //deleteDir()
    //     }
    // }
}