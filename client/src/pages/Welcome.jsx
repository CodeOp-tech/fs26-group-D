import React from "react";
import { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import "../App.css";

import Modal from "react-bootstrap/Modal";

function Welcome({
  currentForm,
  setCurrentForm,
  isOpen,
  showModal,
  hideModal,
  toggleForm
}) {
  return (
    <>
      <section id="hero">
        <div className="text-light bg-dark vh-nav parent">
          <div className="row">
            <div className="col text-start ">
              <h1 className="display-3 mt-5 pt-5 mb-3">
                EAT, <span className="text-secondary">CODE, </span>{" "}
                <span className="text-primary display-2">REPEAT</span>
              </h1>
              <p className="lead text-white text-opacity-50">
                Debug your meal prep with Busy Bytes!
              </p>
            </div>

            <div className="col-6 text-center">
              <div className=" container mt-5 pt-4 col-8">
                <div className="mt-5 pt-5 text-secondary">
                  placeholder for image
                </div>
              </div>
              <div className="row mt-5 pt-5 mb-0 pb-0 ">
                <div className="text-end">
                  <button
                    className="btn pushable-b-lg"
                    onClick={() => {
                      setCurrentForm("register"), showModal();
                    }}
                  >
                    <span className="shadow-btn-b-lg"></span>
                    <span className="edge-b-lg"></span>
                    <span className="front-b-lg">GET STARTED </span>
                  </button>

                  <Modal
                    show={isOpen}
                    size="lg"
                    onHide={hideModal}
                    dialogClassName={""}
                  >
                    <Modal.Body>
                      {currentForm === "login" ? (
                        <Login onFormSwitch={toggleForm} />
                      ) : (
                        <Register onFormSwitch={toggleForm} />
                      )}
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          <div id="learn_more" className=" absolute width100 text-center">
            <p className="mb-0 pb-0 h6">Learn more </p>

            <i className="bi bi-caret-down-fill white pt-0"></i>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="">
          <div className="container-lg text-center p-5 pb-0 text-dark">
            <h1 className="display-5 fs-3 text-dark border-bottom border-dark border-3">
              <span className="">Features</span>
            </h1>

            <div className="mx-5 my-5 border-bottom border-end border-secondary border-3 rounded bg-aquaLight text-end shadow-sm">
              <div className="container p-4">
                <h2 className="display-5 fs-5">Program your Plates</h2>

                <div className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis dicta illum voluptas, provident et accusantium,
                  necessitatibus nulla unde iusto neque voluptates dolor
                  aliquam? Praesentium esse nemo aut nisi, dolorum natus!
                </div>
              </div>
            </div>

            <div className="mx-5 mt-5 border-bottom border-end border-primary border-3 rounded bg-blueLight text-start shadow-sm">
              <div className="container p-4">
                <h2 className="display-5 fs-5">Develop your dishes</h2>

                <div className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus, sequi tempore corrupti suscipit molestiae ducimus
                  voluptate illo minus praesentium magni facilis maxime adipisci
                  labore deserunt iste necessitatibus mollitia cumque
                  quibusdam.y
                </div>
              </div>
            </div>

            <div className="mx-5 my-5 border-bottom border-end border-secondary border-3 rounded bg-aquaLight text-end shadow-sm">
              <div className="container p-4">
                <h2 className="display-5 fs-5">Repo your recipes</h2>

                <div className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem totam, labore beatae quo accusantium doloremque
                  repudiandae deleniti praesentium omnis esse eum voluptatem
                  ipsum, voluptas eligendi sunt itaque nam commodi temporibus!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center text-center mt-4">
          <p className="mb-0 pb-0 h6">About </p>

          <i className="bi bi-caret-down-fill white pt-0"></i>
        </div>
      </section>

      <section className=" text-light bg-dark text-center" id="about">
        <div className="p-5">
          <small>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            sequi maxime beatae quasi quidem iusto unde fuga atque soluta
            laborum!
          </small>
        </div>
      </section>
    </>
  );
}

export default Welcome;
