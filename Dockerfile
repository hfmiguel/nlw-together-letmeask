# pull base image
FROM node:14
# FROM node:14.13.1-buster-slim

# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 3333
EXPOSE 3000

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH

RUN echo "fs.inotify.max_user_instances=524288" >> /etc/sysctl.conf
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf
RUN echo "fs.inotify.max_queued_events=524288" >> /etc/sysctl.conf

RUN apt-get -qq update && apt-get -qq -y install bzip2

RUN npm i --unsafe-perm -g npm@latest
RUN npm install --global yarn
RUN npm cache verify
RUN npm cache clean --force

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
WORKDIR /opt

RUN chown root:root -R /opt
USER root

RUN yarn create react-app letmeask2 --template typescript
RUN cd letmeask2
COPY package.json letmeask2/
RUN rm -rf yarn.lock && yarn install

CMD ["node", "yarn start"]