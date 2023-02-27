const router=require('express').Router();
router.use('/',require('./api/customer'));
router.use('/',require('./api/auth'));
module.exports = router;