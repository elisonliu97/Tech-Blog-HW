const router = require('express').Router();
const { Posting, User } = require('../models');
const withAuth = require('../utils/auth');

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
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// specific post route
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postingData = await Posting.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        if (!postingData) {
            console.log("no posting data")
            return
        }

        const posting = postingData.get({ plain: true})
        console.log(posting)

        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            where: {
                post_id: req.params.id
            }
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('post', {
            posting,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// dashboard route
router.get('/dashboard', withAuth, async (req, res) => {

});

// login page route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  

module.exports = router;