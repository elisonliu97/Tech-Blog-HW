const newFormHandler = async (event) => {
    event.preventDefault();

    const urlSplit = (document.location.href).split('/')
    const post_id = urlSplit[urlSplit.length -1]

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
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

document.querySelector('.add-post-form').addEventListener('submit', newFormHandler);