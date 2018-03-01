# sdev.sh [![CircleCI](https://circleci.com/gh/bilby91/sdev.sh/tree/master.svg?style=svg)](https://circleci.com/gh/bilby91/sdev.sh/tree/master)

Simple Development Scripting with docker-compose

`sdev.sh` attempts to standardize how projects are installed, built and run when using docker-compose.

## Installation

```shell
npm install -g sdev.sh
```

## Usage

sdev.sh uses a configuration file in the root of your repository to understand what actions are
available inside your project.

Some common actions that probably show up on every project are:

- build (building your application or library)
- test (running your test suite)
- bash (ssh in the docker container used as your runtime)

Those actions are expressed in the following definition:

```yaml
version: 1
name: sdev.sh
description: sdev.sh is a simple command line tool for managing your daily dev tasks.
docker:
  compose_file: docker/docker-compose.yml
tasks:
  - name: build
    description: build the library. Check tsconfig.json for output directory.
    command: yarn build
    container: sdev

  - name: test
    description: run unit test suite.
    container: sdev
    command: yarn test

  - name: bash
    description: ssh in docker container
    container: sdev
    command: /bin/bash
```

## Contact

- Martín Fernández <fmartin91@gmail.com>
