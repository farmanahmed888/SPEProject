FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/interviewer-service-0.0.1-SNAPSHOT.jar /app/interviewer-service.jar
EXPOSE 8081
CMD ["java", "-jar", "interviewer-service.jar"]