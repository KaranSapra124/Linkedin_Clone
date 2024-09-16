import React, { useContext, useEffect, useState } from "react";
import { Card } from "antd";
import dayjs from "dayjs";
import HomeProfile from "../Components/Profile/HomeProfile";
import AddPost from "../Components/Profile/AddPost";
import NewsFeed from "../Components/Home/NewsFeed";
import axios from "axios";
import { UserContext } from "../Utils/UserContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [formData, setFormData] = useState({});
  const [commentsVisibility, setCommentsVisibility] = useState({});
  const [comment, setComment] = useState("");

  const handleComment = async (postId) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/add-comment`,
      { formData: { ...formData, postId }, comment }
    );
    console.log(response);
  };

  const handleLikes = async (item) => {
    setLikes(item?.likes + 1);
    setFormData(item);
  };

  useEffect(() => {
    if (likes !== 0) {
      const postLikes = async () => {
        setFormData((prev) => ({
          ...prev,
          likes: likes,
        }));
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/edit-post`,
          { formData, likes }
        );
      };
      postLikes();
    }
  }, [likes]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/get-posts`
      );
      setPosts(response?.data.Posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => console.log(posts, user), [posts]);

  const toggleCommentsVisibility = (postId) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <>
      <div className="flex justify-evenly flex-wrap">
        {user ? (
          <HomeProfile />
        ) : (
          <Link
            to="/log-in"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Log In
          </Link>
        )}
        <div className="max-w-3xl w-full mx-auto px-4 py-6">
          {user && <AddPost />}
          {posts.map((elem) => {
            const {
              _id,
              author,
              createdAt,
              postContent,
              likes,
              comment: comments,
            } = elem;
            return (
              <Card
                key={_id}
                className="mb-6 shadow-lg rounded-lg border border-gray-300 bg-white"
                bodyStyle={{ padding: "1rem" }}
              >
                <div className="flex items-center mb-4">
                  <img
                    className="rounded-full w-14 h-14 object-cover border border-gray-200"
                    src={author?.userProfilePic}
                    alt={author?.userName}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {author?.userName}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {dayjs(createdAt).format("MMMM D, YYYY h:mm A")}
                    </p>
                  </div>
                </div>
                <p className="mb-2 text-gray-800 font-light text-xl">
                  {postContent}
                </p>
                <div className="flex items-center space-x-4 text-gray-600 text-sm">
                  <button
                    onClick={() => handleLikes(elem)}
                    className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7h18M3 12h18m-7 5h7"
                      />
                    </svg>
                    <span> {likes !== 0 ? likes : elem.likes}</span>
                    <span className="ml-2">Like</span>
                  </button>
                  <button
                    onClick={() => toggleCommentsVisibility(_id)}
                    className="flex items-center space-x-1 hover:text-blue-600 transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7v10m10-10v10m-7-7h7"
                      />
                    </svg>
                    <span>Comment</span>
                  </button>
                </div>
                <br />
                {commentsVisibility[_id] && (
                  <div className="flex flex-col space-y-2 p-4 bg-gray-100 rounded-lg shadow-md">
                    {/* Comment Input */}
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter The Comment..."
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    {/* Comment Button */}
                    <button
                      onClick={() => handleComment(_id)}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Comment
                    </button>
                    {comments?.map((item) => (
                      <div
                        key={item._id}
                        className="p-2 bg-white border border-gray-200 rounded-md"
                      >
                        <p className="text-gray-800">{item.comment}</p>
                        <span className="text-gray-500 text-sm">
                          {author?.userName}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
        <NewsFeed />
      </div>
    </>
  );
};

export default Home;
