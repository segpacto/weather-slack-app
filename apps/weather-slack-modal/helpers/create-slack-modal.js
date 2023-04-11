
module.exports = async (token, payload) => {
  return fetch('https://slack.com/api/views.open', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`
    }
  })
}
