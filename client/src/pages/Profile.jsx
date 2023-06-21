import React from "react";
import { useState, useEffect } from "react";
import MyFavourites from "./MyFavourites";
import Settings from "./Settings";

export default function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch(`/api/auth/user`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        // console.log(data)
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      setError(err.message);
    }
    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!user) {
      return <div>Loading...</div>;
    }
  }

  const savePicture = async event => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/auth/user/pic`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ profile_pic: image })
      });
      if (response.ok) {
        const data = await response.json();
        getUserInfo();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  console.log(user);

  return (
    <>
      <div className="container">
        <div className="row py-3 mt-3 border-bottom border-end border-primary border-3 shadow">
          <div className="col-5  p-3">
            <div className="ps-4 justify-content-center">
              <form onSubmit={savePicture}>
                <input type="file" onChange={handleChange} />
                <button type="submit">Update profile picture</button>
              </form>
              {user.profile_pic ? (
                <img
                  className="shadow img-fluid mt-1 mb-1 d-block bg-info rounded-circle selected"
                  src={user.profile_pic}
                  height={150}
                  width={150}
                  alt="Profile"
                />
              ) : (
                <img
                  className="shadow img-fluid mt-1 mb-1 d-block bg-info rounded-circle selected"
                  src="https://static.vecteezy.com/system/resources/previews/007/224/792/original/robot-modern-style-vector.jpg"
                  height={150}
                  width={150}
                  alt="Default Profile"
                />
              )}
              <div key={user.id} className="mt-4">
                <h2>
                  {user.firstname} {user.lastname}
                </h2>

                <p className="h6 mb-0 pb-0">Email:</p>
                <p className="mt-0 pt0">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="col col-7">
            <div>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setShowFavourites(!showFavourites)}
              >
                {showFavourites ? "Hide Favourites" : "My Favourites"}
              </button>
              {showFavourites && <MyFavourites />}
            </div>
            <div>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setShowSettings(!showSettings)}
              >
                {showSettings ? "Hide Settings" : "My Settings"}
              </button>
              {showSettings && <Settings />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
