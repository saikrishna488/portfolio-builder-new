FROM node:18-alpine
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV NEXT_PUBLIC_BACKEND_URL="https://port-backend-btkri2bn2q-em.a.run.app"

RUN npm run build

EXPOSE 8080

CMD ["npm","run","start"]