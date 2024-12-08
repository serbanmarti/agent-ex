###################
# BASE IMAGE
###################
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY --chown=node:node package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the app source
COPY --chown=node:node . .

# Run the build command which creates the bundle
RUN yarn build

# Use the node user from the image (instead of the root user)
USER node


###################
# DEVELOPMENT
###################
FROM node:20-alpine AS development

# Set NODE_ENV environment variable
ENV NODE_ENV=development

# Create the working directory
WORKDIR /usr/src/app

# Copy the necessary files from the builder stage
COPY --from=builder /usr/src/app ./

# Start the server using the development build
CMD yarn start:dev


###################
# PRODUCTION
###################
FROM node:20-alpine AS production

# Set NODE_ENV environment variable
ENV NODE_ENV=production

# Create the working directory
WORKDIR /usr/src/app

# Copy the necessary dependency files from the builder stage
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./

# Install the dependencies
RUN yarn install --production=true

# Copy the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
