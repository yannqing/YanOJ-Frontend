pipeline {
    agent any
    environment {
        GIT_URL = 'git@github.com:yannqing/YanOJ-Frontend.git'
        APP_NAME = 'yanoj-frontend'
        APP_PROFILE = 'prod'
        APP_IMAGE = 'yanoj-frontend:latest'
        APP_PORT = '3101:80'
    }

    stages {
        stage('拉取代码') {
            steps {
                git branch: 'master', url: GIT_URL
            }
        }
        stage('安装依赖') {
            steps {
                script {
                    // 安装依赖
                    sh "sudo npm install"
                }
            }
        }

        stage('编译构建') {
            steps {
                script {
                    // 编译构建
                    sh "sudo npm run build"
                }
            }
        }
        stage('移除旧镜像和容器') {
            steps {
                script {
                    // 检查容器是否存在
                    def containerExists = sh(script: 'docker ps -a --format "{{.Names}}" | grep -q "^${APP_NAME}"', returnStatus: true) == 0
                    // 检查镜像是否存在
                    def imageExists = sh(script: 'docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "^${APP_IMAGE}$"', returnStatus: true) == 0

                    // 停止并移除容器
                    if (containerExists) {
                        echo "容器存在，停止并删除"
                        sh "docker stop ${APP_NAME} || true"
                        sh "docker rm ${APP_NAME} || true"
                    } else {
                        echo "容器不存在"
                    }

                    // 移除镜像
                    if (imageExists) {
                        echo "删除镜像"
                        sh "docker rmi ${APP_IMAGE} || true"
                    } else {
                        echo "镜像不存在"
                    }
                }
            }
        }
        stage('构建镜像，创建并运行容器') {
            steps {
                // 基于 Dockerfile 进行构建
                sh "docker build -f Dockerfile.dockerfile -t ${APP_IMAGE} ."
                sh "docker run -it --name ${APP_NAME} -v /yannqing/${APP_NAME}:/yannqing/${APP_NAME} -p ${APP_PORT} -d ${APP_IMAGE}"
            }
        }
    }
}