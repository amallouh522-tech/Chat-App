import React, { useState, useRef } from 'react'
import socket from '../JS/socket';
import { AddLikeFetch } from '../JS/functions';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useServerContext } from '../Hooks/ServerContext';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const {Server} = useServerContext();
    function Loadposts() {
        socket.emit("loadPosts" , Server.ServerName);
    };

    async function addLikeResult(ID) {
        const result = await AddLikeFetch(ID);
        if (result) {
            Loadposts();
        };
    };
    useEffect(() => {
        socket.on("getPosts", result => {
            setPosts(result);
        });
        Loadposts();
        return () => {
            socket.off("getPosts"); // 🧹 cleanup
        };
    }, [Server.ServerName])
    useEffect(() => {
        socket.on("getPosts", result => {
            setPosts(result);
        });
        Loadposts();
        return () => {
            socket.off("getPosts"); // 🧹 cleanup
        };
    }, [])

    function Postsmap() {
        if (posts.length > 0) {
            return posts.map((post, index) => (
                <div key={index} className="post">
                    
                        <Link to={`/profile?id=${post.RID}`} style={{ color: "#2d3436", textDecoration: "none" }}><h2>{post.username}</h2></Link>
                        <h4>{post.title}</h4>
                        <p>{post.Text}</p>
                        {post.img && (
                            post.img.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                                <img src={`/uploads/${post.img}`} alt="Post image" className="post-media img" />
                            ) : post.img.match(/\.(mp4|webm|ogg)$/i) ? (
                                <video controls className="post-media">
                                    <source src={`/uploads/${post.img}`} type={`video/${post.img.split('.').pop()}`} />
                                    Your browser does not support the video tag.
                                </video>
                            ) : null
                        )}
                    <button onClick={() => addLikeResult(post.ID)}> ❤️ {post.Likes}</button>
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
