import React from "react";
import { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import "../App.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import AuthContext from "../components/context/AuthContext.js";
import { useContext } from "react";

import Modal from "react-bootstrap/Modal";

function Welcome({
  currentForm,
  setCurrentForm,
  isOpen,
  showModal,
  hideModal,
  toggleForm,
  user
}) {
  if (user) {
    return <Navigate to="/private/dashboard" replace />;
  } else {
    return (
      <>
        <Modal
          show={isOpen}
          size="lg"
          onHide={hideModal}
          dialogClassName={""}
          centered
        >
          <Modal.Body className="border-bottom  border-3 border-secondary shadow rounded">
            {currentForm === "login" ? (
              <Login
                onFormSwitch={toggleForm}
                hideModal={hideModal}
                // login={login} credentials={credentials} setCredentials={setCredentials}
              />
            ) : (
              <Register onFormSwitch={toggleForm} hideModal={hideModal} />
            )}
          </Modal.Body>
        </Modal>

        <section id="hero">
          <div className="text-light bg-dark vh-nav parent p-0 m-0 ">
            {/* <div className="text-light bg-dark  p-0 m-0 d-md-none "> */}
            <div className="row m-0">
              <div className="col-md-7 text-start vh-nav parent">
                <div className="hero-position">
                  {/* <div className="text-white ms-5 p-5 d-md-none ">
                      [image placeholder]
                    </div> */}

                  <h1 className="display-2">
                    EAT,{" "}
                    <span className="text-secondary display-2">CODE, </span>{" "}
                    <span className="text-primary display-1 ">REPEAT</span>
                  </h1>
                  <p className="lead text-white text-opacity-50 tag-line d-none d-md-block">
                    Debug your meal prep with Busy Bytes!
                  </p>
                  {/* <button>test </button> */}
                  <button
                    className="btn pushable-b-lg d-md-none "
                    onClick={() => {
                      setCurrentForm("register"), showModal();
                    }}
                  >
                    <span className="shadow-btn-b-lg"></span>
                    <span className="edge-b-lg"></span>
                    <span className="front-b-lg">GET STARTED </span>
                  </button>
                </div>
              </div>

              <div className="col-5">
                <div className="row vh-nav-66 ">
                  <div className="my-auto">
                    <div className="text-white ms-5 p-5 d-none d-md-block">
                      <img
                        className="img-fluid"
                        src=".\images\BusyBytes.png"
                        alt="BusyBytes robot"
                      />
                    </div>
                  </div>
                </div>
                <div className="row vh-nav-33 parent">
                  <div className="text-end hero-button d-none d-md-block">
                    <button
                      className="btn pushable-b-lg "
                      onClick={() => {
                        setCurrentForm("register"), showModal();
                      }}
                    >
                      <span className="shadow-btn-b-lg"></span>
                      <span className="edge-b-lg"></span>
                      <span className="front-b-lg">GET STARTED </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="learn_more"
              className=" absolute width100 text-center text-white d-none d-md-block"
            >
              <p className="mb-0 pb-0 h6">Learn more </p>

              <i className="bi bi-caret-down-fill white pt-0"></i>
            </div>
            {/* </div> */}
          </div>
        </section>

        <section>
          <div className="text-center p-5 pb-0 text-dark">
            <h1 className="display-3 fs-1 text-dark border-bottom  border-dark border-3  p-2">
              <span className="">Welcome to BusyBytes</span>
            </h1>
            <div className="mx-5 mt-5 border-bottom border-end border-primary border-3 rounded bg-blueLight text-start shadow">
              <div className="container p-4">
                <h2 className="display-5 fs-4 mb-2">
                  Introducing BusyBytes...
                </h2>

                <blockquote className="blockquote text-center p-2">
                  {/* <h3 className="font-monospace text-start">&lt; / hunger &gt;</h3> */}
                  BusyBytes is the ultimate app designed specifically for tech
                  enthusiasts like you, offering a seamless solution to
                  streamline your meal planning, grocery shopping, and cooking
                  processes. With BusyBytes , you can indulge in your coding
                  passion while enjoying delicious, hassle-free meals.
                </blockquote>

                {/* <p className="display-5 fs-5 text-end">&lt; / hunger &gt;</p> */}
              </div>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="text-center p-5 pb-0 text-dark">
            <h2 className="display-5 fs-3 text-dark border-bottom border-dark border-3">
              <span className="">Features</span>
            </h2>

            <div className="mx-5 my-5 border-bottom border-end border-secondary border-3 rounded bg-aquaLight text-end shadow-sm">
              <div className="container p-4">
                <h2 className="display-5 fs-5">Program your plates</h2>

                <div className="">
                  Browse our extensive recipe library for some inspiration. Then
                  plan your upcoming meals with the Busy Bytes Meal Planner! You
                  can schedule a wide{" "}
                  <span>
                    <code className="fs-4 text-primary ">[array]</code>
                  </span>{" "}
                  of dishes into you calendar so that you can stop reaching for{" "}
                  <span>
                    <code className="fs-4 text-primary ">pizza.slice(1)</code>
                  </span>
                  .
                </div>
              </div>
            </div>

            <div className="mx-5 mt-5 border-bottom border-end border-primary border-3 rounded bg-blueLight text-start shadow-sm">
              <div className="container p-4">
                <h2 className="display-5 fs-5">&lt; / emptyFridge &gt;</h2>

                <div className="">
                  Is your shopping basket returning{" "}
                  <span>
                    <code className="fs-4 text-primary ">undefined</code>
                  </span>{" "}
                  ? Generate a shopping list of all the ingredients for your
                  planned meal so you always have a{" "}
                  <span className="fw-bold">byte</span> to eat.
                </div>
              </div>
            </div>

            <div className="mx-5 my-5 border-bottom border-end border-secondary border-3 rounded bg-aquaLight text-end shadow-sm">
              <div className="container p-4">
                <h2 className="display-5 fs-5">Repo your recipes</h2>

                <div className="">
                  Ready to <span className="fw-bold">commit</span> to a dish?
                  Save all your favourite recipes to your recipe repository.
                  We'll leave you to handle the{" "}
                  <span className="fw-bold">forks... </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center text-center mt-4 mx-0">
            <p className="mb-0 pb-0 h6">About </p>

            <i className="bi bi-caret-down-fill white pt-0"></i>
          </div>
        </section>

        <section className=" text-light bg-dark text-center" id="about">
          <div className="p-5">
            <small>
              This a student project made at the CodeOp FullStack Bootcamp in
              Barcelona created by Camille Richet, Natalia Hernández and Calix
              Rose.
            </small>
          </div>
        </section>
      </>
    );
  }
}

export default Welcome;
