import React, { useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [hiddenComments, setHiddenComments] = useState({});

  const loadPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setPosts(data);
  };

  const loadComments = async (postId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const data = await response.json();

    // toggle comments visibility
    setHiddenComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));

    console.log(hiddenComments);

    // update the post object with the comments
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: data,
          };
        }
        return post;
      })
    );
  };

  return (
    <div>
      <button onClick={loadPosts}>Load Posts</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2 onClick={() => loadComments(post.id)}>{post.title}</h2>
            {hiddenComments[post.id] ? null : (
              <ul>
                {post.comments &&
                  post.comments.map((comment) => (
                    <li key={comment.id}>
                      <strong>{comment.name}</strong>: {comment.body}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
