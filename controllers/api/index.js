const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postingRoutes = require('./postingRoutes')
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
router.use('/posts', postingRoutes);
router.use('/comments', commentRoutes);


module.exports = router;
