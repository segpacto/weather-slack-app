const modalForm = require('./../modal-form.json')

module.exports = (triggerId) => {
  return {
    trigger_id: triggerId,
    view: modalForm
  }
}
