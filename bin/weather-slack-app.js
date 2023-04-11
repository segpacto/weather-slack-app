#!/usr/bin/env node

const cdk = require('aws-cdk-lib')
const { WeatherSlackAppStack } = require('../lib/weather-slack-app-stack')

const app = new cdk.App()
new WeatherSlackAppStack(app, 'WeatherSlackAppStack', {})
