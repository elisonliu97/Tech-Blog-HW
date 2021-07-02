const router = require('express').Router();
const { Posting, User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {

        const postingData = await Posting.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const postings = postingData.map((posting) => posting.get({ plain: true }));
        console.log(postings)

        res.render('homepage', {
            postings,
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;