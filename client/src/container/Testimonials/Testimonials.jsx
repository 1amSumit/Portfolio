import React, { useState, useEffect } from "react";
import "./Testimonials.scss";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrapper } from "../../wrapper";
import { urlFor, client } from "../../client";
import { MotionWrapper } from "../../wrapper";

const Testimonials = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonial] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(
    () => async () => {
      const query = `*[_type == "testimonials"]`;
      const brandsQuery = `*[_type == "brands"]`;

      const testimonialData = await client.fetch(query);
      setTestimonial(testimonialData);
      const brandData = await client.fetch(brandsQuery);
      setBrands(brandData);
    },
    []
  );

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  const test = testimonials[currentIndex];
  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(test.imgurl)} alt="testimonial" />
            <div className="app__testimonial-content">
              <p className="p-text">{test.feedback}</p>
              <div>
                <h4 className="bold-text">{test.name}</h4>
                <p className="p-text">{test.company}</p>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <div
              className="app__flex"
              onClick={() =>
                handleClick(currentIndex === 0 ? 0 : currentIndex + 1)
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className=".app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrapper(
  MotionWrapper(Testimonials, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
