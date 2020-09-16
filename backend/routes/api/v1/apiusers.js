const express = require('express');
const router = express.Router();
const db = require('../../../db/mongo');
const app = require('../../../app');
const { response } = require('express');
const bcrypt = require('bcrypt')
const {validateJWT} = require('../../../lib/jwt')
const bcryptSalt = 8

//make sure user doc has a username prop
//forces username to be lowercase
async function formatUser(user) {

    let rtnVal
    //check for username
    if (!user.hasOwnProperty("username")) {
        throw new Error("No username property")
    } else {
        //copy user object and set username to lowercase
        rtnVal = { ...user }
        rtnVal.username = rtnVal.username.toLowerCase()

        //encrypt password
        if (user.hasOwnProperty("password")) {

            try {
                rtnVal.password = await bcrypt.hash(user.password, bcryptSalt)
            }
            catch (err) {
                HTMLFormControlsCollection.log("BCRYPT", err.message)
                throw err
            }
        }
    }

    return rtnVal
}

/* GET users listing. */
router.get('/', function (req, res, next) {

    const info = {
        query: {},
        collection: req.app.locals.collectionUsers
    }
    db.readAll(info)
        .then(users => {
            console.log(users)
            res.json(users)
        })
        .catch(err => {
            res.status(500).send("Unable to Get Document", err.message)
        })
});

//colon says endpoint is optional
//localhost:3000/api/v1/users/Joe
router.get('/:username', function (req, res, next) {

    if (req.params.username !== undefined) {

        const username = req.params.username.toLowerCase()
        const info = {
            query: {
                username: username
            },
            collection: req.app.locals.collectionUsers
        }

        db.readOne(info)
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    } else {
        res.status(400).send("Username not found")
    }
})

router.post('/', validateJWT, function (req, res, next) {

    formatUser(req.body)
        .then(user => {

            //handle user object
            console.log("USER", user)

            const info = {
                doc: user,
                collection: req.app.locals.collectionUsers
            }
        
            db.readOne({
                query: { username: user.username },
                collection: req.app.locals.collectionUsers
            })
                .then(foundUser => {
                    if (foundUser !== null) {
                        res.status(400).send(`User ${user.username} already exists`)
                    }
                    return db.createOne(info)
                })
                .then(resDoc => {
                    if (resDoc.insertedCount === 1) {
                        //ops is an array of all inserted docs
                        res.json(resDoc.ops[0])
                    }
                })
                .catch(err => {
                    res.status(500).send(err.message)
                })

        }, err => {

            console.log(err.message)
            res.status(400).send(err.message)
        })
})

router.put('/:username', function (req, res, next) {

    if (req.params.username !== undefined) {
        const username = req.params.username.toLowerCase()
        const info = {
            query: {
                username: username
            },
            doc: req.body,
            collection: req.app.locals.collectionUsers
        }

        db.replaceOne(info)
            .then(response => {

                if (response.value === null) {
                    return db.createOne()
                }
                res.json(response)
            })
            .catch(err => {
                res.status(500).send("Failed to Replace", err)
            })
    } else {
        res.status(400).send("Username is undefined")
    }
})

router.patch('/:username', function (req, res, next) {

    if (req.params.username !== undefined) {

        const username = req.params.username.toLowerCase()
        let user = req.body

        const info = {
            query: {
                username: username
            },
            doc: user,
            collection: req.app.locals.collectionUsers
        }


        db.changeOne(info)
            .then(response => {

                if (response.ok !== 1) {
                    // update failed
                    throw new Error(`Username ${username} not found`)
                }

                return db.readOneById({
                    id: response.value._id,
                    collection: req.app.locals.collectionUsers
                })

            })
            .then(resDoc => {
                res.json(response)
            })
            .catch(err => {
                res.status(500).send("Failed to Update", err.message)
            })
    } else {
        res.status(400).send("Username is undefined")
    }
})

router.delete('/:username', function (req, res, next) {

    if (req.params.username != undefined) {

        const username = req.params.username.toLowerCase()
        const info = {
            query: {
                username: username
            },
            collection: req.app.locals.collectionUsers
        }

        db.deleteOne(info)
            .then(response => {
                if (response.deletedCount === 1) {
                    res.json({})
                } else {
                    //ToDo develop a proper error handler
                    res.json(username)
                }
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    } else {
        res.status(400).send("Username is undefined")
    }
})

module.exports = router;