const multiparty = require('connect-multiparty');

const md_multiparty = multiparty({ uploadDir: './uploads/avatar' });

module.exports = md_multiparty;
