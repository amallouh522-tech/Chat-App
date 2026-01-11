import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { MustLogin } from '../JS/mustLogin';
import { data, Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AddLikeFetch } from '../JS/functions';

export default function Profile() {

    const navigate = useNavigate();

    const [profileData, setProfileData] = useState([]);
    const [ProfilePosts, SetProfilePosts] = useState([]);

    const [searchParams] = useSearchParams();
    const profileId = searchParams.get("id");

    async function GetProfilePosts(ID) {
        const response = await axios.post("/api/getprofileposts",
            { ID },
            { withCredentials: true }
        );
        const result = response.data.result;
        SetProfilePosts(result);
    }

    async function GetProfile(ID) {
        const response = await axios.post("/api/getprofile",
            { ID },
            { withCredentials: true }
        );
        const result = response.data.result;
        setProfileData(result);

    }
    async function addLikeResult(ID) {
        const result = await AddLikeFetch(ID);
        if (result?.succ) {
            GetProfilePosts(profileId);
        };
    };

    async function Check() {
        const result = await MustLogin();
        if (!result) {
            navigate("/");
        };
    };

    useEffect(() => {
        GetProfilePosts(profileId);
        GetProfile(profileId);
        Check();
    }, []);

    function ProfilePostsMap() {
        if (ProfilePosts.length > 0) {
            return ProfilePosts.map((post, index) => (
                <div key={post.ID} className="post">

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
            );
        };
    };

    return (
        <>
            <NavBar
                PageName={"Profile page"}
                url1={["/addpost", "Add new Post"]}
                url2={["/chat", "Chat"]}
                url3={["/addchat", "Add new Chat"]}
                url4={["/home", "home"]}
                url5={["/logout", "Logout"]}
            />

            <div className="profile">
                <div className="profilecontent">
                    <div className="header">
                        <div className="img">
                            <img src="/img/username.png" alt="profile" />
                        </div>
                        {profileData.map((Data, index) => (
                            <div key={index} className="info">
                                <h2>{Data.username}</h2>
                                <div className="stats">
                                    <span><b>{Data.Followers}</b> followers</span>
                                    <span><b>{Data.Following}</b> following</span>
                                    <span><b>{Data.Posts_num}</b> posts</span>
                                    <span><b>{Data.RID}</b> User Id </span>
                                </div>
                            </div>
                        )
                        )}

                    </div>
                    <div className="profile-posts">
                        <ProfilePostsMap />
                    </div>
                </div>
            </div>
        </>
    );

}
