import React from 'react'
import socket from '../JS/socket';


export default function Posts() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        socket.emit("loadPosts");
        socket.on("getPosts", (result) => {
            setPosts(result);
        });
    }, []);

    function Postsmap() {
        if (posts.length > 0) {
            return posts.map((post, index) => (
                <div key={index} className="post">
                    <h2>{post.username}</h2>
                    <h4>{post.title}</h4>
                    <p>{post.Text}</p>
                    <button> ❤️ {post.Likes}</button>
                </div>
            ));
        } else {
            return (
                <h2 style={{ color: "red", textAlign: "center", margin: "20px 0" }}>No posts Right now </h2>
            )
        };
    };
    return (
        <div className='posts'>
            <Postsmap />
        </div>
    );
};
