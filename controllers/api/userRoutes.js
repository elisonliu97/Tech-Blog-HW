const router = require('express').Router();
const { Posting, User } = require('../../models');

// ROUTE TO CREATE NEW USER
router.post('/', async (req, res) => {
    try {
        // create new user in database
        const userData = await User.create(req.body);

        // save session with user id and logged in status
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

// ROUTE TO LOG IN EXISTING USERS
router.post('/login', async (req, res) => {
    try {
        // gets user data based on email
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        // no user by that email exists, send message
        if (!userData) {
            res.status(400).json({
                message: "INCORRECT EMAIL OR PASSWORD"
            });
            return;
        }

        // checks if passsword is correct
        const corrPass = await userData.checkPassword(req.body.password)

        // if password is incorrect, send message
        if (!corrPass) {
            res.status(400).json({
                message: "INCORRECT EMAIL OR PASSWORD"
            });
            return;
        }

        // if both are correct, saves user id and logs user in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
          });
    } catch (err) {
        res.status(500).json(err);
    }
})

// ROUTE TO LOG OUT USER
router.post('/logout', (req, res) => {
    try {
        // if user is logged in, destroys the session data and logs them out
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            })
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
