# Build Stage
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline 
COPY src ./src
RUN mvn package -DskipTests

# Production Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
RUN adduser -D appuser
USER appuser
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]