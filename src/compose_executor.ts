import { ISDevTask } from "./interfaces"

export type Exec = (cmd: string) => void

export class ComposeExecutor {
  private exec: Exec
  private composeFilePath: string
  private projectName: string

  constructor(exec: Exec, composeFilePath: string, projectName: string) {
    this.exec = exec
    this.composeFilePath = composeFilePath
    this.projectName = projectName
  }

  public up() {
    this.composeExec(["up"])
  }

  public down() {
    this.composeExec(["down"])
  }

  public run(task: ISDevTask) {
    this.composeExec(
      [
        "run",
        this.flag("rm", task.rm),
        this.expandOptions("p", task.ports),
        this.expandOptions("v", task.volumes),
        this.expandOptions("e", task.environment),
        task.container,
        task.command,
      ],
    )
  }

  private composeExec(args: string[]) {
    this.exec(
      [
        "docker-compose",
        this.expandOptions("f", [this.composeFilePath]),
        this.expandOptions("p", [this.projectName]),
      ].concat(args).filter((x) => x !== "").join(" "),
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
