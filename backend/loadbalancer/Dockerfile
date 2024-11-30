FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/loadbalancer-0.0.1-SNAPSHOT.jar /app/loadbalancer.jar
EXPOSE 8000
CMD ["java", "-jar", "loadbalancer.jar"]