const express   = require("express");
const router    = express.Router();

const accounts  = require("../controllers/accounts");

router.route("/accounts")
 .get(accounts.index)
 .post(accounts.create);
router.route("/accounts/:id")
 .patch(accounts.update)
 .put(accounts.update)
 .delete(accounts.delete);

module.exports = router;
