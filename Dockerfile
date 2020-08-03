# Build GUI
FROM node:12 as build-gui
WORKDIR /build
COPY /gui/package.json .
RUN npm install
COPY /gui .
RUN npm run build

# Build app
FROM hseeberger/scala-sbt:11.0.5_1.3.7_2.12.10 as build-app
WORKDIR /build
# The root of the repository is the context
COPY /build.sbt .
COPY /app ./app
COPY /conf ./conf
COPY /project ./project
# Copy the built gui into the app's public and serve via Play
# Since the app only runs locally we don't need a reverse proxy.
COPY --from=build-gui /build/dist ./public
RUN sbt playUpdateSecret dist


# Deployment
FROM ubuntu:18.04

# Install packages
RUN apt-get update && apt-get install -y curl default-jre-headless unzip

# Copy in app
COPY --from=build-app /build/target/universal/kairos-schema-tools-app-1.0.0-SNAPSHOT.zip /
RUN unzip -q kairos-schema-tools-app-1.0.0-SNAPSHOT.zip && mv /kairos-schema-tools-app-1.0.0-SNAPSHOT /app && chmod +x /app/bin/kairos-schema-tools-app

EXPOSE 80

WORKDIR /app

CMD ["/app/bin/kairos-schema-tools-app", "-Dhttp.port=80"]
