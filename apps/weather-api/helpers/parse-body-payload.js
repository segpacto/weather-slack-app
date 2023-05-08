const querystring = require('node:querystring')

/**
 *
 * @param {string} slackFormPayload
 * @returns {object}
 */
module.exports = (slackFormPayload) => {
  if (!slackFormPayload || slackFormPayload === '') {
    throw new Error('The body payload can not be empty')
  }
  const { payload } = querystring.decode(slackFormPayload)

  return JSON.parse(payload)
}
