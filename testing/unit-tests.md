# Unit Tests

Tests are run automatically using GitHub Actions and are defined [here](https://github.com/CyberReboot/packet_cafe/blob/master/.github/workflows/test.yml). Currently there are tests written for the `ui` container and the `web` container. The `ui` container uses `npm` for running unit tests and the `web` container uses `py.test` . Each container has a `Dockerfile.test` defined that runs each containers respective tests. To add more tests, add them relative to each component, as opposed to globally at the root of the project.  This allows components to be build and tested without having to rely on the entire ecosystem of the project. Be aware that currently there are not integration tests.

