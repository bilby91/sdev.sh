import { execSync } from "child_process"
import { Command } from "commander"
import * as fs from "fs"
import * as path from "path"
import { bootstrapCommand } from "./command"

const packageJson = require("../package.json")

const defaultPath = path.join(process.cwd(), ".sdev.yml")

if (!fs.existsSync(defaultPath)) {
  console.error("Missing .sdev.yml file")

  process.exit(-1)
}

const command = new Command()
const executor = (rawCmd: string) => execSync(rawCmd, { stdio: "inherit" })

// FIXME:
//
// https://github.com/tj/commander.js/issues/706
command.executeSubCommand = () => false

try {
  bootstrapCommand(command, {
    exec: executor,
    version: packageJson.version,
    definitionPath: defaultPath,
  }).parse(process.argv)
} catch (e) {
  console.error(e.message)
  process.exit(-1)
}
