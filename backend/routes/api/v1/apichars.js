const express = require('express');
const router = express.Router();
const db = require('../../../db/mongo');
const app = require('../../../app');

/* GET chars listing. */
router.get('/', function(req, res, next) {
  
    const info = {
        query: {},
        collection: req.app.locals.collectionChars
    }

    db.readAll(info)
    .then(chars => {
        res.json(chars)
    })
    .catch(err => {
        console.log(err)
    })
});

//colon says endpoint is optional
//localhost:3000/api/v1/characters/Joe
router.get('/:charname', function(req, res, next) {

    const info = {
        query: {
            fName: req.params.charname
        },
        collection: req.app.locals.collectionChars
    }

    db.readOne(info)
    .then(char => {
        res.json(char)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/', function(req, res, next) {

    const info = {
        doc: req.body,
        collection: req.app.locals.collectionChars
    }

    db.createOne(info)
    .then(char => {
        res.json(char)
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete('/:charname', function(req, res, next) {

    const info = {
        query: {
            name: req.params.charname
        },
        collection: req.app.locals.collectionChars
    }

    db.deleteOne(info)
    .then(response => {
        if (response.deletedCount === 1) {
            res.json({})
        } else {
            //ToDo develop a proper error handler
            res.json(req.params.charname)
        }
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = router;