export default class SessionController {
    // Generar un token
    login(req, res) {
        try {
            const token = req.token ?? null;
            const user = req.user
            res.sendSuccess201({token, user });
        } catch (error) {
            res.sendError(error);
        }
    }

    getCurrentUser(req, res) {
        try {
            const user = {
                id: req.id,
                roles: req.roles,
                email: req.email,
            };

            res.sendSuccess200(user);
        } catch (error) {
            res.sendError(error);
        }
    }
}