let moment = require('moment')
const getDomainUrl = require('get-domain-url');



module.exports = {
  beautifyUrl : function(code){
    let correctDomainLink = getDomainUrl(code); // 'https://domain.com'
    console.log(correctDomainLink);
    return correctDomainLink + code
  }
}
