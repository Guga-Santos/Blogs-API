module.exports = (err, req, res, _next) => {
    const { statusCode, message } = err;

    if (statusCode) return res.status(statusCode).json({ message });
    
    res.status(500).json({ message });
  };