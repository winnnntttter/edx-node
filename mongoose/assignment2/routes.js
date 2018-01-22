const router = require("express").Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ass4', err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});

const Accounts = mongoose.model("Account", {
    name: String,
    balance: Number
});

router.get('/accounts', (req, res, next) => {
    Accounts.find({}).exec((err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

router.post('/accounts', (req, res, next) => {
    let newAccount = new Accounts(req.body);
    newAccount.save((err) => {
        if (err) res.send("Failed to save data.");
        else res.send(newAccount.toJSON());
    });
});

router.put('/accounts/:id', (req, res, next) => {
    Accounts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, data) => {
        if (err) res.send(err);
        else { res.send(data); }
    });
});

router.delete('/accounts/:id', (req, res, next) => {
    Accounts.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) res.send(err);
        else { res.send("Removed."); }
    });
});

router.all('*', (req, res, next) => {
    res.status(404).send('Dude! It is a 404.');
});

module.exports = router;