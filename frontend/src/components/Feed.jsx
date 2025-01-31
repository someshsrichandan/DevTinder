import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

export const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      console.log(res?.data);
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center my-10">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <div className="card w-96 bg-base-300 shadow-lg text-center p-6">
          <h2 className="text-xl font-semibold text-gray-700">No Users Found</h2>
          <p className="text-gray-500 mt-2">There are no users available at the moment.</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={getFeed}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  )
}
