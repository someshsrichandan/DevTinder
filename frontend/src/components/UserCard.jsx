import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const UserCard = ({ user }) => {
  const { _id , firstName, lastName, photoUrl, age, gender, about, skills } = user;
    const dispatch = useDispatch();
    const handelSendRequest = async (status,id) => {
    try {
    const res =await axios.post(BASE_URL + "/request/send/"+status+"/"+id, {}, { withCredentials: true });
    
      dispatch(removeFeed(id));
    } catch (error) {
      console.log(error);
    }
    }
  return (
    <div className="card w-80 bg-base-300 shadow-xl rounded-xl overflow-hidden border border-base-200 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Enlarged Profile Image */}
      <figure className="relative h-72 w-full bg-base-200">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl font-semibold text-gray-500">
            {firstName?.[0] || "?"}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
          <h2 className="text-lg font-bold truncate text-ellipsis">
            {firstName || "Anonymous"} {lastName || ""}
          </h2>
        </div>
      </figure>

      {/* User Details */}
      <div className="p-4">
        {/* Age & Gender */}
        <div className="flex justify-center gap-3 text-sm text-gray-600">
          {/* Age */}
          <span className="badge badge-outline badge-lg flex items-center gap-1 px-3 py-1">
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {age ? `${age} yrs` : "Not Specified"}
          </span>

          {/* Gender */}
          <span className="badge badge-outline badge-lg flex items-center gap-1 px-3 py-1">
            <svg className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m0 0l4-4m-4 4l-4-4" />
            </svg>
            {gender || "Not Mentioned"}
          </span>
        </div>

        {/* About Section */}
        <div className="mt-3">
          <div className="flex items-center text-sm font-semibold mb-1 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </div>
          <p className="text-sm text-gray-500 truncate">
            {about || "Hey there! I am using DevTinder."}
          </p>
        </div>

        {/* Skills Section */}
        <div className="mt-3">
          <div className="flex items-center text-sm font-semibold mb-1 text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Skills
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {skills?.length > 0 ? (
              skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="badge badge-outline badge-lg">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500">No skills listed</span>
            )}
            {skills?.length > 3 && (
              <span className="badge badge-outline badge-sm">+{skills.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex gap-3">
        <button className="btn btn-outline btn-error flex-1 flex items-center justify-center gap-2"
        onClick={()=>handelSendRequest('ignored',_id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
          Ignore
        </button>
        <button className="btn btn-primary flex-1 flex items-center justify-center gap-2"
        onClick={()=>handelSendRequest('interested',_id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
