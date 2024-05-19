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

export interface itemInterface {
  id: number;
  name: string;
}

export interface docsItemInterface {
  id: Number;
  title: String;
  url: String;
  thumbnail: String;
  subject: {
    id: number;
    sub_name: string;
  };
  category: String;
  file_size: String;
  contributor: String;
  date_created: string;
  likes_count: Number;
  avg_rating: number;
  tags: Array<Object>;
}
export interface docsInterface {
  count: Number;
  next: Number;
  previous: Number;
  results: Array<docsItemInterface>;
}

export interface uploadFormInterface {
  title: string;
  subject: number;
  course: number;
  category: string;
  url: string|Blob;
  thumbnail: string|Blob;
  tags: never[];
}
