import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

const InstancePublic = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "Application/json",
    }
})

export default InstancePublic