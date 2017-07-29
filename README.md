# env-to-script
Getting environment variables in the browser

## Why do I need it?

The [twelve-factor](https://12factor.net/config) app stores config in environment variables (env vars).
Env vars are easy to change between deploys without changing any code.

**Challenge**: a web page doesn’t have access to OS variables, so you can’t normally use them. <br/>
**Solution**: generate a file that contains them and include it on the page using `<script>` tag.

## Installation

`npm install --save-dev env-to-script`

*you don't need this package at runtime*

## Usage

1. Create `.json` file with you env vars, for ex. `prod.env.json`:

  ```
  {
    "ENV_NAME": "prod",
    "API_BASE_URL": "http://100.200.101.202:8000/api",
    "WEB_SOCKET_URL": "ws://100.200.101.202:8001",
    "AWS": {
      "region": "us-east-1",
      "ClientId": "xxxxyyyyzzzz"
    }
  }
  ```

2. Define a new script in the `scripts` section of your `package.json` file and make sure it will be executed before the app starts:

  ```
  "scripts": {
    ...
    "prestart": "node ./node_modules/env-to-script"
  }
  ```

3. Run your `npm start` providing `NODE_ENV` env variable value:

  ```
  NODE_ENV=prod npm start
  ```

  *Note 1:* `env-to-script` is looking for `${NODE_ENV}.env.json` file. <br/>
  *Note 2:* generated `env.js` file looks like this:

  ```
  ;(function () {
  window.ENV = {
    "ENV_NAME": "prod",
    "API_BASE_URL": "http://100.200.101.202:8000/api",
    "WEB_SOCKET_URL": "ws://100.200.101.202:8001",
    "AWS": {
      "region": "us-east-1",
      "ClientId": "xxxxyyyyzzzz"
    }
  }
  })();
  ```

4. Include `env.js` file on the page:

  *index.html:*
  ```
  <script src="env.js"></script>
  ```

**PFOFIT!!!**

Now you're able to use your environment variables in the browser by using `ENV` global variable:

![ENV in console](https://user-images.githubusercontent.com/6386852/28749128-7ef198be-74c6-11e7-8b19-e94de546a4ed.png)
