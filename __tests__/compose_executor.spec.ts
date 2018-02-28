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
        "docker-compose -f docker/docker-compose.yml run --rm test_container test_command",
      )
    })
  })
})
