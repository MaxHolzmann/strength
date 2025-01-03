const GOOGLE_OAUTH_APP_GUID = process.env.EXPO_PUBLIC_GOOGLE_AUTH;

const authConfig = {
  issuer: "https://accounts.google.com",
  clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: ["openid", "profile"],
};

export default authConfig;

// Log in to get an authentication token
// const authState = await authorize(config);

// // Refresh token
// const refreshedState = await refresh(config, {
//   refreshToken: authState.refreshToken,
// });

// // Revoke token
// await revoke(config, {
//   tokenToRevoke: refreshedState.refreshToken,
// });
