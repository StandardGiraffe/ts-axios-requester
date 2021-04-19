# TypeScript HTTP Requester for the Command Line

This is a tool I built as an exercise to familiarize myself with TypeScript, Axios, and command line tools (here, using [Yargs](http://yargs.js.org/)).  It assumes I'm trying to reach the PostageApp API, but can be configured to call up any target.

... Probably of not of much value beyond building my own personal experience.

## Preparation

1. Clone the repository: `$ git clone ...`
2. Rename `./secrets.json.example` to `./secrets.json`
3. Add a PostageApp API key to `./secrets.json`

## Command Line Interface

```text
Options:
      --help       Show help                                           [boolean]
      --version    Show version number                                 [boolean]
  -e, --endpoint   The API endpoint extension                [string] [required]
  -a, --api-key    A PostageApp API Key                                 [string]
  -u, --url        The base API URL                                     [string]
  -d, --arguments  Request arguments in stringified JSON                [string]
  -g, --get        GET request                                         [boolean]
  -p, --post       POST request (default mode)                         [boolean]
  ```

This tool can be tested with the `dev` script:

```console
$ npm run dev -- --post --endpoint get_metrics

{
  response: { status: 'ok', message: 'metrics' },
  data: {
    metrics: { hour: [Object], date: [Object], week: [Object], month: [Object] }
  }
}
```
