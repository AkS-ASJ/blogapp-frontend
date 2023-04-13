import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [user, setUser] = useState(null);



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const blogFormRef = useRef()

  const handleLogin = async (handleLogin) => {
        const username = handleLogin.username;
        const password = handleLogin.password;

      try {
          const user = await loginService.login({
              username, password,
          })

          window.localStorage.setItem(
              'loggedBlogappUser', JSON.stringify(user)
          )
          blogService.setToken(user.token)
          setUser(user)
          setErrorMessage('You are logged in!')
          setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
      } catch (exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
      }
  }


    const createBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const addLike = (id) => {
        const blog = blogs.find(b => b.id === id)
        const likesUpdate = blog.likes+1;
        const updatedBlog = {...blog, likes: likesUpdate}

        blogService
            .update(id, updatedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
            })
        window.location.reload(false)
    }

  const logOut = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
  }

    const deleter = (id) => {
        const toDelete = blogs.find(p => p.id === id)
        if(window.confirm(`Remove blog ${toDelete.title} by ${toDelete.author}?`)){
            blogService.deleteIt(toDelete.id)
        }
    }

  const blogList = () => (
        <div>
            {blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
                <Blog key={blog.id}
                      blog={blog}
                      addLike={addLike}
                      deleter={deleter}
                      user={user}/>
            )}
        </div>
    )



  return (
    <div className={'col-sm-9'}>
      <h2>Blogs</h2>
        <Notification message={errorMessage} />
        {!user && <div>
            <LoginForm
            handleLogin={handleLogin}
        />
        {blogList()}
        </div>}
        {user && <div>
            <p>{user.name} logged in{' '}<button onClick={logOut} className={'btn btn-danger'}>Log out</button></p>
            <Togglable buttonLabel='New blog' ref={blogFormRef}>
                <BlogForm
                    createBlog={createBlog}
                />
            </Togglable>
            {blogList()}
        </div>
        }
    </div>
  )
}

export default App