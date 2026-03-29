FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

RUN npm ci \
    && npx playwright install --with-deps \
    && npx playwright install msedge

COPY . .

CMD ["npm", "run", "test"]