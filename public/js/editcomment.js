const newFormHandler = async (event) => {
    event.preventDefault();

    // to get post id from url
    const urlSplit = (document.location.href).split('/')
    const post_id = urlSplit[urlSplit.length -1]

    const content = document.querySelector('#content').value.trim();

    if (content) {
        const response = await fetch(`/api/comments/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ content }),
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

const deleteHandler = async (event) => {
    event.preventDefault();

    // to get post id from url
    const urlSplit = (document.location.href).split('/')
    const post_id = urlSplit[urlSplit.length -1]

    const response = await fetch(`/api/comments/${post_id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        console.log(response)
        alert("SOMETHING WENT WRONG")
    }
}

document.querySelector('.add-post-form').addEventListener('submit', newFormHandler);
document.querySelector('#delete-post-btn').addEventListener('click', deleteHandler);