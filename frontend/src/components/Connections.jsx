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
    <div className="min-h-screen p-4 md:p-8 bg-base-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Your Connections <span className="text-secondary">({filteredConnections?.length || 0})</span>
          </h1>
          
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
            <div className="join flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search by name, about, or skills..."
                className="input input-bordered join-item w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn join-item btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card bg-base-100 shadow-xl animate-pulse">
                <div className="h-32 bg-base-300 rounded-t-xl"></div>
                <div className="card-body space-y-4">
                  <div className="h-6 bg-base-300 rounded w-3/4"></div>
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                  <div className="h-4 bg-base-300 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Connections Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredConnections?.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">😕</div>
                <h2 className="text-xl text-gray-500">No connections found</h2>
              </div>
            ) : (
              filteredConnections?.map((connection) => (
                <div
                  key={connection._id}
                  className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <figure className="px-6 pt-6">
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img 
                          src={connection.photoUrl || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} 
                          alt={connection.firstName} 
                        />
                      </div>
                    </div>
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl">
                      {connection.firstName} {connection.lastName}
                    </h2>
                    <p className="text-gray-600 mb-4 min-h-[60px]">
                      {connection.about}
                    </p>
                    
                    <div className="w-full">
                      <h3 className="font-semibold mb-2">Skills:</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {connection.skills?.length > 0 ? (
                          connection.skills.map((skill, index) => (
                            <div key={index} className="badge badge-info gap-2">
                              {skill}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500">No skills listed</div>
                        )}
                      </div>
                    </div>

                    <div className="card-actions mt-4 w-full">
                      <button className="btn btn-primary btn-sm flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
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