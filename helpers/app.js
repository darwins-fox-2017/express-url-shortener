let moment = require('moment')

module.exports = {
  beautifyUrl : function(code){
    let correctDomainLink = getDomainUrl(code); // 'https://domain.com'
    console.log(correctDomainLink);
    return correctDomainLink + code
  }
}
