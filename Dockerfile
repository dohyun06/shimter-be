FROM node:22
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y python3.10 python3-pip
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir --break-system-packages -r requirements.txt
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:deploy"]
