pipeline {
    agent any
    
    environment {
        BASE_URL = credentials('BASE_URL')  // Use Jenkins credentials for secrets
        NVM_DIR = "$HOME/.nvm"
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
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm install --lts
                    nvm use --lts
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
                    npm ci
                '''
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
                    npx playwright install --with-deps
                '''
            }
        }

        stage('Install xvfb (Headless Display)') {
            steps {
                sh 'sudo apt-get install xvfb -y'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
                    xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npm run test:playwright
                '''
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
                    xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npm run test:cucumber
                '''
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
