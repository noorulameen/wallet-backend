var express = require('express');
var router = express.Router();
const wallteModel = require('../models/wallet.model')
const m = require('../helpers/middlewares')


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/listwallet', async (req, res) => {
  await wallteModel.getWallet()
      .then(posts => res.json(posts))
      .catch(err => {
        if (err.status) {
          res.status(err.status).json({ message: err.message })
        } else {
          res.status(500).json({ message: err.message })
        }
      })
});

router.get('/getwallet/:id', m.mustBeInteger, async (req, res) => {
  const id = req.params.id
  await wallteModel.getSingleWallet(id)
      .then(post => res.json(post))
      .catch(err => {
        if (err.status) {
          res.status(err.status).json({ message: err.message })
        } else {
          res.status(500).json({ message: err.message })
        }
      })
})

router.post('/insertwallet', m.checkFieldsPost, async (req, res) => {
    await wallteModel.insertWallet(req.body)
        .then(post => res.status(201).json({
            message: `The post #${post.id} has been created`,
            content: post
        }))
        .catch(err => res.status(500).json({ message: err.message }))
});

router.put('/updatewallet/:id', m.mustBeInteger, m.checkFieldsPost, async (req, res) => {
    const id = req.params.id
    await wallteModel.updateWallet(id, req.body)
        .then(post => res.json({
            message: `The post #${id} has been updated`,
            content: post
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

router.delete('/deletewallet/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id;
    await wallteModel.deleteWallet(id)
        .then(post => res.json({
            message: `The post #${id} has been deleted`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})


module.exports = router;
