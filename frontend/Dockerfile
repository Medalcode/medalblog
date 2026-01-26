FROM node:18-alpine
WORKDIR /app
COPY frontend/package.json /app/package.json
RUN npm install --production
COPY frontend /app
RUN npm run build
ENV NEXT_PUBLIC_API_URL=http://backend:8000
EXPOSE 3000
CMD ["npm", "run", "start"]
