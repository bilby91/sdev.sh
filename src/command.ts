import { Command } from "commander"
import { ComposeExecutor, Exec } from "./compose_executor"
import { ISDevTask } from "./interfaces"
import { Parser } from "./parser"

export interface ICreateCommandOptions {
  exec: Exec,
  version: string,
  definitionPath: string
}

export function bootstrapCommand(command: Command, options: ICreateCommandOptions) {
  const { valid, definition } = new Parser(options.definitionPath).run()

  if (!valid) {
    throw new Error("Invalid definition file")
  }

  command
    .version(options.version)
    .description(definition.description)
    .action((task) => {
      const composeExec = new ComposeExecutor(
        options.exec,
        definition.docker.compose_file,
        definition.name,
      )

      switch (task) {
        case "up": {
          composeExec.up()
          break
        }
        case "down": {
          composeExec.down()
          break
        }
        default: {
          const taskDefinition = definition.tasks.find((x) => x.name === task) as ISDevTask

          composeExec.run(taskDefinition)
        }
      }
    })
    .command("up", "Create and start docker-compose containers")
    .command("down", "Stop and remove docker-compose containers, networks, images, and volumes")

  definition
    .tasks
    .forEach((task) => {
       command.command(task.name, task.description)
    })

  return command
}
