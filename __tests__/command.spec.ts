import { Command } from "commander"
import "jest"
import * as path from "path"
import { bootstrapCommand, ICreateCommandOptions } from "../src/command"
import { Exec } from "../src/compose_executor"

const definitionPath = path.join(__dirname, "../.sdev.yml")

describe("bootstrapCommand", () => {
  let commandMock: Command
  let execMock: Exec
  let actionRunner: (command: string) => void
  let options: ICreateCommandOptions

  beforeEach(() => {
    execMock = jest.fn()

    commandMock = {
      version: jest.fn(() => commandMock),
      description: jest.fn(() => commandMock),
      command: jest.fn(() => commandMock),
      action: jest.fn((actionHandler) => {
        actionRunner = actionHandler
        return commandMock
      }),
    } as any

    options = {
      version: "1.0.0",
      definitionPath,
      exec: execMock,
    }
  })

  it("assigns the version", () => {
    bootstrapCommand(commandMock as any, options)

    expect(commandMock.version).toHaveBeenCalledWith("1.0.0")
  })

  it("assigns the description", () => {
    bootstrapCommand(commandMock as any, options)

    expect(commandMock.description).toHaveBeenCalledWith(
      "sdev.sh is a simple command line tool for managing your daily dev tasks.",
    )
  })

  it("assigns an action to perform", () => {
    bootstrapCommand(commandMock as any, options)

    expect(commandMock.action).toHaveBeenCalled()
  })

  it("assigns the build command", () => {
    bootstrapCommand(commandMock as any, options)

    expect(commandMock.command).toHaveBeenCalledWith(
      "build",
      "build the library. Check tsconfig.json for output directory.",
    )
  })

  it("assigns the test command", () => {
    bootstrapCommand(commandMock as any, options)

    expect(commandMock.command).toHaveBeenCalledWith(
      "test",
      "run unit test suite.",
    )
  })

  it("assigns the bash command", () => {
    bootstrapCommand(commandMock as any, options)

    expect(commandMock.command).toHaveBeenCalledWith(
      "bash",
      "ssh in docker container",
    )
  })

  describe("when setting up the command runner", () => {
    beforeEach(() => {
      bootstrapCommand(commandMock as any, options)
    })

    it("it handles up", () => {
      actionRunner("up")

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml -p sdev.sh up",
      )
    })

    it("it handles down", () => {
      actionRunner("down")

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml -p sdev.sh down",
      )
    })

    it("it handles build", () => {
      actionRunner("build")

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml -p sdev.sh run sdev yarn build",
      )
    })

    it("it handles test", () => {
      actionRunner("test")

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml -p sdev.sh run sdev yarn test",
      )
    })

    it("it handles bash", () => {
      actionRunner("bash")

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml -p sdev.sh run sdev /bin/bash",
      )
    })
  })
})
