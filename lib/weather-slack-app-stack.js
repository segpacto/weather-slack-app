const { Stack, Duration } = require('aws-cdk-lib')
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

    const weatherAppModal = new lambda.Function(this, 'WeatherSlackModal', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('apps/weather-slack-modal'),
      handler: 'index.main',
      environment: {}
    })

    const weatherAppApi = new lambda.Function(this, 'WeatherApi', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('apps/weather-api'),
      handler: 'index.main',
      environment: {}
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
