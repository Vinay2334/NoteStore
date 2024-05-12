import axios, {AxiosRequestConfig, AxiosResponse} from "axios"

export const axiosInstance = axios.create({});
// Types TBD
export const apiConnector = (method:string, url:string, bodyData?:object|null, headers?: AxiosRequestConfig["headers"],
params?: AxiosRequestConfig["params"]): Promise<AxiosResponse<any,any>> => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData,
        headers: headers,
        params: params,
    });
}