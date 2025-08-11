module.exports = {
  isProd: process.env.NODE_ENV === 'production',
  baseUrl: process.env.SITE_URL || 'http://localhost:8080'
};
