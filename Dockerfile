FROM node
WORKDIR /home/nodeapp
COPY . .
RUN npm install
EXPOSE 5001
CMD ["npm", "start", "-y"]