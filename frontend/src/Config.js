//configure our api endpoints
const uriBase = (process.env.NODE_ENV !== "production" ? (
    'http://localhost:3000/'
) : (
    'https://ctbheliodemo.herokuapp.com/'
))

const apiVer = 'api/v1/'

export {uriBase, apiVer}