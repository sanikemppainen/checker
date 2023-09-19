pipeline {

environment {
    backendDockerImage = "ksaniksani/checker-backend"  
    frontendDockerImage = "ksaniksani/checker-frontend" 
    dockerBackendImage = ""
    dockerFrontendImage = ""
}

   agent {
        docker {
            image 'docker:20.10'  // Use a Docker-capable agent image
        }
    }

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
                 // Define the Dockerfile location and image name
                def dockerfile = './Dockerfile'  // Path to your Dockerfile
                def imageName = 'ksaniksani/checker-backend:latest'

                // Build the Docker image
                docker.build(imageName, '-f ' + dockerfile + ' .')
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