import React from "react";
import { useState, useEffect } from "react";
import MyFavourites from "./MyFavourites";
import Settings from "./Settings";
import Accordion from "react-bootstrap/Accordion";

export default function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [showFavourites, setShowFavourites] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      <div className="container">
        <div className="row py-3 mt-3 border-bottom border-end border-primary border-3 shadow">
          <div className="col-4 ms-3 p-3 bg-dark text-white">
            <div className="ps-4 pb-2 justify-content-center">
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
              <h6 className="ps-3 h4 ">View Summary:</h6>

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
                  Favourites
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
                      setShowFavourites(!showFavourites);
                  }}
                >
                  {" "}
                  Settings
                  {/* {showSettings ? "Hide Settings" : "My Settings"} */}
                </button>
              </div>
            </div>

            <div className="container mt-2 pt-4">
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
          <div className="col">
            <div>{showFavourites && <MyFavourites />}</div>
            <div>{showSettings && <Settings />}</div>
          </div>
        </div>
      </div>
    </>
  );
}
