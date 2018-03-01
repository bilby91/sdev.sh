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
        this.expandOptions("f", [this.composeFilePath]),
        "run",
        this.flag("rm", task.rm),
        this.expandOptions("p", task.ports),
        this.expandOptions("v", task.volumes),
        this.expandOptions("e", task.environment),
        task.container,
        task.command,
      ]
      .filter((x) => x !== "")
      .join(" "),
    )
  }

  private flag(flagName?: string, flagStatus?: boolean) {
    if (!flagStatus) {
      return ""
    }

    return `--${flagName}`
  }

  private expandOptions(key: string, options?: string[]) {
    if (!options) {
      return ""
    }

    return options.map((x) => `-${key} ${x}`).join(" ")
  }
}
