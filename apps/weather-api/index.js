
exports.main = async (event) => {
  return {
    statusCode: 405,
    headers: {},
    body: 'Your request is not allowed'
  }
}
