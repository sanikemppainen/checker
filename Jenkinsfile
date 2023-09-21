pipeline {

environment {
    backendDockerImage = "ksaniksani/checker-backend"  
    frontendDockerImage = "ksaniksani/checker-frontend" 
    def dockerBackendImage = ""
    def dockerFrontendImage = ""
}

   agent any

stages {

    stage('Checkout github source') {
        steps {
            git url:'https://github.com/sanikemppainen/checker',
                branch: "main"
            }
        }
    

    stage('Build Backend Image') {
        steps {
            script {
                dockerBackendImage = docker.build("ksaniksani/checker-backend:latest", "./backend")

            }
        }
    }

    stage('Push Backend Image') {
        environment {
            registryCredential = 'dockerhub-credentials'
        }
        steps {
            script {
                docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                    dockerBackendImage.push("latest")
                }
            }
        }
    }

    stage('Build Frontend Image') {
        steps {
            script {
                dockerFrontendImage = docker.build("ksaniksani/checker-frontend:latest", "./frontend")
            }
        }
    }

    stage('Push Frontend Image') {
        environment {
            registryCredential = 'dockerhub-credentials'
        }
        steps {
            script {
                docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                    dockerFrontendImage.push("latest")
                }
            }
        }
    }


    stage('Deploying React.js container to Kubernetes') {
        steps {
            script {
                withCredentials([kubeconfig(credentialsId: 'kubernetes-credentials', variable: 'KUBECONFIG')]) {
                        sh 'kubectl apply --kubeconfig=$KUBECONFIG -f deployment.yaml'
                        sh 'kubectl apply --kubeconfig=$KUBECONFIG -f service.yaml'
                }
            }
        }
    }

}

    post { 
        always { 
            cleanWs()
        }
    }

}