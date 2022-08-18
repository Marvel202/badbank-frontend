import React from "react";
import { useSession } from "../firebaseapp/UserProvider";

export const Profile = () => {
  const { user } = useSession();
  console.log("from profile", user);
  if (!user) {
    return null;
  }

  return (
    <div>
      <p>Name: {user.displayName}</p>
      <p>Email: {user.email}</p>
      <p>ID: {user.uid}</p>
    </div>
  );
};

// export default Profile;
