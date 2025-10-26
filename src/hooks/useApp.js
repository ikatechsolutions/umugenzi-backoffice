import { useContext } from "react"
import { AppContext } from "../contexts/AppContext"

export const useApp = () => {
    const appContext = useContext(AppContext);

    return {
        toast: appContext.toast,
        breadCrumbItems: appContext.breadCrumbItems,
        locale: appContext.locale,

        setToastAction: appContext.setToast,
        setBreadCrumbAction: appContext.setBreadCrumbItems,
        setLocale: appContext.setLocale
    }
};