pipeline {
    agent any
    
    environment {
        BASE_URL = credentials('BASE_URL')  
        NVM_DIR = "/var/lib/jenkins/.nvm"
        PATH = "$NVM_DIR/versions/node/v22.13.1/bin:$PATH"
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
                    export NVM_DIR="/var/lib/jenkins/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    nvm install 22.13.1
                    nvm use 22.13.1
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    export NVM_DIR="/var/lib/jenkins/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    npm ci
                '''
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh '''
                    export NVM_DIR="/var/lib/jenkins/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                    
                    # Ensure required system dependencies are installed
                    sudo apt-get update
                    sudo apt-get install -y libx11-xcb1 libxcomposite1 libxrandr2 libgbm-dev libnss3 libatk-bridge2.0-0 libatk1.0-0 libxss1 libgtk-3-0

                    # Install Playwright dependencies
                    npx playwright install --with-deps
                '''
            }
        }

        stage('Install Xvfb (Headless Display)') {
            steps {
                sh '''
                    sudo apt-get update
                    sudo apt-get install -y xvfb
                    which xvfb-run  # Verify that xvfb-run is installed
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    export NVM_DIR="/var/lib/jenkins/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

                    # Verify Xvfb is available
                    which xvfb-run || { echo "Error: xvfb-run not found"; exit 1; }

                    xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npm run test:playwright
                '''
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                sh '''
                    export NVM_DIR="/var/lib/jenkins/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

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
