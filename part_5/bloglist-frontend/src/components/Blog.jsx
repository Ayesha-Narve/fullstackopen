import { useState } from 'react'

const Blog = ({
  blog,
  updateLikes,
  deleteBlog,
  user
}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      {!visible ? (
        <div className="blog-summary">
          {blog.title} {blog.author}
          <button onClick={() => setVisible(true)}>
            view
          </button>
        </div>
      ) : (
        <div className="blog-details">
          <div>
            {blog.title} {blog.author}
            <button onClick={() => setVisible(false)}>
              hide
            </button>
          </div>

          <div>{blog.url}</div>

          <div>
            likes {blog.likes}
            <button onClick={() => updateLikes(blog)}>
              like
            </button>
          </div>

          <div>{blog.user?.name}</div>

          {blog.user?.username === user?.username && (
            <button onClick={() => deleteBlog(blog)}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog