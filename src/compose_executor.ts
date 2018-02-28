import { ISDevTask } from "./interfaces"

export type Exec = (cmd: string) => void

export class ComposeExecutor {
  private exec: Exec
  private composeFilePath: string

  constructor(exec: Exec, composeFilePath: string) {
    this.exec = exec
    this.composeFilePath = composeFilePath
  }

  public run(task: ISDevTask) {
    this.exec(
      [
        "docker-compose",
        `-f ${this.composeFilePath}`,
        "run --rm",
        `${task.container} ${task.command}`,
      ].join(" "),
    )
  }
}
