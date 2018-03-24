var fs = require('fs');


function getCertificate() {
    return { certificate: "test_certifcate", ttl: 1000 };
}

exports.getCertificate = getCertificate;