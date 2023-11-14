import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";


function UserProfile() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log(`User data ${currentUser}`);

 
  return (
    <div>
      {currentUser && (
        <div>
          <p><span className="fw-bold"><i>User Email id</i></span>: <i>{currentUser.email}</i></p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
