import { NextResponse, type NextRequest } from "next/server";
import { useAppDispatch } from "./redux/hooks";

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth_token")?.value;
//   const dispatch = useAppDispatch();
//   console.log(token);
//   if (token) {
//     const fetchUser = async () => {
//       const headers = {
//         Authorization: `token ${token}`,
//       };
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/user/me", {
//           headers,
//         });
//         const userData = await response.json();
//         console.log("Get user", userData);
//         return userData;
//       } catch (error: any) {
//         console.log("GET USER API ERROR.............", error);
//       }
//     };

//     fetchUser();
//   }
//   return NextResponse.next();
// }

export async function middleware(request: NextRequest) {}