const createSlackMessage = require('./helpers/create-slack-message')
const getSlackFormData = require('./helpers/get-slack-form-data')
const getWeatherData = require('./helpers/get-weather-data')
const parseBodyPayload = require('./helpers/parse-body-payload')
const sendSlackMessage = require('./helpers/send-slack-message')

const WEATHER_APP_API_KEY = process.env.WEATHER_APP_API_KEY
const WEATHER_APP_REMOTE_ENDPOINT = process.env.WEATHER_APP_REMOTE_ENDPOINT
const SLACK_TOKEN_VERIFICATION = process.env.BOT_TOKEN_VERIFICATION
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const SLACK_WEBHOOK_MESSAGE_POST = process.env.SLACK_WEBHOOK_MESSAGE_POST

exports.main = async (event) => {
  try {
    const { body } = event
    const bodyPayload = parseBodyPayload(body)
    const formData = getSlackFormData(bodyPayload)

    /**
     * The Verification by Token it works normally.
     * However Slack recommends using the signing secret instead.
     */
    if (formData.token !== SLACK_TOKEN_VERIFICATION) {
      return { statusCode: 401 }
    }

    const { location, current, forecast } = await getWeatherData({
      url: WEATHER_APP_REMOTE_ENDPOINT,
      city: formData.values.city,
      apiKey: WEATHER_APP_API_KEY,
      upcomingDays: formData.values.daysForecast
    })

    await sendSlackMessage({
      token: SLACK_BOT_TOKEN,
      webhookUrl: SLACK_WEBHOOK_MESSAGE_POST,
      payload: createSlackMessage({ location, current, forecast })
    })

    return { statusCode: 200 }
  } catch (err) {
    console.error(err)
    console.log(err)

    return {
      statusCode: 500,
      body: 'Consult your technical support for more information'
    }
  }
}
