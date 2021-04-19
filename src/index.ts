// Import External Libraries
import yargs from 'yargs';
import axios from 'axios';

// Import Internal Configuration
const secrets = require('../secrets.json');
const config = require('../config.json')

// Declare Types
interface Params {
  api_key: string;
  arguments: any;
}

interface Args {
  [x: string]: unknown;
  endpoint: string;
  'api-key': string | undefined;
  url: string | undefined;
  arguments: string | undefined;
  get: boolean | undefined;
  post: boolean | undefined;
  _: (string | number)[];
  $0: string;
}

// Declare Utility Functions
function detectMode(args: Args): ("GET" | "POST") {
  if (args.post && args.get) {
    throw 'ABORT: Please select either GET (--get; -g) or POST (--post; -g).'
  } else if (args.post || !args.get) {
    return "POST"
  } else if (args.get) {
    return "GET"
  } else {
    throw 'ABORT: Please select either GET (--get; -g) or POST (--post; -g).'
  }
}

function handleError(error: string): void {
  console.error("ERROR! CATASTROPHE!\n")
  console.error(error)
}

// Process Command Line Arguments
const args = yargs.options({
  'endpoint': {
    type: 'string',
    description: 'The API endpoint extension',
    demandOption: true,
    alias: 'e'
  },
  'api-key': {
    type: 'string',
    description: 'A PostageApp API Key',
    demandOption: false,
    alias: 'a'
  },
  'url': {
    type: 'string',
    description: 'The base API URL',
    demandOption: false,
    alias: 'u'
  },
  'arguments': {
    type: 'string',
    description: 'Request arguments in stringified JSON',
    demandOption: false,
    alias: 'd'
  },
  'get': {
    type: 'boolean',
    description: 'GET request',
    demandOption: false,
    alias: 'g'
  },
  'post': {
    type: 'boolean',
    description: 'POST request (default mode)',
    demandOption: false,
    alias: 'p'
  },
}).argv;

const requestMode = detectMode(args)
const apiKey = args.a || secrets.apiKey;
const url = (args.u || secrets.url || config.defaultUrl) + args.endpoint;

// Build Params
const params = <Params>{ }

params.api_key = apiKey

if (args.arguments) {
  params.arguments = JSON.parse(args.arguments)
}

// Send Request
switch (requestMode) {
  case "GET":
    axios
    .get(
      url,
      { params: params }
    ).then(response => {
      console.log(response.data)
    }).catch(error => {
      handleError(error)
    });
    break;

  case "POST":
    axios
    .post(
      url,
      params
    )
    .then(
      response => {
        console.log(response.data)
      }
    ).catch(error => {
      handleError(error)
    });
    break;

  default:
    console.error("How'd you even get here?  GET or POST, please.")
    break;
}
