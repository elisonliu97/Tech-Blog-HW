const router = require('express').Router();
const { Posting, User } = require('../models');
// const withAuth = require('../utils/auth');

// homepage route
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
        console.log

        res.render('homepage', {
            postings,
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// dashboard route
router.get('/dashboard', async (req, res) => {

});

// login page route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  

module.exports = router;