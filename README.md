# KAIROS schema tools

A web application for working with KAIROS schemas.

# Use

## Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/)

## One-time setup

1. Download `moirai-clotho.jar` from the `validation/` directory in NextCentury's `kairos-pub` repository and place it alongside this README (in the root of this repository).
1. Run `script/bootstrap` in this repository
1. Optionally, put the CHRONOS ontology as `CHRONOS.ttl` in your data directory, by default `./conf/data`.

### Updating

1. Optionally, update `moirai-clotho.jar` as above.
1. Run `script/update` in this repository
1. Optionally, update the CHRONOS ontology as above.

## Running

    script/server

Then open a browser to [http://localhost:8080](http://localhost:8080).

### Using alternative data

By default the server uses example data in the repository. To use alternative data, set an environment variable to a directory with SDF documents:

    script/server ./conf/data

A relative path must start with `./`. The directory must be writeable.

# Credits

This work is supported by the DARPA [KAIROS](https://www.darpa.mil/program/knowledge-directed-artificial-intelligence-reasoning-over-schemas) program.

