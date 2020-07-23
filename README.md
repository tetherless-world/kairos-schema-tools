# KAIROS schema tools

A web application for working with KAIROS schemas.

# Use

## Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/)

## Running

    script/server

Then open a browser to [http://localhost:8080](http://localhost:8080).

### Using alternative data

By default the server uses example data in the repository. To use alternative data, set an environment variable to a directory with SDF documents:

    script/server ./conf/data/examples

A relative path must start with `./`. The directory must be writeable.

# Credits

This work is supported by the DARPA [KAIROS](https://www.darpa.mil/program/knowledge-directed-artificial-intelligence-reasoning-over-schemas) program.

