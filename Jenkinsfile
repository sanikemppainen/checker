pipeline {

environment {
    BACKEND_IMAGE = "ksaniksani/checker-backend"  
    FRONTEND_IMAGE = "ksaniksani/checker-frontend" 
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
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
                    docker.withRegistry(DOCKERHUB_CREDENTIALS) {
                        def backendImage = docker.build(BACKEND_IMAGE)
                        backendImage.push()
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
                dockerFrontendImage = docker.build frontendDockerImage
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
            kubernetesDeploy(configs: "deployment.yaml", "service.yaml")
            }
        }
    }

    }

}