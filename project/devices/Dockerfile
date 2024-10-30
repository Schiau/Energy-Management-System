# Use an OpenJDK image for Java 23 (make sure to adjust the version based on availability)
FROM openjdk:23-jdk-slim

# Set a working directory
WORKDIR /app

# Copy the JAR file (adjust 'target/*.jar' to the actual path and name of your JAR)
COPY target/*.jar app.jar

# Expose port (typically 8080 for Spring Boot)
EXPOSE 8081

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
