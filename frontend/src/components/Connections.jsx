import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/connections", { withCredentials: true });
      dispatch(addConnection(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  const filteredConnections = connections?.data?.filter(connection => {
    const fullName = `${connection.firstName} ${connection.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           connection.about.toLowerCase().includes(searchQuery.toLowerCase()) ||
           connection.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="min-h-screen p-4 md:p-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 text-center">
            Your Connections
            <span className="text-secondary ml-2">({filteredConnections?.length || 0})</span>
          </h1>
          
          {/* Search */}
          <div className="flex justify-center max-w-2xl mx-auto">
            <div className="join flex-1">
              <input
                type="text"
                placeholder="Search connections..."
                className="input input-bordered join-item w-full input-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary join-item btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card bg-base-100 shadow-md animate-pulse">
                <div className="flex items-center p-3">
                  <div className="w-10 h-10 rounded-full bg-base-300"></div>
                  <div className="ml-2 flex-1 space-y-1">
                    <div className="h-3.5 bg-base-300 rounded w-3/4"></div>
                    <div className="h-2.5 bg-base-300 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-12 bg-base-300"></div>
              </div>
            ))}
          </div>
        )}

        {/* Connections Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredConnections?.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-lg text-gray-500">No connections found</h2>
              </div>
            ) : (
              filteredConnections?.map((connection) => (
                <div
                  key={connection._id}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="card-body p-3">
                    <div className="flex items-start gap-2">
                      <div className="avatar">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                          <img 
                            src={connection.photoUrl || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} 
                            alt={connection.firstName} 
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="card-title text-base">
                          {connection.firstName} {connection.lastName}
                          <div className="badge badge-secondary badge-sm ml-1">
                            {connection.gender || 'Other'}
                          </div>
                        </h2>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="badge badge-outline badge-sm">
                            {connection.age ? `${connection.age}yrs` : 'Age not specified'}
                          </span>
                          <span className="text-gray-500">
                            {new Date(connection.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 text-sm">
                      <p className="line-clamp-2 text-gray-600 mb-1">
                        {connection.about || 'Hey there! I am using DevTinder'}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {connection.skills?.slice(0,3).map((skill, index) => (
                          <div key={index} className="badge badge-outline badge-sm">
                            {skill}
                          </div>
                        ))}
                        {connection.skills?.length > 3 && (
                          <div className="badge badge-outline badge-sm">
                            +{connection.skills.length - 3}
                          </div>
                        )}
                        {connection.skills?.length === 0 && (
                          <div className="text-xs text-gray-500">No skills listed</div>
                        )}
                      </div>
                    </div>

                    <div className="card-actions mt-3">
                      <button className="btn btn-primary btn-sm w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                        </svg>
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Connections;