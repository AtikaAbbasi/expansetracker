

import React, { useEffect, useState } from "react";
import { auth, doc,
 onSnapshot, db,
signOut } from "../firebase/firebaseconfig.js";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = () => {
      const user = auth.currentUser;
      if (!user) return;

      const profileRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(profileRef, (docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      });

      return () => unsubscribe(); // cleanup listener
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div className="text-center mt-20 text-gray-500">Loading profile...</div>;
  }


  let signout = async ()=>{
    try {
      await signOut(auth);
       window.location.pathname = "/log";
        alert("loged Out")
    } catch (error) {
      console.log("Signout Error:", error);
     }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md text-center">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={profile?.profileImage}
            alt="Profile"
            className="rounded-full w-24 h-24 border-4 border-yellow-400 object-cover"
          />
        </div>

        {/* Name and Info */}
        <h1 className="text-2xl font-bold mt-4 text-gray-800">Name : <span>{profile?.name}</span></h1>
        <br />
        <h2 className="text-sm text-gray-600 mt-1">Email : <span>{profile?.email}</span></h2>
          <br />
         <button
        type="button"
        onClick={signout}
        className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
        Sign-Out
      </button>
      </div>
    </div>
  );
};

export default Profile;