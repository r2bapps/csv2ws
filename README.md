# Simplest csv to ws

Publishes csv files as Rest/Json web service endpoints.

**NOTE: Strictly CSV definition RF4180 is allowed.**

## How to

Upload a zip or a csv file, each file will be published as an endpoint with the same name than the filename.

Big files are supported.

## API

* POST /admin/upload
* GET /api/listAll
* GET /api/{resource_name}
