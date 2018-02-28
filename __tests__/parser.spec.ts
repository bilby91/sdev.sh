import * as fs from "fs"
import "jest"
import { Parser } from "../src/parser"

describe("Parser", () => {
  const filePath = "/tmp/test_file.yaml"

  afterEach(() => {
    fs.unlinkSync(filePath)
  })

  describe("run", () => {
    describe("when yaml structure is valid", () => {
      beforeEach(() => {
        const fd = fs.openSync(filePath, "wx")

        fs.writeSync(fd, "bad: 1")

        fs.closeSync(fd)
      })

      it("returns valid false", () => {
        expect(new Parser(filePath).run().valid).toBe(false)
      })

      it("returns all the invalid keys", () => {
        expect(new Parser(filePath).run().errors).toEqual([
          "version",
          "name",
          "description",
          "docker.compose_file",
          "tasks",
       ])
      })
    })

    describe("when yaml structure is valid", () => {
      beforeEach(() => {
        const data = `
          version: 1
          name: "sdev.sh"
          description: "sdev.sh is a simple command line tool for managing your daily dev tasks."
          docker:
            compose_file: docker/docker-compose.yml
          tasks:
            - name: build
              description: "Build the library. Check tsconfig.json for output directory."
              command: yarn build
              container: sdev

            - name: test
              description: "Run unit test suite."
              container: sdev
              command: yarn test
        `

        const fd = fs.openSync(filePath, "wx")

        fs.writeSync(fd, data)

        fs.closeSync(fd)
      })

      it("returns valid true", () => {
        expect(new Parser(filePath).run().valid).toBe(true)
      })

      it("returns an empty list of errors", () => {
        expect(new Parser(filePath).run().errors).toEqual([])
      })

      it("returns the definition", () => {
        expect(new Parser(filePath).run().definition).toEqual({
          version: 1,
          name: "sdev.sh",
          description: "sdev.sh is a simple command line tool for managing your daily dev tasks.",
          docker: {
            compose_file: "docker/docker-compose.yml",
          },
          tasks: [
            {
              name: "build",
              description: "Build the library. Check tsconfig.json for output directory.",
              command: "yarn build",
              container: "sdev",
            },
            {
              name: "test",
              description: "Run unit test suite.",
              container: "sdev",
              command: "yarn test",
            },
          ],
        })
      })
    })
  })
})
