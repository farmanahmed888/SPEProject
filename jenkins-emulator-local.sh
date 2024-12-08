#!/bin/bash

# Build and package backend services
cd backend/discovery-server
echo "Building discovery-server"
mvn clean package
cd ../../
mv backend/discovery-server/target/discovery-server-0.0.1-SNAPSHOT.jar jars/discovery-server.jar

cd backend/loadbalancer
echo "Building loadbalancer"
mvn clean package
cd ../../
mv backend/loadbalancer/target/loadbalancer-0.0.1-SNAPSHOT.jar jars/loadbalancer.jar

cd backend/candidate-service
echo "Building candidate-service"
mvn clean package
cd ../../
mv backend/candidate-service/target/candidate-service-0.0.1-SNAPSHOT.jar jars/candidate-service.jar

cd backend/interviewer-service
echo "Building interviewer-service"
mvn clean package
cd ../../
mv backend/interviewer-service/target/interviewer-service-0.0.1-SNAPSHOT.jar jars/interviewer-service.jar

# Build local backend Docker images
echo "Building backend docker images"
docker build -t discovery-server:local -f service-docker-files/discoveryServerDockerfile .
docker build -t loadbalancer:local -f service-docker-files/loadbalancerDockerfile .
docker build -t candidate-service:local -f service-docker-files/candidateServiceDockerfile .
docker build -t interviewer-service:local -f service-docker-files/interviewerServiceDockerfile .
docker build -t codeeditor-service:local -f service-docker-files/codeEditorServiceDockerfile .

# Build local frontend Docker images
echo "Building frontend docker images"
docker build -t codeeditor-frontend:local -f frontend-docker-files/codeEditorFrontendDockerfile .
docker build -t candidate-frontend:local -f frontend-docker-files/candidateFrontendDockerfile .
docker build -t interviewer-frontend:local -f frontend-docker-files/interviewerFrontendDockerfile .

## Start services using docker-compose
#echo "Starting docker-compose"
#docker-compose -f docker-compose-local.yml up -d
