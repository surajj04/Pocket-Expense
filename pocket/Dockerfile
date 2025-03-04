# Use Maven with OpenJDK 21 for the build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Use OpenJDK 21 for the runtime stage
FROM openjdk:21
WORKDIR /app
COPY --from=build /app/target/pocket-0.0.1-SNAPSHOT.jar pocket.jar
EXPOSE 8080
CMD ["sh", "-c", "java -jar pocket.jar --server.port=${PORT:-8080}"]
