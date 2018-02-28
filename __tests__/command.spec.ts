import { Command } from "commander"
import "jest"
import * as path from "path"
import { createCommandLineTool, ICreateCommandOptions } from "../src/command"

const definitionPath = path.join(__dirname, "../.sdev.yml")

describe("createCommandLineTool", () => {
  let commandMock: Command
  let options: ICreateCommandOptions

  beforeEach(() => {
    commandMock = {
      version: jest.fn(() => commandMock),
      description: jest.fn(() => commandMock),
      action: jest.fn(() => commandMock),
      command: jest.fn(() => commandMock),
    } as any

    options = {
      version: "1.0.0",
      definitionPath,
      exec: jest.fn(),
    }
  })

  it("assigns the version", () => {
    createCommandLineTool(commandMock as any, options)

    expect(commandMock.version).toHaveBeenCalledWith("1.0.0")
  })

  it("assigns the description", () => {
    createCommandLineTool(commandMock as any, options)

    expect(commandMock.description).toHaveBeenCalledWith(
      "sdev.sh is a simple command line tool for managing your daily dev tasks.",
    )
  })

  it("assigns an action to perform", () => {
    createCommandLineTool(commandMock as any, options)

    expect(commandMock.action).toHaveBeenCalled()
  })

  it("assigns the build command", () => {
    createCommandLineTool(commandMock as any, options)

    expect(commandMock.command).toHaveBeenCalledWith(
      "build",
      "build the library. Check tsconfig.json for output directory.",
    )
  })

  it("assigns the test command", () => {
    createCommandLineTool(commandMock as any, options)

    expect(commandMock.command).toHaveBeenCalledWith(
      "test",
      "run unit test suite.",
    )
  })

  it("assigns the bash command", () => {
    createCommandLineTool(commandMock as any, options)

    expect(commandMock.command).toHaveBeenCalledWith(
      "bash",
      "ssh in docker container",
    )
  })
})
