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

//   const user = await getUserByToken()
//   console.log(user)
//   if (path === "/onboarding") {
//     if (user?.onboarding) {
//       return NextResponse.redirect(new URL("/", request.nextUrl));
//     }
//     // return NextResponse.redirect(new URL("/profile", request.nextUrl));
//   }

  // if url is /cart and any change is made to cart, revalidate /cart
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/","/login","/signup","/onboarding","/profile","/explore"],
};