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
        // look for user by email
        const userData = await User.findOne(
            {
                where:
                    { email: req.body.email }
            }
        );

        // if user doesnt exist
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // check password for user
        const validPassword = await userData.checkPassword(req.body.password);

        // if password doesn't match
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // log user in if all is correct
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

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
