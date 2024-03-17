import axios from "axios"

export const axiosInstance = axios.create({});
// Types TBD
export const apiConnector = (method:string, url:string, bodyData:object, headers:any, params:any) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}