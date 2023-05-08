const modalForm = require('./../modal-form.json')

/**
 *
 * @param {string} triggerId
 * @returns
 */
module.exports = (triggerId) => {
  return {
    trigger_id: triggerId,
    view: modalForm
  }
}
