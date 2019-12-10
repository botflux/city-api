FROM node:10
WORKDIR /app
COPY . /app
RUN npm install
ENV PORT=30000
EXPOSE 3000
CMD ["node", "app.js"]
