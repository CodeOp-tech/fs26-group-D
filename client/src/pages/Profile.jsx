import React from "react";
import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

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

  return (
    <>
      <div className="container">
        <div className="row py-3 mt-3 border-bottom border-end border-primary border-3 shadow">
          <div className="col-5  p-3">
            <div className="ps-4 justify-content-center">
              <img
                className="shadow img-fluid  mt-1 mb-1 d-block bg-info rounded-circle selected"
                src="https://i.pinimg.com/736x/44/76/18/447618cb49cf25bccc9ce1c252ca4c5a.jpg"
                height={150}
                width={150}
              />

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
            SUMMARY OF FAVOURITES AND RESTRICTIONS
          </div>
        </div>
      </div>
    </>
  );
}
