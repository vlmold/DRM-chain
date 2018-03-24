async function requestKey(distributor, tokenId) {
    return await new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve("65CW3makOQQ2MRBF4J4eKvBNEWfT40cL81I9fwjJpgf7YmdYdr7bNao1NzZyaLZc")
       }, 1000);
    });
}

exports.requestKey = requestKey;
