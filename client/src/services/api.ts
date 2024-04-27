const BASE_URL = process.env.NEXT_PUBLIC_SERVER;
// const BASE_URL = "http://127.0.0.1:8000/api/";
// console.log('base', BASE_URL);
export const user_endpoints = {
    SEND_OTP: BASE_URL+"user/sendotp/",
    REGISTER_USER: BASE_URL+"user/create/", 
    LOGIN_USER: BASE_URL+"user/login/",
    GET_USER: BASE_URL+"user/me/",
}

export const notes_endpoints = {
    GET_ALL_NOTES_API: BASE_URL+"note/all",
    GET_ALL_SUBJECTS_API: BASE_URL+"note/subjects",
    GET_ALL_COURSES_API: BASE_URL+"note/courses",
}