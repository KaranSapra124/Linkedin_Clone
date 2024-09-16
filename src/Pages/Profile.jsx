import React, { useContext, useState } from "react";
import { UserContext } from "../Utils/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { userProfilePic, userName, email, mobile, posts } = user;

  const [commentsVisibility, setCommentsVisibility] = useState({});
  const [comments, setComments] = useState({});
  console.log(posts, "POSTS");
  const toggleCommentsVisibility = (postId) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentChange = (postId, event) => {
    setComments((prev) => ({
      ...prev,
      [postId]: event.target.value,
    }));
  };

  const handleCommentSubmit = (postId) => {
    // Handle comment submission logic here
    console.log(`Submitting comment for post ${postId}:`, comments[postId]);
    // Reset comment input after submission
    setComments((prev) => ({
      ...prev,
      [postId]: "",
    }));
    // Optionally, you can also update the posts state with the new comment
  };

  return (
    <div className="max-w-4xl mt-4 mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-6">
        <img
          src={userProfilePic}
          alt={userName}
          className="w-24 h-24 rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-800">{userName}</h1>
          <p className="text-gray-600">{email}</p>
          <p className="text-gray-600">{mobile}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Posts</h2>
        <ul className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <img
                    src={userProfilePic}
                    className="w-12 rounded-full"
                    alt="Profile"
                  />
                  <p className="ml-2 font-semibold">{userName}</p>
                </div>
                <hr className="my-2" />
                <div className="mb-4">
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {post.postContent}
                  </p>
                  {post.postMedia && (
                    <img
                      src={post.postMedia}
                      alt="Post Media"
                      className="w-full h-auto rounded-md"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-4 text-gray-600 text-sm">
                  <button className="flex items-center space-x-1 hover:text-blue-500">
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
                    <span>{post.likes}</span>
                    <span className="ml-2">Like</span>
                  </button>
                  <button
                    onClick={() => toggleCommentsVisibility(post._id)}
                    className="flex items-center space-x-1 hover:text-blue-500"
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

                {commentsVisibility[post._id] && (
                  <div className="flex flex-col space-y-2 p-4 bg-gray-100 rounded-lg shadow-md">
                    <input
                      value={comments[post._id] || ""}
                      onChange={(e) => handleCommentChange(post._id, e)}
                      placeholder="Enter your comment..."
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post._id)}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Comment
                    </button>
                    {post?.comment?.map((comment) => (
                      <div
                        key={comment._id}
                        className="p-2 bg-white border border-gray-200 rounded-md"
                      >
                        <p className="text-gray-800">{comment.comment}</p>
                        <span className="text-gray-500 text-sm">
                          {userName}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No posts available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
