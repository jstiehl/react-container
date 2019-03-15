# Use node ^v9
FROM node:9

# Labels
LABEL maintainer="jstiehl@gmail.com"

# Establish Working Directory for App in Container
RUN mkdir /app
WORKDIR /app

# Install app into container
ADD . /app

# Install node dependencies
RUN yarn install && yarn build

# Expose port 3000 on container.
EXPOSE 3000

# Run the app
CMD npm run serve

