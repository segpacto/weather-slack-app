/**
 *
 * @param {{apiKey: string, url: string, upcomingDays: number, city: string}}
 * @returns {Promise<{location: {name: string, region: string, country: string}, current: {condition: {text: string, icon: string}, temp_c: number}, forecast: {}}>}
 */
module.exports = async ({ apiKey, city, upcomingDays, url }) => {
  const response = await fetch(`${url}?` + new URLSearchParams({
    q: city,
    days: upcomingDays,
    aqi: 'no',
    alerts: 'no',
    key: apiKey
  }))
  const bodyResponseChunks = []

  for await (const chunk of response.body) {
    bodyResponseChunks.push(Buffer.from(chunk).toString())
  }

  return JSON.parse(bodyResponseChunks.join(''))
}
