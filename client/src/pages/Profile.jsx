import React from "react";
import { useState, useEffect } from "react";
import MyFavourites from "./MyFavourites";
import Settings from "./Settings";
import Accordion from "react-bootstrap/Accordion";

export default function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);
  const [settingsSummary, setSettingsSummary] = useState(true);
  const [favouritesSummary, setFavouritesSummary] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showUpdateEmail, setShowUpdateEmail] = useState(false);
  const [showUpdateProfilePicture, setShowUpdateProfilePicture] = useState(
    false
  );

  useEffect(() => {
    getUserInfo();
    return () => URL.revokeObjectURL(imageUrl);
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
        // Set the image URL if available
        if (data.profile_pic) {
          const blob = new Blob([new Uint8Array(data.profile_pic.data)]);
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function toggleUpdateEmailView() {
    setShowUpdateEmail(prevShowUpdateEmail => !prevShowUpdateEmail);
  }

  async function updateEmail(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/auth/user/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ email: newEmail })
      });

      if (response.ok) {
        const data = await response.json();
        getUserInfo();
        setNewEmail(""); // Clear the input field
        toggleUpdateEmailView();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function toggleUpdateProfilePictureView() {
    setShowUpdateProfilePicture(
      prevShowUpdateProfilePicture => !prevShowUpdateProfilePicture
    );
  }

  function handleChange(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  const savePicture = async event => {
    event.preventDefault();
    try {
      const imageFile = image;

      // Read the image file as binary data
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result; // Binary data of the image

        try {
          const response = await fetch(`/api/auth/user/pic`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({ image: imageData })
          });

          if (response.ok) {
            const data = await response.json();
            getUserInfo();
            toggleUpdateProfilePictureView();
          } else {
            console.log("Error:", response.status);
          }
        } catch (error) {
          console.log(error);
        }
      };
      reader.readAsDataURL(imageFile);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(image);
  console.log(imageUrl);

  return (
    <>
      <div className="container my-3">
        <div className="row shadow ">
          <div className="col-md-4 bg-dark text-white m-0 p-0 border border-primary border-3 profile-min-height ">
            <div className="ps-4 py-2">
              {!showUpdateProfilePicture ? (
                <>
                  <button onClick={toggleUpdateProfilePictureView}>🖊</button>
                  <img
                    className="shadow img-fluid mt-1 mb-1 d-block bg-info rounded-circle selected"
                    src="https://static.vecteezy.com/system/resources/previews/007/224/792/original/robot-modern-style-vector.jpg"
                    height={150}
                    width={150}
                    alt="Default Profile"
                  />
                </>
              ) : (
                <>
                  <form onSubmit={savePicture}>
                    <input type="file" onChange={handleChange} />
                    <button type="submit">Update profile picture</button>
                    <button onClick={toggleUpdateProfilePictureView}>
                      Cancel
                    </button>
                  </form>
                  {imageUrl ? (
                    <img
                      className="shadow img-fluid mt-1 mb-1 d-block bg-info rounded-circle selected"
                      src={imageUrl}
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
                </>
              )}
              <div key={user.id} className="mt-4">
                <h2 className="display-5 fs-4">
                  {user.firstname} {user.lastname}
                </h2>

                <p className="h6 mb-0 pb-0">Email:</p>
                {!showUpdateEmail ? (
                  <>
                    <button onClick={toggleUpdateEmailView}>🖊</button>
                    <p className="mt-0 pt0">{user.email}</p>
                  </>
                ) : (
                  <form onSubmit={updateEmail}>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={e => setNewEmail(e.target.value)}
                    />
                    <button type="submit">Update Email</button>
                    <button onClick={toggleUpdateEmailView}>Cancel</button>
                  </form>
                )}
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
                      setShowSettings(!showSettings),
                      setFavouritesSummary(true),
                      setSettingsSummary(false);
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
                      setSettingsSummary(true),
                      setFavouritesSummary(false);
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
                      onChange={handleChange}
                      className="form-control text-primary border border-primary border-3"
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <div className="col m-0 p-0 profile-min-height">
            <div className="">
              <div>
                {showFavourites && (
                  <MyFavourites favouritesSummary={favouritesSummary} />
                )}
              </div>
              <div>
                {showSettings && (
                  <Settings
                    // setSettingsSummary={setSettingsSummary}
                    settingsSummary={settingsSummary}
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
