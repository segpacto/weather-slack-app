
module.exports = (payload) => {
  const { user: { username, name }, view: { state: { values } }, token, channel } = payload
  const daysForecast = values.forecast_days_selection.forecast_days_selection.selected_option.value
  const city = values.city_selection.city_selection.selected_option.value

  return { username, name, values: { daysForecast, city }, token, channel }
}
