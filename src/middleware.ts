import i18nConfig from "config/i18n.config";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { locales, defaultLocale } = i18nConfig;

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  // Redirect to default locale if there is no supported locale prefix
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }
}

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export const config = {
  // Do not localize these paths
  // matcher: ["/((?!api|_next/static|slice-simulator|favicon.ico).*)"],
  matcher: ["/((?!api|_next|favicon.ico|_static|robots.txt).*)"],
};
