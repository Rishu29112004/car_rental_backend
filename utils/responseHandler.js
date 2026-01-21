const response = (res, stateCode, message, data = null) => {
  const responseObject = {
    status: stateCode < 400 ? "success" : "error",
    message,
    data,
  };
  return res.status(stateCode).json(responseObject);
};

export default response;