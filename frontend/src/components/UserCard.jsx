import React from 'react';

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  return (
    <div className="relative max-w-xs w-full h-[450px]"> {/* Fixed Card Height and Width */}
      <div className="card bg-black text-white shadow-xl border border-gray-700 rounded-xl overflow-hidden"> {/* Updated Background Color */}
        {/* Profile Image Section */}
        {photoUrl && (
          <figure className="relative h-48 w-full">
            <img
              src={photoUrl}
              alt={`${firstName || ''} ${lastName || ''}`}
              className="w-full h-full object-cover rounded-t-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
          </figure>
        )}

        {/* Card Content */}
        <div className="card-body p-4 space-y-3">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              {(firstName || lastName) && (
                <h2 className="card-title text-2xl font-bold">{/* Adjusted text size */}
                  {firstName} {lastName}
                  {age && <span className="text-lg font-light ml-2">({age})</span>}
                </h2>
              )}
            </div>
            {gender && (
              <div className="badge badge-primary px-3 py-1 text-sm uppercase">{/* Gender Badge */}
                {gender}
              </div>
            )}
          </div>

          {/* About Section */}
          {about && (
            <p className="text-sm line-clamp-3 leading-snug">{/* About Section */}
              {about}
            </p>
          )}

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="badge badge-outline text-sm">{/* Skill Badges */}
                  {skill}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button className="btn btn-error w-1/2 mr-2">Ignored</button>
            <button className="btn btn-success w-1/2">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
