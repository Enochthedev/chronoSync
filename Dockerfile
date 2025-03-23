FROM node:18-alpine

WORKDIR /usr/src/app

# Copy everything first (including prisma/schema.prisma)
COPY . .

# Now install dependencies (prisma generate will work)
RUN npm install

RUN npm run build

CMD ["npm", "start"]
