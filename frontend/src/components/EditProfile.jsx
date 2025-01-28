import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice'; // Import your Redux actions

function EditProfile({ profile }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    photoUrl: '',
    age: '',
    gender: '',
    about: '',
    skills: []
  });
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });
  
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [notification, setNotification] = useState(null);

  // Show notification and auto-remove it after 3 seconds
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        photoUrl: profile.photoUrl || '',
        age: profile.age || '',
        gender: profile.gender || '',
        about: profile.about || '',
        skills: profile.skills || []
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillInput = (e) => {
    setNewSkillInput(e.target.value);
  };

  const handleAddSkill = (e) => {
    if (['Enter', ','].includes(e.key) && newSkillInput.trim()) {
      e.preventDefault();
      const newSkill = newSkillInput.trim();
      if (!formData.skills.includes(newSkill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
        }));
      }
      setNewSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const payload = {
        ...formData,
        age: formData.age ? Number(formData.age) : null
      };

      const response = await axios.patch(`${BASE_URL}/profile/update`, payload, {
        withCredentials: true,
      });

      // Update Redux store with new user data
    
      dispatch(addUser(response?.data));
      
      showNotification('Profile updated successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error ||
                         error.message;
      showNotification(`Update failed: ${errorMessage}`, 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingPassword(true);
    try {
      const response = await axios.patch(`${BASE_URL}/profile/password`, passwordData, {
        withCredentials: true,
      });

      showNotification('Password updated successfully!');
      setPasswordData({ oldPassword: '', newPassword: '' });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error ||
                         error.message;
      showNotification(`Password change failed: ${errorMessage}`, 'error');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      {/* Notification System */}
      {notification && (
        <div className={`toast toast-top toast-end z-50`}>
          <div className={`alert ${notification.type === 'error' ? 'alert-error' : 'alert-success'}`}>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Edit Form */}
        <div className="flex-1 space-y-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-6">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Profile Image URL</span>
                  </label>
                  <input
                    type="url"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleInputChange}
                    className="input input-bordered"
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Age</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      min="1"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Gender</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">About</span>
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered h-32"
                    placeholder="Tell us about yourself..."
                    maxLength="500"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Skills</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="badge badge-primary gap-2">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="text-xs hover:text-error"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={handleSkillInput}
                    onKeyDown={handleAddSkill}
                    className="input input-bordered"
                    placeholder="Type skill and press enter"
                  />
                </div>

                <div className="form-control mt-6">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Password Update Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Old Password</span>
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="input input-bordered"
                    required
                    minLength="6"
                  />
                </div>
                <div className="form-control mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-accent"
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Updating...
                      </>
                    ) : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:w-96">
          <div className="sticky top-8">
            <h3 className="text-xl font-bold mb-4">Live Preview</h3>
            <UserCard user={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;