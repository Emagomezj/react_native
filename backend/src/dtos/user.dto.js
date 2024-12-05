import { hasher } from "../utils/passHandler.js"
import { STANDARD } from "../constants/roles.constant.js"


export class UserDto{
    model(user){
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            roles: user.roles,
            carts: user.carts
        }
    };

    data(data){
        return {
            id: data.id,
            name: data.name,
            surname: data.surname || "",
            email: data.email,
            password: data.password ? hasher(data.password) : null,
            roles: data.roles || [STANDARD],
            carts: data.carts || []
        }
    };
}