#!/bin/bash
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

echo "Building backend docker images"
docker build   -t farmanahmed888/discovery-server:latest -f service-docker-files/discoveryServerDockerfile .
docker build   -t farmanahmed888/loadbalancer:latest -f service-docker-files/loadbalancerDockerfile .
docker build   -t farmanahmed888/candidate-service:latest -f service-docker-files/candidateServiceDockerfile .
docker build   -t farmanahmed888/interviewer-service:latest -f service-docker-files/interviewerServiceDockerfile .
docker build   -t farmanahmed888/codeeditor-service:latest -f service-docker-files/codeEditorServiceDockerfile .


echo "Pushing backend docker images"
docker push farmanahmed888/discovery-server:latest
docker push farmanahmed888/loadbalancer:latest
docker push farmanahmed888/candidate-service:latest
docker push farmanahmed888/interviewer-service:latest
docker push farmanahmed888/codeeditor-service:latest


echo "Building frontend docker images"
docker build   -t farmanahmed888/codeeditor-frontend:latest -f frontend-docker-files/codeEditorFrontendDockerfile .
docker build   -t farmanahmed888/candidate-frontend:latest -f frontend-docker-files/candidateFrontendDockerfile .
docker build   -t farmanahmed888/interviewer-frontend:latest -f frontend-docker-files/interviewerFrontendDockerfile .



echo "Pushing frontend docker images"
docker push farmanahmed888/codeeditor-frontend:latest
docker push farmanahmed888/candidate-frontend:latest
docker push farmanahmed888/interviewer-frontend:latest

#echo "Starting docker-compose"
#docker-compose -f docker-compose.yml up -d