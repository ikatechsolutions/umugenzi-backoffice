import config from "../config";
import { history } from "./history";

export default async function fetchApi(url, options = {}) {

    const user = JSON.parse(localStorage.getItem("user") || null);

    const headers = { ...options?.headers };

    if (user) {
        headers.authorization = `bearer ${user.token}`
    }

    const response = await fetch(`${config.BASE_URL}/api${url}`, {
        ...options,
        headers
    });

    if (response.status === 401) {
        const data = await response.json();
        localStorage.clear();
        history?.navigate('/');
        history.toast?.current?.show({
            severity: "error",
            summary: "Erreur",
            detail: data?.message,
            life: 3000,
        })

        return Promise.reject(data);
    }

    if (response.status === 403) {
        const data = await response.json();
        history?.navigate('forbidden');
        
        return Promise.reject(data);
    }

    if (!response.ok) {
        return Promise.reject(await response.json());
    }

    return await response.json();
}