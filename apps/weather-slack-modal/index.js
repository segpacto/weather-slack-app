const createModalPayload = require('./helpers/create-modal-payload')
const createSlackModal = require('./helpers/create-slack-modal')
const parseSlackModalRequest = require('./helpers/parse-slack-modal-request')

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN

exports.main = async (event) => {
  try {
    const { body } = event
    const { trigger_id: triggerId } = parseSlackModalRequest(body)
    const modalWindowPayload = createModalPayload(triggerId)

    await createSlackModal(SLACK_BOT_TOKEN, modalWindowPayload)

    return {
      statusCode: 200,
      headers: {}
    }
  } catch (err) {
    console.error(err)

    return {
      statusCode: 500,
      headers: {},
      body: 'Consult your technical support for more information'
    }
  }
}
