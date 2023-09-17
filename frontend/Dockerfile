# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app using Yarn
RUN yarn build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the React app using Yarn
CMD ["yarn", "start"]
