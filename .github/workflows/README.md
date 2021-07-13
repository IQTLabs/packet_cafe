# Test and Build Workflows

The two workflow files in this directory control UI testing and both
building and pushing images for multiple processor architectures to Docker Hub.

If you are working on a fork of this repository, you must choose to enable
these workflows.

If you only want to make code changes for the purpose of pull
requests, you only need to enable these workflows to get some simple
tests that will catch build-time errors but not produce any artifacts.

If you wish to also build and push images to your own repositories on
[Docker Hub](https://dockerhub.io) and/or post results of
[Codecov](https://www.codecov.io) tests, you must also set some
variables as [GitHub
Secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
to enable additional build steps.

## Publishing to Docker Hub

To enable publishing to Docker Hub, you must first create the following Secrets
in the GitHub Settings for your fork:

| Variable | Purpose |
|---------|----------|
| `DOCKER_USERNAME` | The Docker Hub account to use for pushing images |
| `DOCKER_NAMESPACE` | The namespace to use when pushing images to repositories |
| `DOCKER_TOKEN` | The API token granting permission to push images to the namespace from GitHub |

If you are using a regular Docker Hub user account, set both
`DOCKER_USERNAME` and `DOCKER_NAMESPACE` to the same value (i.e., your
account name). If you are using an organizational account and have
permission to push to the organizational account namespace, set
`DOCKER_NAMESPACE` to the organizational account namespace.

The `buildx` workflow uses the [`buildx`](https://github.com/docker/setup-buildx-action) Action
to perform a multi-architecture build process for a number of images. This is
very time and resource-intensive, so it is only triggered under certain
circumstances when you want to make a public release on Docker Hub.

* The `buildx` workflow only runs on `push` events to the `main` branch
  or when tags on the `develop` branch are pushed.

  + Any `push` event to the `main` branch will build and push Docker
    images to Docker Hub with the tag `latest`.

  + Pushing an annotated tag with a version number on the `develop`
    branch will result in Docker images being built from the tagged
    commit and pushed to Docker Hub with a corresponding tag.

  + Any other push to the `develop` branch will simply run a
    regular build test for each `Dockerfile` and not push any
    Docker images.

* The `test` workflow runs on any `push` or `pull_request` event.
