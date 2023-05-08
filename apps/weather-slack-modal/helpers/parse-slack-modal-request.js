/**
 *
 * @param {string} bodyPayload
 * @returns {{trigger_id: string, token: string}}
 */
module.exports = (bodyPayload) => {
  if (!bodyPayload || bodyPayload === '') {
    throw new Error('The body payload can not be empty')
  }
  const params = decodeURI(bodyPayload).split('&')
  return params.reduce((acc, curr) => {
    const [paramName, paramvalue] = curr.split('=')
    acc[`${paramName}`] = paramvalue
    return acc
  }, {})
}
