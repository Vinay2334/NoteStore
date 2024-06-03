FROM node:18-alpine

WORKDIR /client

COPY package.json ./

RUN npm install --force

COPY . .

# RUN npm run build

COPY .next ./.next

# CMD ["npx", "next", "dev", "-H", "0.0.0.0"]