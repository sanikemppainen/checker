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

    withEnv(['AZURE_SUBSCRIPTION_ID=2fb3df47-cbc0-4acb-9d14-6a6cbffae88d','AZURE_TENANT_ID=03347ba1-ebe2-43d2-89ac-2dae816a3cff']) {
        stage('deploy') {
            
            def resourceGroup = 'myResourceGroup'
            def webAppName = 'checkerApp-1'
            // login Azure
            withCredentials([usernamePassword(credentialsId: 'azureserviceprincipal-credentials', passwordVariable: 'AZURE_CLIENT_SECRET', usernameVariable: 'AZURE_CLIENT_ID')]) {
                sh '''
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID
                    az account set -s $AZURE_SUBSCRIPTION_ID
                    '''
            
            }
        }
    }
    
    post { 
        always { 
            cleanWs()
        }
    }

}