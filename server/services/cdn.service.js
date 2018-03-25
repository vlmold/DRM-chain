function decryptContent(key) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("CONTENT")
        }, 1000);
    });
}

exports.getCertificate = getCertificate;