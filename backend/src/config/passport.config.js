import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserService from "../services/user.service.js";

const userService = new UserService();
export const config = (server) => {

    const jwtHeaderOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "vEQp}Hp(S-@px6Kt",
    };

    const handleLogin = async (payload, done) => {
        try {
            const userFound = await userService.findOneById(payload.id);
            return done(null, userFound);
        } catch (error) {
            return done(null, false, { message: error.message });
        }
    };

    passport.use("jwt-header", new JwtStrategy(jwtHeaderOptions, handleLogin));

    // Inicializa Passport en el servidor
    server.use(passport.initialize());
};