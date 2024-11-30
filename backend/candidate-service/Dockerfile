FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/candidate-service-0.0.1-SNAPSHOT.jar /app/candidate-service.jar
EXPOSE 8082
CMD ["java", "-jar", "candidate-service.jar"]