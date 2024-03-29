const BASE_URL = "http://127.0.0.1:8000/api/";

export const user_endpoints = {
    SEND_OTP: BASE_URL+"user/sendotp/",
    REGISTER_USER: BASE_URL+"user/create/",
    LOGIN_USER: BASE_URL+"user/login/",
    GET_USER: BASE_URL+"user/me/",
}

export const notes_endpoints = {
    GET_ALL_NOTES_API: BASE_URL+"note/all"
}