FROM node:8.9.1

ENV APP_HOME /var/www/app
ENV YARN_VERSION 1.5.1

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
