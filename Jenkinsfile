pipeline{
    agent any
    tools {
        maven 'Maven'
        dockerTool 'Docker'
        ansible 'Ansible'
    }
    environment {
        REGISTRY = "farmanahmed888"
    }
    stages{
        stage('Clean Previous Docker Containers and Images') {
            steps {
                script {
                    sh 'docker stop $(docker ps -a -q) || true'
                    sh 'docker rm $(docker ps -a -q) || true'
                    sh 'docker rmi $(docker images -q) || true'
                }
            }
        }
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/farmanahmed888/SPEProject.git'
                }
            }
        }
        stage('Build discovery-server') {
            steps {
                dir('backend/discovery-server') {
                    sh 'mvn clean package'
                }
                sh 'mv backend/discovery-server/target/discovery-server-0.0.1-SNAPSHOT.jar jars/discovery-server.jar'
            }
        }
        stage('Build loadbalancer') {
            steps {
                dir('backend/loadbalancer') {
                    sh 'mvn clean package'
                }
                sh 'mv backend/loadbalancer/target/loadbalancer-0.0.1-SNAPSHOT.jar jars/loadbalancer.jar'
            }
        }
        stage('Build JAR Files'){
            parallel{
                stage('Build candidate-service') {
                    steps {
                        dir('backend/candidate-service') {
                            sh 'mvn clean package'
                        }
                        sh 'mv backend/candidate-service/target/candidate-service-0.0.1-SNAPSHOT.jar jars/candidate-service.jar'
                    }
                }
                stage('Build interviewer-service') {
                    steps {
                        dir('backend/interviewer-service') {
                            sh 'mvn clean package'
                        }
                        sh 'mv backend/interviewer-service/target/interviewer-service-0.0.1-SNAPSHOT.jar jars/interviewer-service.jar'
                    }
                }
            }
        }
        stage('Build Backend Docker Images') {
            steps {
                sh """
                docker build -t ${REGISTRY}/discovery-server:latest -f service-docker-files/discoveryServerDockerfile .
                docker build -t ${REGISTRY}/loadbalancer:latest -f service-docker-files/loadbalancerDockerfile .
                docker build -t ${REGISTRY}/candidate-service:latest -f service-docker-files/candidateServiceDockerfile .
                docker build -t ${REGISTRY}/interviewer-service:latest -f service-docker-files/interviewerServiceDockerfile .
                docker build -t ${REGISTRY}/codeeditor-service:latest -f service-docker-files/codeEditorServiceDockerfile .
                """
            }
        }
        stage('Build Frontend Docker Images') {
            steps {
                sh """
                docker build -t ${REGISTRY}/codeeditor-frontend:latest -f frontend-docker-files/codeEditorFrontendDockerfile .
                docker build -t ${REGISTRY}/candidate-frontend:latest -f frontend-docker-files/candidateFrontendDockerfile .
                docker build -t ${REGISTRY}/interviewer-frontend:latest -f frontend-docker-files/interviewerFrontendDockerfile .
                """
            }
        }

        stage('Push Docker Images') {
            steps {
                sh """
                docker push ${REGISTRY}/discovery-server:latest
                docker push ${REGISTRY}/loadbalancer:latest
                docker push ${REGISTRY}/candidate-service:latest
                docker push ${REGISTRY}/interviewer-service:latest
                docker push ${REGISTRY}/codeeditor-service:latest
                docker push ${REGISTRY}/codeeditor-frontend:latest
                docker push ${REGISTRY}/candidate-frontend:latest
                docker push ${REGISTRY}/interviewer-frontend:latest
                """
            }
        }


        stage('Ansible Deploy'){
            steps{
                echo 'Deploying the project...'
            }
        }
    }
}