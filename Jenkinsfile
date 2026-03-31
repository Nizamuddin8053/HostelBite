pipeline {
    agent any

    // tools {
    //     // nodejs 'node18'
        
        
    // }

    environment {
        FRONTEND_DIR = '.'
        BACKEND_DIR = 'backend'
        VERCEL_TOKEN = credentials('vercel-token')
        RENDER_DEPLOY_HOOK = credentials('render-hook')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Nizamuddin8053/HostelBite.git'
            }

        }

        stage('Install Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend'){
            steps {
                dir("${FRONTEND_DIR}"){
                    bat 'npm run build'
                }
            }
        }

        stage('Install Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'echo "Add tests later"'
                }
            }
        }

        stage('Deploy Frontend on Vercel'){
            steps {
                bat '''
                npm install -g vercel
                vercel --prod --token=$VERCEL_TOKEN --confirm
                '''
            }
        }

        stage('Deploy Backend on Render') {
            steps {
                bat '''
                curl -X POST $RENDER_DEPLOY_HOOK
                '''
            }
        }
    }
}