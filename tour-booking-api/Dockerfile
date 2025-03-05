# Sử dụng OpenJDK 17 làm base image
FROM openjdk:21-jdk-slim

# Đặt thư mục làm thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file JAR từ thư mục target vào container
COPY target/tour-booking-0.0.1-SNAPSHOT.jar app.jar

# Mở cổng 8009 để ứng dụng có thể lắng nghe
EXPOSE 8009

# Lệnh chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
