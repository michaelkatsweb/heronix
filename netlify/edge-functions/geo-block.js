export default async (request, context) => {
  const country = context.geo?.country?.code;

  // Allow USA and Canada - our target markets
  if (country === 'US' || country === 'CA' || !country) {
    return; // Continue to original page
  }

  // Don't redirect if already on geo-blocked page (prevent loop)
  const url = new URL(request.url);
  if (url.pathname === '/geo-blocked.html' || url.pathname === '/geo-blocked') {
    return;
  }

  // Redirect all other countries to geo-blocked page
  return Response.redirect(new URL('/geo-blocked.html', request.url), 302);
};

export const config = {
  path: "/*",
  excludedPath: [
    "/geo-blocked.html",
    "/assets/*",
    "/*.ico",
    "/*.png",
    "/*.jpg",
    "/*.svg",
    "/*.xml",
    "/*.txt",
    "/*.webmanifest"
  ]
};
