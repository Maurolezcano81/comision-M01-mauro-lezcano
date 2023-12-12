const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({
            message: 'Primero debe iniciar Sesion'
        })
    }

    try {
        const verificacionToken = jwt.verify(token, process.env.TOKEN {
            algorithm: "HS256",
        });
        req.usuario = verificacionToken;
        next();
    } catch (error) {
        console.error(error.name, error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Token inválido. Por favor, inicie sesión nuevamente.'
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expirado. Por favor, inicie sesión nuevamente.'
            });
        } else {
            console.error(`Error en la verificación del token: ${error.message}`);
            return res.status(500).json({
                message: 'Error en la verificación del token.'
            });
        }
    }

}

module.exports = {
    verificarToken
}