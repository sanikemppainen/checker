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

    stages {
        stage('Deploy to Azure Web App') {
            steps {
                script {
                    def azureCredentials = credentials('az-service-principal-credentials')
                    def azureAppServiceName = 'checkerApp-12'
                    def dockerImage1 = 'backendDockerImage'
                    def dockerImage2 = 'frontendDockerImage'

                    sh "az login --service-principal -u ${azureCredentials.username} -p ${azureCredentials.secret} --tenant ${azureCredentials.tenant}"

                    sh "az account set --subscription  ${azureCredentials.subscriptionId}"

                    sh "az webapp config container set --name ${azureAppServiceName} --resource-group your-resource-group-name --docker-custom-image-name ${dockerImage1}"

                    sh "az webapp restart --name ${azureAppServiceName} --resource-group your-resource-group-name"

                    sh "az webapp config container set --name ${azureAppServiceName} --resource-group your-resource-group-name --docker-custom-image-name ${dockerImage2}"

                    sh "az webapp restart --name ${azureAppServiceName} --resource-group your-resource-group-name"
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