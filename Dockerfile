FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm ci && npx playwright install --with-deps

COPY . .

VOLUME ["/app/allure-results"]

CMD ["npm", "run", "test"]