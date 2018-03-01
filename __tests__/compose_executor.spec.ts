import "jest"
import { ComposeExecutor, Exec } from "../src/compose_executor"

describe("ComposeExecutor", () => {
  let compose: ComposeExecutor
  let execMock: jest.Mock<Exec>
  const composeFilePath = "docker/docker-compose.yml"

  beforeEach(() => {
    execMock = jest.fn<Exec>()
  })

  describe("run", () => {
    beforeEach(() => {
      compose = new ComposeExecutor(execMock, composeFilePath)
    })

    it("executes the correct docker-compose command", () => {
      compose.run({
        name: "test",
        description: "Test",
        container: "test_container",
        command: "test_command",
      })

      expect(execMock).toHaveBeenCalledWith(
        "docker-compose -f docker/docker-compose.yml run test_container test_command",
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
          "docker-compose -f docker/docker-compose.yml run -p 8080:8080 test_container test_command",
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
          "docker-compose -f docker/docker-compose.yml run --rm test_container test_command",
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
          "docker-compose -f docker/docker-compose.yml run -v /var/dev:/foo/var test_container test_command",
        )
      })
    })
  })
})
