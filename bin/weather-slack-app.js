#!/usr/bin/env node
const cdk = require('aws-cdk-lib')
const { WeatherSlackAppStack } = require('../lib/weather-slack-app-stack')
require('dotenv').config()

const app = new cdk.App()
new WeatherSlackAppStack(app, 'WeatherSlackAppStack', {})
