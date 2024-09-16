import React, { useContext, useState } from "react";
import CreatePostModal from "../Modals/CreatePostModal";
import { UserContext } from "../../Utils/UserContext";

const AddPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const data = {
  //   profile: {
  //     id: 1,
  //     name: "Alice Johnson",
  //     profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  //     headline: "Product Manager at InnovateLtd",
  //     location: "San Francisco, CA",
  //     industry: "Technology",
  //     summary:
  //       "Experienced Product Manager with a strong background in developing innovative products and leading cross-functional teams. Passionate about technology and solving complex problems. Skilled in product lifecycle management, market analysis, and user experience design.",
  //     connections: 1200,
  //     contactInfo: {
  //       email: "alice.johnson@example.com",
  //       phone: "+1 555-123-4567",
  //       linkedin: "https://www.linkedin.com/in/alicejohnson",
  //     },
  //     workExperience: [
  //       {
  //         title: "Senior Product Manager",
  //         company: "InnovateLtd",
  //         location: "San Francisco, CA",
  //         dates: "June 2021 - Present",
  //         description:
  //           "Leading a team of product managers and engineers to develop and launch new products. Overseeing product strategy, roadmap, and execution.",
  //       },
  //       {
  //         title: "Product Manager",
  //         company: "TechCorp",
  //         location: "San Francisco, CA",
  //         dates: "May 2018 - May 2021",
  //         description:
  //           "Managed the end-to-end product lifecycle for a suite of software products. Worked closely with stakeholders to define requirements and deliver solutions that meet market needs.",
  //       },
  //       {
  //         title: "Associate Product Manager",
  //         company: "CreateDesign",
  //         location: "San Francisco, CA",
  //         dates: "January 2016 - April 2018",
  //         description:
  //           "Assisted in the development of new product features and enhancements. Coordinated with design and development teams to ensure timely delivery of product updates.",
  //       },
  //     ],
  //     education: [
  //       {
  //         degree: "MBA",
  //         field: "Business Administration",
  //         institution: "Stanford Graduate School of Business",
  //         dates: "2014 - 2016",
  //       },
  //       {
  //         degree: "BSc",
  //         field: "Computer Science",
  //         institution: "University of California, Berkeley",
  //         dates: "2008 - 2012",
  //       },
  //     ],
  //     skills: [
  //       "Product Management",
  //       "Product Development",
  //       "Market Analysis",
  //       "User Experience Design",
  //       "Agile Methodologies",
  //     ],
  //     certifications: [
  //       {
  //         title: "Certified Scrum Product Owner",
  //         issuer: "Scrum Alliance",
  //         date: "2017",
  //       },
  //       {
  //         title: "Product Management Certification",
  //         issuer: "Product School",
  //         date: "2015",
  //       },
  //     ],
  //     recommendations: [
  //       {
  //         name: "John Doe",
  //         title: "Director of Product Management at TechCorp",
  //         text: "Alice is a remarkable product manager who consistently delivers high-quality results. Her strategic vision and leadership skills have been instrumental in driving our product success.",
  //       },
  //       {
  //         name: "Emily Davis",
  //         title: "UX Designer at CreateDesign",
  //         text: "Working with Alice was a pleasure. Her ability to understand user needs and translate them into actionable product features is impressive. She has a keen eye for detail and a strong grasp of product development.",
  //       },
  //     ],
  //   },
  // };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // const { profile } = data;
  const { user } = useContext(UserContext);
  return (
    <>
      {isModalOpen && (
        <CreatePostModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          user={user}
        />
      )}
      <div className="flex items-center border p-2 rounded mb-2">
        <img
          className="w-14 h-fit rounded-full"
          src={user?.userProfilePic}
          alt={user?.userName}
          srcset=""
        />
        <div
          onClick={handleOpenModal}
          className="w-full ml-2 border p-2 border-gray-400 rounded-full"
        >
          <p>Create a post...</p>
        </div>
      </div>
    </>
  );
};

export default AddPost;
