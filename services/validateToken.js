const validateToken = async (req, res) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, jwtSecret);

    // Retornar id do payload (ou null se não existir)
    return payload?.id ?? null;
  } catch (err) {
    return null;
  }
};

module.exports = validateToken;