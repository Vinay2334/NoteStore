export interface registerUserInterface {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  otp: string;
}

export interface loginUserInterface {
  email: string;
  password: string;
}

export interface userInterface {
  email: string;
  username: string;
  college_name?: string | null;
  profile_pic?: string | null;
  error: any;
}

export interface subjectInterface {
  id: number;
  sub_name: string;
}