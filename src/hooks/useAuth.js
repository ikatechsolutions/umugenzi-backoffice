import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const useAuth = () => {
    const app = useContext(AppContext);
// console.log('useAuth', app);

    return {
        user: {
            data: app.user,
            hasPermission: (role) => {
                if (!role) return false;

                /** ça c'est quand role est un tableau (donc si l'utilisateur peut avoir plusieur role) */
                // const roles = app.user?.ROLE.flat();

                // return Boolean(roles?.find(r => r.DESCRIPTION === role))

                /** Si le role est un string simple */
                return app.user?.ROLE === role;
            }
        },
        handleLogin: app.handleLogin,
        handleLogout: app.handleLogout
    }
};