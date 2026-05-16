import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const data = JSON.parse(localStorage.getItem("user"));
      setUser(data);
    };

    loadUser();

    // 🔥 listen for updates
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>My Profile</h2>

    

      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Phone:</b> {user?.phone}</p>
    </div>
  );
};

export default Profile;