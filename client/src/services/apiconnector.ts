import axios, {AxiosRequestConfig} from "axios"

export const axiosInstance = axios.create({});
// Types TBD
export const apiConnector = (method:string, url:string, bodyData?:object|null, headers?: AxiosRequestConfig["headers"],
params?: AxiosRequestConfig["params"]) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData,
        headers: headers,
        params: params,
    });
}