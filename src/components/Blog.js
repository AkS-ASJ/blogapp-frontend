import {useState} from "react";
const Blog = ({blog, addLike, deleter, user}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
      <div className={"blogStyle"}>
          {!user && <div>
        <p className={"preview"} style={hideWhenVisible}>{blog.title} {blog.author} <button className={'btn btn-dark'} onClick={toggleVisibility}>View</button></p>
        <p className={'full'} style={showWhenVisible}>
          {blog.title} {blog.author}<button className={'btn btn-dark'} onClick={toggleVisibility}>Hide</button><br/>
          <a href={blog.url}>{blog.url}</a> <br/>
          Likes {blog.likes}<br/> 
          {blog.user.name}
        </p>
      </div>}
          {user && <div>
            <p className={"preview"} style={hideWhenVisible}>{blog.title} {blog.author} <button className={'btn btn-dark'} onClick={toggleVisibility}>View</button></p>
        <p className={'full'} style={showWhenVisible}>
          {blog.title} {blog.author}{' '}<button className={'btn btn-dark'} onClick={toggleVisibility}>Hide</button><br/>
          <a href={blog.url}>{blog.url}</a> <br/>
          Likes {blog.likes} <button className={'btn btn-primary'} onClick={() => addLike(blog.id)}>Like</button> <br/>
          {blog.user.name} <br/>
          {user.username === blog.user.username &&
            <button className={'btn btn-danger'} onClick={() => deleter(blog.id)}>Remove</button>
          }
      </p>
          </div>}
      </div>
)
}
export default Blog