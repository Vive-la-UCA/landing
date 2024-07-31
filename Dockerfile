FROM node:18-slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Expose the port the app runs on
EXPOSE 4321

# Serve the app
CMD ["npm", "start"]

