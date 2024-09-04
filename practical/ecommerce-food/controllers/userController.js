exports.login = (req, resp, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new Error('Please input email and password!'));
  }
  resp.status(200).json({
    message: 'login success',
  });
};
