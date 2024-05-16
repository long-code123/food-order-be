FROM node:18

# Expose port 3000
EXPOSE 3000

# Set working directory
WORKDIR /app

# Install the latest version of npm globally
RUN npm i npm@latest -g

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV DB_HOST=db
ENV DB_USER=postgres
ENV DB_PASSWORD=nguyenbalong
ENV DB_NAME=food_app
ENV DB_POOL_MAX=5
ENV DB_POOL_MIN=0
ENV DB_POOL_ACQUIRE=30000
ENV DB_POOL_IDLE=10000

# Specify the command to run the server
CMD ["node", "server.js"]
