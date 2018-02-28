import { Command } from "commander"
import { ComposeExecutor, Exec } from "./compose_executor"
import { ISDevTask } from "./interfaces"
import { Parser } from "./parser"

export interface ICreateCommandOptions {
  exec: Exec,
  version: string,
  definitionPath: string
}

export function createCommandLineTool(command: Command, options: ICreateCommandOptions) {
  const { valid, definition } = new Parser(options.definitionPath).run()

  if (!valid) {
    throw new Error("Invalid definition file")
  }

  command
    .version(options.version)
    .description(definition.description)
    .action((task) => {
      const taskDefinition = definition.tasks.find((x) => x.name === task) as ISDevTask

      new ComposeExecutor(options.exec, definition.docker.compose_file).run(taskDefinition)
    })

  definition
    .tasks
    .forEach((task) => {
       command.command(task.name, task.description)
    })

  return command
}
