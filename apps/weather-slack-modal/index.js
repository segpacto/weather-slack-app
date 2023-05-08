const createModalPayload = require('./helpers/create-modal-payload')
const createSlackModal = require('./helpers/create-slack-modal')
const parseSlackModalRequest = require('./helpers/parse-slack-modal-request')

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const SLACK_TOKEN_VERIFICATION = process.env.BOT_TOKEN_VERIFICATION

exports.main = async (event) => {
  try {
    const { body } = event
    const { trigger_id: triggerId, token } = parseSlackModalRequest(body)

    /**
     * The Verification by Token it works normally.
     * However Slack recommends using the signing secret instead.
     */
    if (token !== SLACK_TOKEN_VERIFICATION) {
      return { statusCode: 401 }
    }

    const modalWindowPayload = createModalPayload(triggerId)

    await createSlackModal(SLACK_BOT_TOKEN, modalWindowPayload)

    return { statusCode: 200 }
  } catch (err) {
    console.error(err)

    return {
      statusCode: 500,
      body: 'Consult your technical support for more information'
    }
  }
}
