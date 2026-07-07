FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server.mjs ./
COPY index.html ./
COPY app.js ./
COPY styles.css ./
COPY coverage-analysis.mjs ./
COPY metadata-inference.mjs ./
COPY sentence-semantics.mjs ./
COPY vendor ./vendor

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4173
ENV DATA_DIR=/app/data

EXPOSE 4173

CMD ["node", "server.mjs"]
