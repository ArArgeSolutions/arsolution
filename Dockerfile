# 1. Official Node.js image as a base image
FROM node:latest

# 2. Set the working directory
WORKDIR /app

# 3. Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code to the working directory
COPY . .

# 6. Expose the desired port
EXPOSE 3006

# 7. Run the application
CMD ["npm", "run", "dev"]
