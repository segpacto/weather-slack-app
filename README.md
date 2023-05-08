# weather-slack-app

This project is part of an article that explains how to build Slack apps
using AWS lambdas.
This backend goes along the use of [WeatherApi](https://www.weatherapi.com/) platform,
so it will require you create a Free account there and obtain an `ApiKey`.
The repo uses `AWS CDK` to deploy an Amazon `API Gateway` with 2 `AWS Lambdas`.
`weather-slack-modal` will serve the Dialog box upon request from Slack and 
`weather-api` will process the input data of the Dialog and post the forecast data.

## Configuration
The file `.env.sample` contains all the environment variables necessary for running the app.
Rename file `.env.sample` to `.env`.
```bash
# Token to call Slack's API
SLACK_BOT_TOKEN=xoxb-1593429976308-5104745347137-UZ535fmqev1X1uPK1VxUjlwr
# Token used to verify the authenticity of Slack calls
BOT_TOKEN_VERIFICATION=Eqa6c2Gi06DTnAkgelpKVkRF
# ApiKey from WeatherAPI
WEATHER_APP_API_KEY=a624c07c53a34a948a1140226231104
# Remote URL from WeatherAPI
WEATHER_APP_REMOTE_ENDPOINT=https://api.weatherapi.com/v1/forecast.json
# Slack URL for posting messages
SLACK_WEBHOOK_MESSAGE_POST=https://hooks.slack.com/services/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
```
Take into consideration that `none` of the supplied data on the sample file is valid.

## Deployment
The cloud apps will be using [AWS-CDK](https://www.npmjs.com/package/aws-cdk) Toolkit in order to deploy.
```bash
$ npm install
$ cdk deploy
```

`Note:` This is not mean to be production ready, had been created with the only purpose
of demonstrating how Slack Apps with Dialogs works. If you would like to use into a
production environment I would suggest to add unit and integration tests.
Equally, make use of AWS Secret Manager to storage tokens, apiKeys and other secrets.
