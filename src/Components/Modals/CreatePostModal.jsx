import React, { useState } from "react";
import { Button, Modal, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const CreatePostModal = ({ setIsModalOpen, isModalOpen, user }) => {
  const [formData, setFormData] = useState({
    author: user?._id,
  });

  const handleOk = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/create-post`,
      formData
    );
    setIsModalOpen(false);
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setFileList(info.fileList);
    }
  };

  return (
    <Modal
      title="Create a Post"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Post
        </Button>,
      ]}
    >
      <div className="space-y-4">
        <div className="flex items-center">
          <img
            src={user?.userProfilePic} // Replace with dynamic user profile picture
            alt={user?.userName}
            className="w-12 h-12 rounded-full border-2 border-blue-500"
          />
          <p className="ml-2 font-bold">{user?.userName}</p>
        </div>
        <div className="flex items-center mb-4">
          <div className="ml-4">
            <Input.TextArea
              rows={10}
              cols={80}
              name="postContent"
              value={formData?.postContent}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="resize-none"
            />
          </div>
        </div>
        {/* <Upload
          action="/upload" // Replace with your upload endpoint
          listType="picture"
          fileList={fileList}
          onChange={handleFileChange}
        >
          <Button className="mt-2" icon={<UploadOutlined />}>
            Upload Photo/Video
          </Button>
        </Upload> */}
      </div>
    </Modal>
  );
};

export default CreatePostModal;
