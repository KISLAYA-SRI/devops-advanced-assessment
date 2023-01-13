FROM node
WORKDIR /home/nodeapp
COPY node_app/ .
RUN npm install
EXPOSE 5001
CMD ["npm", "start", "-y"]