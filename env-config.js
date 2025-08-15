const prod = process.env.NODE_ENV === 'production';
module.exports = {
  'process.env.API': prod
    ? 'https://api.ckks.pl/api'
    : 'https://api.ckks.pl/api',
};
