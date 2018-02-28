import { execSync } from "child_process"
import { Command } from "commander"
import * as path from "path"
import { createCommandLineTool } from "./command"

const packageJson = require("../package.json")
const defaultPath = path.join(process.cwd(), ".sdev.yml")

const command = new Command()
const executor = (rawCmd: string) => execSync(rawCmd, { stdio: "inherit" })

// FIXME:
//
// https://github.com/tj/commander.js/issues/706
command.executeSubCommand = () => false

createCommandLineTool(command, {
  exec: executor,
  version: packageJson.version,
  definitionPath: defaultPath,
}).parse(process.argv)
