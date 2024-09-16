import React, { useContext } from "react";
import { UserContext } from "../../Utils/UserContext";

const HomeProfile = () => {
  const { user } = useContext(UserContext);

  // Provide default values or fallback if user data is not available
  const {
    userProfilePic = "https://via.placeholder.com/80", // Default placeholder image
    userName = "Guest",
    email = "Not provided",
    mobile = "Not provided",
    posts = [], // Default empty array if posts are not available
  } = user !== "" ? user : {}; // Fallback to an empty object if user is null or undefined

  return (
    <div className="h-fit mt-5 max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={userProfilePic}
          alt={userName}
          className="w-20 h-20 rounded-full border-2 border-blue-500"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{userName}</h1>
          <p className="text-sm text-gray-600">{email}</p>
          <p className="text-xs text-gray-500">{mobile}</p>
        </div>
      </div>

      {/* Posts Section */}
      {/* {posts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Posts</h2>
          <ul className="text-sm text-gray-700 space-y-4">
            {posts.map((post, index) => (
              <li key={index} className="p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium text-gray-800">
                  {post.postContent}
                </h3>
                {post.postMedia && (
                  <img
                    src={post.postMedia}
                    alt="Post Media"
                    className="w-full h-auto rounded-md mt-2"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default HomeProfile;
