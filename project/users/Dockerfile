FROM openjdk:23-jdk-slim as builder

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY .mvn ./.mvn
COPY src ./src

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

FROM openjdk:23-jdk-slim

WORKDIR /app

COPY --from=builder /app/target/users-0.0.1-SNAPSHOT.jar app.jar

COPY --from=builder /app/src/main/resources/application.properties /app/application.properties


ENV DB_IP=localhost \
    DB_PORT=5432 \
    DB_USER=admin \
    DB_PASSWORD=admin \
    DB_DBNAME=app1 \
    PORT=8080

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]