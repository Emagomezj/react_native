import jwt from "jsonwebtoken";
import passport from "passport";
import UserService from "../services/user.service.js";
import {ERROR_NOT_HAVE_PRIVILEGES} from "../constants/messages.constant.js"
import { ADMIN } from "../constants/roles.constant.js";
import { JWT_TRANSLATIONS } from "../constants/messages.constant.js";

const userService = new UserService();

// Middleware para generar un token de acceso para un usuario autenticado
export const generateToken = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userFound = await userService.findOneByEmailAndPassword(email, password);

        const token = jwt.sign({ id: userFound.id }, "vEQp}Hp(S-@px6Kt", { expiresIn: "2h" });

        req.token = token;
        req.user = {id: userFound.id, email: userFound.email, name: userFound.name}

        next();
    } catch (error) {
        next(error);
    }
};

// Middleware para verificar la autenticación del usuario
export const checkAuth = (req, res, next) => {

    const jwtStrategy =  "jwt-header";

    // Autentica al usuario utilizando la estrategia proporcionada por Passport
    passport.authenticate(jwtStrategy, { session: false }, (error, user, info) => {
        if (error) return next(error);

        if (!user) {
            return next(new Error(JWT_TRANSLATIONS[info.message] ?? info.message));
        }

        req.id = user.id;
        req.roles = user.roles;
        req.email = user.email;

        next();
    })(req, res, next);
};

export const validateOwnership = (req,res,next) => {
    
    if(req.roles.includes(ADMIN)){
        return next()
    }
    if(req.id === req.params.id){
        return next()
    } else {
        return next(new Error(ERROR_NOT_HAVE_PRIVILEGES))
    }
}