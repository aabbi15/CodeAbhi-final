FROM node:18-alpine
# Create app directory


WORKDIR /app
COPY package*.json ./
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

RUN npm install

COPY . .

ENV PORT=5173


EXPOSE 5173
CMD ["npm", "start"]