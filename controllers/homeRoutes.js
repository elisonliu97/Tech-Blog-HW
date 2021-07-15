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

        res.render('homepage', {
            postings,
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// specific post route
router.get('/post/:id', async (req, res) => {
    try {
        const postingData = await Posting.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        console.log(postingData)
        if (!postingData) {
            console.log("no posting data")
            return
        }

        const posting = postingData.get({ plain: true})
        console.log(posting)

        res.render('post', {
            posting,
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