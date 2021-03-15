module.exports = config => {
  return {
    preRequest: async (request, chain) => {
      let response = await chain(request)
      let contentType = response.headers['content-type']
      if (contentType === undefined) {
        return response
      }

      if (contentType.match('application/json')) {
        return response.data
      }
    }
  }
}
