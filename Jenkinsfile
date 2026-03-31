pipeline {
    agent any

    environment {
        VERCEL_TOKEN = "hostelbite-vercel-token"
    }
    
    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/Nizamuddin8053/HostelBite.git'
            }
        }

        // ================= BACKEND =================
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    bat 'echo Backend Ready'
                }
            }
        }

        // ================= FRONTEND =================
        stage('Install Frontend Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                bat '''
                set CI=false
                npm run build
                '''
            }
        }

        // ================= DEPLOY FRONTEND =================
        stage('Deploy to Vercel') {
            steps {
                bat """
                npx vercel --prod --token=%VERCEL_TOKEN% --confirm
                """
            }
        }

        // ================= BACKEND DEPLOY =================
        stage('Trigger Render Deploy') {
            steps {
                bat """
                curl -X POST https://api.render.com/deploy/srv-d74i2os50q8c73e0h870?key=RqU-0nb0AyM
                """
            }
        }
    }
}