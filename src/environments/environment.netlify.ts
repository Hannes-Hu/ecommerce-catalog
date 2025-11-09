export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'https://fakestoreapi.com',
  enableDebug: false,
  version: '1.0.0',
  features: {
    checkout: true,
    admin: true,
    analytics: true
  }
};
