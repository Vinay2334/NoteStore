export interface registerUserInterface {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  otp: string;
}

export interface loginUserInterface{
  email: string;
  password: string;
}

export interface userInterface {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  college_name: string | null;
  profile_pic: File | null;
}
