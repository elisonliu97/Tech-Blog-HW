const router = require('express').Router();
const { Comment } = require('../../models');

// ROUTE TO MAKE NEW COMMENTS
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err)
    }
});

// ROUTE TO UPDATE COMMENTS
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        );
        console.log(commentData)

        if (!commentData) {
            res.status(404).json({ message: 'COMMENT NOT FOUND' });
        } else {
            res.status(200).json({ message: 'COMMENT UPDATED' })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// ROUTE TO DELETE COMMENTS
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        // IF POSTING NOT FOUND
        if (!commentData) {
            res.status(404).json({ message: "NO COMMENT FOUND" });
            return
        } else {
            res.status(200).json({ message: "COMMENT DELETED" })
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
