# sdev.sh

Simple Development Scripting with docker-compose

`sdev.sh` attempts to standarize how projects are installed, built and run when using docker-compose.

## Usage

sdev.sh uses a configuration file in the root of your repository to understand what actions are
available inside your project.

Some common actions that probably show up on every repository are:

- build (building your application or library)
- test (running your test suite)
- bash (ssh in the docker container used as your runtime)

```
```
