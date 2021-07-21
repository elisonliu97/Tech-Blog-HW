const router = require('express').Router();
const { Posting, User, Comment } = require('../models');
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

        const commentWithout = commentData.map((comment) => comment.get({ plain: true }));
        
        const comments = commentWithout.map((comment) => {
            comment.from_user = (comment.user_id === req.session.user_id)
            return comment
        });
        console.log(comments)

        res.render('post', {
            posting,
            comments,
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
    const postingData = await Posting.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
        where: {
            user_id: req.session.user_id
        }
    });

    const postings = postingData.map((posting) => posting.get({ plain: true }));

    res.render('dashboard', {
        postings,
        logged_in: req.session.logged_in
    });
});

// newpost route
router.get('/newpost', withAuth, async (req, res) => {
    res.render('newpost', {
        logged_in: req.session.logged_in
    })
})

// editpost route
router.get('/editpost/:id', withAuth, async (req, res) => {
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

        res.render('editpost', {
            posting,
            logged_in:req.session.logged_in,
            post_id: req.params.id
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

// edit comment route
router.get('/editcomment/:id', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        if (!commentData) {
            console.log("no comment data")
            return
        }
        
        const comment = commentData.get({ plain: true })

        res.render('editcomment', {
            comment,
            logged_in: req.session.logged_in,
            comment_id: req.params.id
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

// login page route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  

module.exports = router;