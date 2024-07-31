export function getBaseUrl() {
  if (!process.env.VERCEL_ENV) {
    throw Error("Vercel environment isn't set.");
  }

  if (process.env.VERCEL_ENV === 'preview') {
    return process.env.VERCEL_BRANCH_URL;
  } else if (process.env.VERCEL_ENV === 'production') {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL;
  }

  return process.env.NEXT_PUBLIC_BASE_URL;
}
