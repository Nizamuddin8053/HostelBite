import { toast, Bounce } from "react-toastify";
import { TOAST_TYPE } from "./constants";
const showToast = (message, type) => {

    if (type === TOAST_TYPE.SUCCESS) {
        toast.success(`🦄${message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    } else if (type === TOAST_TYPE.INFO) {
        toast.info(message, {
            position: "top-right",
            autoClose: 4000,
            theme: "light",
            transition: Bounce,
        });
    } else if (type === TOAST_TYPE.ERROR) {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }


}

export default showToast;