export interface ISDevDefinition {
  version: 1
  name: string
  description: string
  docker: {
    compose_file: string,
  }
  tasks: ISDevTask[]
}

export interface ISDevTask {
  name: string
  description: string
  command: string
  container: string
  ports?: string[]
  volumes?: string[]
  environment?: string[]
  rm?: boolean
}
