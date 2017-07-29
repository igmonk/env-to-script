/**
 * Generates 'env.js' script intended to be loaded into browser via <sctipt> tag.
 * Script writes 'window.ENV' global variable based on environment variables
 * which are defined in '$(NODE_ENV).env.json' file.
 */
const fs = require('fs');
const UTF_8 = 'utf8';
const ENV_JS_PATH = 'env.js';

if (!process.env.NODE_ENV) throw new Error('Please specify value for NODE_ENV environment variable.');

let envFilePath = process.env.NODE_ENV.toLowerCase() + '.env.json';
let [, , envScriptFilePath = ENV_JS_PATH] = process.argv;

const readEnvJson = (envFilePath) => {
  let data = fs.readFileSync(envFilePath, UTF_8);
  return JSON.parse(data);
};

const generateEnvScript = (envJson) => {
  let result = ';(function () { \n';
  result += 'window.ENV = ' + JSON.stringify(envJson, null, 2) + '\n';
  result += '})();';
  return result;
};

const writeEnvJson = (envScript) => {
  fs.writeFileSync(envScriptFilePath, envScript);
};

let envJson = readEnvJson(envFilePath);
let envScript = generateEnvScript(envJson);
writeEnvJson(envScript);
