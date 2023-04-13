import {useState} from "react";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: title,
        author: author,
        url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
}

    return (
        <div className={'formDiv'}>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title {' '}
                    <input
                        id="title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    Author {' '}
                    <input
                        id="author"
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    URL {' '}
                    <input
                        id="url"
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default BlogForm