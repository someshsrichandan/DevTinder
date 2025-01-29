import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addRequests, removeRequest } from '../utils/requestsSlice';

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recevied", { withCredentials: true });
      dispatch(addRequests(res.data.connectionRequests));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleResponse = async (requestId, status) => {
    try {
        await axios.post(BASE_URL + "/request/review/"+status+"/"+requestId,{}, { withCredentials: true });
        dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
          Connection Requests
          <span className="text-secondary ml-2">({requests?.length || 0})</span>
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="card bg-base-100 shadow-md animate-pulse">
                <div className="flex items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-base-300"></div>
                  <div className="ml-3 flex-1 space-y-2">
                    <div className="h-4 bg-base-300 rounded w-3/4"></div>
                    <div className="h-3 bg-base-300 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-16 bg-base-300"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {requests?.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <div className="text-6xl mb-4">📭</div>
                <h2 className="text-lg text-gray-500">No pending connection requests</h2>
              </div>
            ) : (
              requests?.map((request) => (
            
                <div
                  key={request?.toId?._id}
                  className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                          <img 
                            src={request.toId.photoUrl} 
                            alt={request.toId.firstName} 
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="card-title text-lg">
                          {request.toId.firstName} {request.toId.lastName}
                          <div className="badge badge-secondary badge-sm">
                            {request.toId.gender || 'Other'}
                          </div>
                        </h2>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="badge badge-outline badge-sm">
                            {request.toId.age ? `${request.toId.age}yrs` : 'Age not specified'}
                          </span>
                          <span className="text-gray-500">
                            {formatDate(request.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
                      <p className="line-clamp-2 text-gray-600 mb-2">
                        {request.toId.about || 'Hey there! I am using DevTinder'}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {request.toId.skills?.slice(0,3).map((skill, index) => (
                          <div key={index} className="badge badge-outline badge-sm">
                            {skill}
                          </div>
                        ))}
                        {request.toId.skills?.length > 3 && (
                          <div className="badge badge-outline badge-sm">
                            +{request.toId.skills.length - 3}
                          </div>
                        )}
                        {request.toId.skills?.length === 0 && (
                          <div className="text-xs text-gray-500">No skills listed</div>
                        )}
                      </div>
                    </div>

                    <div className="card-actions mt-4 gap-2">
                      <button
                        onClick={() => handleResponse(request?.toId?._id, 'rejected')}
                        className="btn btn-sm btn-outline btn-error flex-1"
                        disabled={processing[request._id]}
                      >
                        {processing[request._id] === 'ignore' ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Ignore
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleResponse(request?.toId?._id, 'accepted')}
                        className="btn btn-sm btn-primary flex-1"
                        disabled={processing[request._id]}
                      >
                        {processing[request._id] === 'accept' ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Accept
                          </>
                        )}
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

export default Requests;