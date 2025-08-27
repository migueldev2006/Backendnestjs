    FROM node:22.9.0-alpine3.19

    WORKDIR /app/

    COPY package*.json .

    RUN npm install

    COPY . .

    EXPOSE 3000

    RUN npm run build

    CMD ["sh", "-c", "npm run migration:run && npx nestjs-command seed:database && npm run start:prod"]
