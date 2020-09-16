const jwt = require('jsonwebtoken')
require('dotenv').config()

//*********************************** */
// jwt Wrapper Function
/************************************ */
function signP(payload, options) {

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.JWT_Key, options, (err, token) => {

            if (err !== null) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

function verifyP(token, options) {

    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.JWT_Key, options, (err, payload) => {

            if ( err !== null) {
                reject(err)
            } else {
                resolve(payload)
            }
        })
    })
}

/****************************** 
 * helper function
*******************************/
function validateJWT (req, res, next) {

    //get value for auth header
    const auth = req.get('authorization')
    
    //check if we have a header
    if (auth !== undefined) {

        //split header into bearer and token at the space
        let [, token] = auth.split(' ')

        verifyP(token)
        .then (payload => {
            
            req.jwtPayload = payload
            next()
        }) 
        .catch (err => {
            res.status(400).send(`Error at validateJWT ${err.message}`)
        })
    } else {
        res.status(400).send('No authorization header')
    }
}

module.exports.signP = signP
module.exports.verifyP = verifyP
module.exports.validateJWT = validateJWT