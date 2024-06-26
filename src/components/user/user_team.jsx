import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase-config';
import { collection, doc, getDocs } from 'firebase/firestore';
import UserDetails from './user_details';

export const Team = () => {

  const [dbData, setdbData] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setdbData(filteredData);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });
  const viewUserDetails = (user) => {
    setSelectedUser(user);
  };

  const closeUserDetails = () => {
    setSelectedUser(null);
  };
  return (
    <div className="py-16 justify-center items-center">
      <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
          Alumini
        </p>
        <p className="text-base text-gray-700 md:text-lg">
          Connect with our alumni who are making a difference in the world.
        </p>
      </div>
      <div className="grid gap-10 mx-auto lg:grid-cols-2 lg:max-w-screen-lg">
        {dbData.map((user) => (
          <div className="grid sm:grid-cols-3">
            <div className="relative w-full h-48 max-h-full rounded shadow sm:h-auto">
              <img
                className="absolute object-cover w-full h-full rounded"
                src={user.photoURL ? user.photoURL : "https://img.freepik.com/premium-vector/bald-empty-face-icon-avatar-vector-illustration_601298-13391.jpg"}
                alt="Person"
              />
            </div>
            <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
              <p className="text-lg font-bold">{user.username}</p>
              <p className="mb-4 text-xs text-gray-800">{user.startYear} - {user.endYear}</p>
              <p className="mb-4 text-sm tracking-wide text-gray-800">
                Bacon ipsum dolor sit amet salami jowl corned beef, andouille
                flank.
              </p>
              <div className="flex items-center space-x-3 mb-4">
                <button
                  onClick={() => viewUserDetails(user)}
                  className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-1 transition-colors duration-300"
                >
                  View More
                </button>
              </div>


              <div className="flex items-center space-x-3">
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                    <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                  </svg>
                </a>
              </div>
            </div>
            {selectedUser && (
        <UserDetails user={selectedUser} onClose={closeUserDetails} />
      )}
          </div>
        ))}
      </div>
    </div>
  );
};