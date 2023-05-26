import React, { useState } from "react";

import { images } from "../../constants";
import { AppWrapper, MotionWrapper } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const onChnageInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    const res = await client.create(contact);
    if (res.ok) {
      setLoading(false);
      setIsFormSubmitted(true);
    }
  };

  const onTextChangeHandle = () => {};

  return (
    <>
      <h2 className="head-text">take a Coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:sj779619@gmail.com" className="p-text">
            sj779619@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +911234567890" className="p-text">
            xxxxxxxxxx
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              type="text"
              className="p-text"
              placeholder="your name"
              value={name}
              onChange={onChnageInput}
              name="name"
            />
          </div>
          <div className="app__flex">
            <input
              type="email"
              className="p-text"
              placeholder="email@gmail.com"
              value={email}
              onChange={onChnageInput}
              name="email"
            />
          </div>
          <div>
            <textarea
              name="message"
              id=""
              cols="30"
              rows="10"
              className="p-text"
              placeholder="your message"
              value={message}
              onChange={onChnageInput}
            />
          </div>
          <button type="button" className="p-text" onClick={onSubmithandler}>
            {loading ? "Sending..." : "Send message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank You for getting in touch</h3>
        </div>
      )}
    </>
  );
};

export default AppWrapper(
  MotionWrapper(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
