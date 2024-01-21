import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserByToken } from "@/lib/actions/user.action";
import { revalidatePath, revalidateTag } from "next/cache";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup" || path === "/reset-password" || path === "/forgotpassword";
  
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // if (!isPublicPath && !token) {
  //   const isAuth = await getUserByToken()
  //   if(isAuth.status === false){
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
      
  //   }
  // }


}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/","/login","/signup","/onboarding","/profile","/explore"],
};