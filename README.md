# sdev.sh [![npm version](https://badge.fury.io/js/sdev.sh.svg)](https://badge.fury.io/js/sdev.sh) [![codecov](https://codecov.io/gh/bilby91/sdev.sh/branch/master/graph/badge.svg)](https://codecov.io/gh/bilby91/sdev.sh) [![CircleCI](https://circleci.com/gh/bilby91/sdev.sh/tree/master.svg?style=svg)](https://circleci.com/gh/bilby91/sdev.sh/tree/master)


Simple declarative syntax for your projects tasks.

`sdev.sh` attempts to standardize and improve documentation on how projects are built and run when using docker-compose. It's a simple starting for someone new to a project.

## Installation

```shell
npm install -g sdev.sh
```

## Links

- [Motivation](https://io.bilby91.com/posts/sdev-sh)

## Usage

sdev.sh uses a declarative yaml file (.sdev.yml) in the root of your repository to understand what tasks are
available inside your project.

Some common actions that probably show up on every project when using docker-compose are:

- server (start the web development server)
- build (building your application or library)
- test (running your test suite)
- bash (ssh in the docker container used as your runtime)

Those tasks are expressed with the following definition:

```yaml
version: 1
name: My Cool App
description: This text should briefly mention what the application/library is about
docker:
  compose_file: docker/docker-compose.yml
tasks:
  - name: server
    description: Start the development server
    command: yarn start
    container: app
    ports:
      "8080:8080"

  - name: build
    description: This command will build the entire application and install dependencies
    command: yarn build
    container: app
    rm: true

  - name: test
    description: run unit test suite.
    command: yarn test
    container: app
    environment:
      - "NODE_ENV=test"

  - name: bash
    description: ssh in docker container
    command: /bin/bash
    container: app
    volumes:
      - "/npm/modules:/var/www/app/node_modules"
```

We can customize the tasks dependencies in terms of ports, volumes and environment variables.

The previous definition will generate the following output when calling `sdev` without any arguments:

```bash
➜  sdev.sh git:(improve-readme) ✗ sdev

  Usage: sdev [options] [command]

  This text should briefly mention what the application/library is about


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    build       This command will build the entire application and install dependencies
    test        run unit test suite.
    bash        ssh in docker container
    help [cmd]  display help for [cmd]
```

## Documentation

The definition file should be straight forward and mimic `docker-compose` as much as possible. Generally, tasks should be simple commands that you run in the container with some ports, environment and volumes variations.

### version (number)

The sdev file version. Always 1

### name (string)

The name of your application/library. Not used at the moment but probably in the future.

### description (string)

A brief description of your application/library. This is used when showing the help command.

### docker (object)

#### compose_file (string)

Relative path to .sdev.yaml for docker-compose file.

### tasks (object)

#### name (string)

The name of the task. This name will be used for invoking the command

#### description (string)

A brief description of what the task does.

#### command (string)

The [run](https://docs.docker.com/compose/reference/run/) command and args to use

#### container (string)

The target container of the command

#### volumes (Array<string>)

Array of volumes to attach when running

#### environment (Array<string>)

Array of environment variables to use when running

#### ports (Array<string>)

Array of ports to bind when running

#### rm (boolean)

Delete container after tasks ends

## Contact

- Martín Fernández <fmartin91@gmail.com>
