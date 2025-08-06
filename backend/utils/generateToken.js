const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name // optional, based on your user object
  };

  const token = jwt.sign(payload, "my-secret-key", {
    expiresIn: '1h' // or '7d', '15m', etc.
  });

  return token;
};

module.exports = { generateToken };
