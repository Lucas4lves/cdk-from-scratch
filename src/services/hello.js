exports.main = async function(e, c) {
    return {
        statusCode: 200,
        body: JSON.stringify('Hi from lambda!')
    }
}