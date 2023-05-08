module.exports = ({ location, current, forecast }) => {
  const blocks = [{
    type: 'context',
    elements: [
      {
        type: 'plain_text',
        text: `Weather on ${location.name}, ${location.region}, ${location.country}`,
        emoji: true
      }
    ]
  }]

  forecast.forecastday.forEach(dailyForecast => {
    blocks.push({
      type: 'image',
      image_url: `http:${dailyForecast.day.condition.icon}`,
      alt_text: dailyForecast.day.condition.text
    })
    blocks.push({
      type: 'section',
      text: {
        text: `The weather on *${dailyForecast.date}* is expected to be *${dailyForecast.day.condition.text}*`,
        type: 'mrkdwn'
      },
      fields: [
        {
          type: 'mrkdwn',
          text: '*Sunrise*'
        },
        {
          type: 'mrkdwn',
          text: '*Sunset*'
        },
        {
          type: 'plain_text',
          text: dailyForecast.astro.sunrise
        },
        {
          type: 'plain_text',
          text: dailyForecast.astro.sunset
        }
      ]
    })
    blocks.push({
      type: 'divider'
    })
  })

  return {
    blocks
  }
}
