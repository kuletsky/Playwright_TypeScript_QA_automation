pipeline {
    agent any
    
    environment {
        BASE_URL = credentials('BASE_URL')  // Use Jenkins credentials for secrets
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Setup Node.js') {
            steps {
                sh 'nvm use lts/* || nvm install lts/*' // Using Node.js LTS version
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Install xvfb (Headless Display)') {
            steps {
                sh 'sudo apt-get install xvfb'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npm run test:playwright'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                sh 'xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npm run test:cucumber'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                archiveArtifacts artifacts: 'cucumber-report.html', fingerprint: true
            }
        }
    }
}