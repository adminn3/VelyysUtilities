module.exports = (client, rateLimitData) => {
    console.log('Oops! Rate Limited.', JSON.stringify(rateLimitData).grey)
}