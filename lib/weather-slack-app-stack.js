const { Stack } = require('aws-cdk-lib')
const lambda = require('aws-cdk-lib/aws-lambda')
const apigateway = require('aws-cdk-lib/aws-apigateway')

class WeatherSlackAppStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor (scope, id, props) {
    super(scope, id, props)

    const weatherAppModal = new lambda.Function(this, 'weather-slack-modal', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('apps/weather-slack-modal'),
      handler: 'index.main',
      environment: {
        SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
        BOT_TOKEN_VERIFICATION: process.env.BOT_TOKEN_VERIFICATION
      }
    })

    const weatherAppApi = new lambda.Function(this, 'weather-api', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('apps/weather-api'),
      handler: 'index.main',
      environment: {
        BOT_TOKEN_VERIFICATION: process.env.BOT_TOKEN_VERIFICATION,
        WEATHER_APP_API_KEY: process.env.WEATHER_APP_API_KEY,
        WEATHER_APP_REMOTE_ENDPOINT: process.env.WEATHER_APP_REMOTE_ENDPOINT,
        SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
        SLACK_WEBHOOK_MESSAGE_POST: process.env.SLACK_WEBHOOK_MESSAGE_POST
      }
    })

    const api = new apigateway.RestApi(this, 'weather-slack-app-api', {
      description: 'Weather Slack App api gateway'
    })

    api.root
      .addResource('weather-slack-modal')
      .addMethod('POST', new apigateway.LambdaIntegration(weatherAppModal))

    api.root
      .addResource('weather-api')
      .addMethod('POST', new apigateway.LambdaIntegration(weatherAppApi))
  }
}

module.exports = { WeatherSlackAppStack }
