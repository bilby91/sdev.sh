import "jest"
import { ComposeExecutor, Exec } from "../src/compose_executor"

describe("ComposeExecutor", () => {
  let compose: ComposeExecutor
  let execMock: jest.Mock<Exec>
  const composeFilePath = "docker/docker-compose.yml"

  beforeEach(() => {
    execMock = jest.fn<Exec>()
  })

  describe("up", () => {
    beforeEach(() => {
      compose = new ComposeExecutor(execMock, composeFilePath, "test-project")
    })

    it("executes the correct docker-compose command", () => {
      compose.up()

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml -p test-project up",
      )
    })
  })

  describe("down", () => {
    beforeEach(() => {
      compose = new ComposeExecutor(execMock, composeFilePath, "test-project")
    })

    it("executes the correct docker-compose command", () => {
      compose.down()

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml -p test-project down",
      )
    })
  })

  describe("run", () => {
    beforeEach(() => {
      compose = new ComposeExecutor(execMock, composeFilePath, "test-project")
    })

    it("executes the correct docker-compose command", () => {
      compose.run({
        name: "test",
        description: "Test",
        container: "test_container",
        command: "test_command",
      })

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml -p test-project run test_container test_command",
      )
    })

    describe("when using ports", () => {
      it("executes the correct docker-compose command", () => {
        compose.run({
          name: "test",
          description: "Test",
          container: "test_container",
          command: "test_command",
          ports: ["8080:8080"],
        })

        expect(execMock).toHaveBeenCalledWith(
          "docker-compose -f docker/docker-compose.yml -p test-project run -p 8080:8080 test_container test_command",
        )
      })
    })

    describe("when using rm flag", () => {
      it("executes the correct docker-compose command", () => {
        compose.run({
          name: "test",
          description: "Test",
          container: "test_container",
          command: "test_command",
          rm: true,
        })

        expect(execMock).toHaveBeenCalledWith(
          "docker-compose -f docker/docker-compose.yml -p test-project run --rm test_container test_command",
        )
      })
    })

    describe("when using volumes flag", () => {
      it("executes the correct docker-compose command", () => {
        compose.run({
          name: "test",
          description: "Test",
          container: "test_container",
          command: "test_command",
          volumes: ["/var/dev:/foo/var"],
        })

        expect(execMock).toHaveBeenCalledWith(
          "docker-compose -f docker/docker-compose.yml -p test-project run -v /var/dev:/foo/var test_container test_command", // tslint:disable-line
        )
      })
    })
  })
})
