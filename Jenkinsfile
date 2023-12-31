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
    stage('Build compose Image') {
        steps {
            script {
                dockerComposeImage = docker.build("ksaniksani/checker-compose:latest", ".")
            }
        }
    }

    stage('Push compose Image') {
        environment {
            registryCredential = 'dockerhub-credentials'
        }
        steps {
            script {
                docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                    dockerComposeImage.push("latest")
                }
            }
        }
    }

    stage('Deploy to Azure Web App') {
        steps {
            script {
                withCredentials([azureServicePrincipal('az-service-principal-credentials')]) {

                    def azureAppServiceName = 'checkerApp-12'

                    sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'

                    sh "az account set --subscription 2fb3df47-cbc0-4acb-9d14-6a6cbffae88d"

                    sh "az webapp config container set --name ${azureAppServiceName} --resource-group DefaultResourceGroup-NOE --docker-custom-image-name ksaniksani/checker-backend:latest"

                    sh "az webapp restart --name ${azureAppServiceName} --resource-group DefaultResourceGroup-NOE"

                    sh "az webapp config container set --name ${azureAppServiceName} --resource-group DefaultResourceGroup-NOE --docker-custom-image-name ksaniksani/checker-frontend:latest"

                    sh "az webapp restart --name ${azureAppServiceName} --resource-group DefaultResourceGroup-NOE"
                
                    sh "az webapp config container set --name ${azureAppServiceName} --resource-group DefaultResourceGroup-NOE --docker-custom-image-name ksaniksani/checker-compose:latest"

                    sh "az webapp restart --name ${azureAppServiceName} --resource-group DefaultResourceGroup-NOE"
                
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