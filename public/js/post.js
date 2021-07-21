const newCommentHandler = async (event) => {
    event.preventDefault();
    // need to figure out how to get post id
    const urlSplit = (document.location.href).split('/')
    const post_id = urlSplit[urlSplit.length -1]

    const content = document.querySelector('#comment-box').value.trim();

    if (content) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            console.log(response)
            alert("SOMETHING WENT WRONG")
        }
    }
}

document.querySelector('.add-comment-form').addEventListener('submit', newCommentHandler);