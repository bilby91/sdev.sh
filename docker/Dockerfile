FROM node:8.9.1

ENV APP_HOME /var/www/app
ENV YARN_VERSION 1.5.1

RUN apt-get update -qq && \
    apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common

RUN curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | apt-key add -

RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
   $(lsb_release -cs) \
   stable"

RUN apt-get update -qq && \
    apt-get install -y \
      docker-ce

# Install yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- -- --version $YARN_VERSION

# Set the working directory
WORKDIR $APP_HOME

# Copy only package.json and yarn.lock for dependencies caching
ADD package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy application code
ADD . $APP_HOME

# Compile javascript source
RUN yarn build
