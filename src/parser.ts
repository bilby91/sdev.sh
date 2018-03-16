import * as fs from "fs"
import * as YamlValidator from "yaml-validator"
import * as yaml from "yamljs"
import { ISDevDefinition } from "./interfaces"

const structure = {
  version: "number",
  name: "string",
  description: "string",
  docker: {
    compose_file: "string",
  },
  tasks: [
    {
      "name": "string",
      "description": "string",
      "command": "string",
      "container": "string",
      "ports?": ["string"],
      "volumes?": ["string"],
      "environment?": ["string"],
      "rm?": "boolean",
    },
  ],
}

export interface IParserResult {
  valid: boolean
  definition: ISDevDefinition
  errors: string[]
}

export class Parser {
  private filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
  }

  public run(): IParserResult {
    const validator = this.validator()

    validator.validate([this.filePath])

    return {
      valid: validator.inValidFilesCount === 0,
      definition: this.parsedFile(),
      errors: validator.nonValidPaths,
    }
  }

  private validator() {
    return new YamlValidator({ structure })
  }

  private parsedFile() {
    const yamlData = fs.readFileSync(this.filePath).toString()

    return yaml.parse(yamlData)
  }
}
