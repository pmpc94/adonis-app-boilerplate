class ResponseService {
  sendSuccess(response, message, data) {
    return response.status(200).json({ message, status: 200, data, errors: {} });
  }
}

module.exports = new ResponseService();
