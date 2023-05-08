/**
 *
 * @param {{token: string, channel: string, message: string, }} param0
 * @returns
 */
module.exports = async ({ token, payload, webhookUrl }) => {
  return fetch(webhookUrl, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`
    }
  })
}
