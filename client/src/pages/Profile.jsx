import React from "react";
import { useState, useEffect } from "react";
import MyFavourites from "./MyFavourites";
import Settings from "./Settings";
import Accordion from "react-bootstrap/Accordion";

export default function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileSummary, setProfileSummary] = useState(true);

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

  const handleImageChange = event => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="container my-3">
        <div className="row shadow ">
          <div className="col-md-4 bg-dark text-white m-0 p-0 border border-primary border-3 profile-min-height ">
            <div className="ps-4 py-2">
              {selectedImage || user.profilePicture ? (
                <img
                  className="shadow img-fluid mt-1 mb-1 d-block bg-info rounded-circle selected"
                  src={selectedImage || user.profilePicture}
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
                <h2 className="display-5 fs-4">
                  {user.firstname} {user.lastname}
                </h2>

                <p className="h6 mb-0 pb-0">Email:</p>
                <p className="mt-0 pt0">{user.email}</p>
              </div>
            </div>
            <div className="ps-2 py-3">
              {/* <h6 className="ps-3 h4 ">View Summary:</h6> */}

              <div className="ps-1">
                <button
                  type="button"
                  className={
                    showFavourites ? "btn text-primary" : "btn text-white"
                  }
                  onClick={() => {
                    setShowFavourites(!showFavourites),
                      setShowSettings(!showSettings);
                  }}
                >
                  My Favourites
                  {/* {showFavourites ? "Hide Favourites" : "My Favourites"} */}
                </button>
              </div>
              <div className="ps-1">
                <button
                  type="button"
                  className={
                    showSettings ? "btn text-primary" : "btn text-white"
                  }
                  onClick={() => {
                    setShowSettings(!showSettings),
                      setShowFavourites(!showFavourites),
                      setProfileSummary(true);
                  }}
                >
                  {" "}
                  My Preferences
                  {/* {showSettings ? "Hide Settings" : "My Settings"} */}
                </button>
              </div>
            </div>

            <div className="container">
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Update your details</Accordion.Header>
                  <Accordion.Body>
                    <label htmlFor="" className="p-1 ">
                      Upload new profile picture:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="form-control text-primary border border-primary border-3"
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="col m-0 p-0 profile-min-height">
            <div className="">
              <div>{showFavourites && <MyFavourites />}</div>
              <div>
                {showSettings && (
                  <Settings
                    setProfileSummary={setProfileSummary}
                    profileSummary={profileSummary}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
