# Build app
FROM hseeberger/scala-sbt:11.0.5_1.3.7_2.12.10 as build-app
WORKDIR /build
# The root of the repository is the context
COPY /build.sbt .
COPY /app ./app
COPY /conf ./conf
COPY /project ./project
RUN sbt playUpdateSecret dist

# Build GUI
FROM node:12 as build-gui
WORKDIR /build
COPY /gui/package.json .
RUN npm install
COPY /gui .
RUN npm run build

# Deployment
FROM ubuntu:18.04

# Install packages
RUN apt-get update && apt-get install -y curl default-jre-headless nginx unzip

# Copy in app
COPY --from=build-app /build/target/universal/kairos-schema-tools-app-1.0.0-SNAPSHOT.zip /
RUN unzip -q kairos-schema-tools-app-1.0.0-SNAPSHOT.zip && mv /kairos-schema-tools-app-1.0.0-SNAPSHOT /app && chmod +x /app/bin/kairos-schema-tools-app

# Copy in gui
COPY /nginx.conf /etc/nginx/sites-available/default
COPY --from=build-gui /build/dist /usr/share/nginx/html

# Copy in entrypoint
COPY /docker-entrypoint.sh /

EXPOSE 80

WORKDIR /app

ENTRYPOINT ["/docker-entrypoint.sh"]
