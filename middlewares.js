const checkTokenValidity = (req, res, next) => {
  if (req.path === "/auth/login") {
    next();
  }
};

export default { checkTokenValidity };
