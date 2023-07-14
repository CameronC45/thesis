# Node base image used to create a docker image for a node application
FROM node:12 
# Copies the file directory to the image
COPY . /opt/app
# WORKDIR instruction is used to set the working directory for all the 
# subsequent Dockerfile instructions
WORKDIR /opt/app 
# runs yarn in the image which is a package manager for node
RUN yarn
# tells docker to run this command, this starts up the application
CMD yarn watch 