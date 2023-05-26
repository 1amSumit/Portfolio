import React, { useState, useEffect } from "react";
import "./Skills.scss";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { AppWrapper, MotionWrapper } from "../../wrapper";
import { urlFor, client } from "../../client";

const Skills = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(
    () => async () => {
      const query = `*[_type == "experiences"]`;
      const SkillsQuery = `*[_type == "skills"]`;

      const expData = await client.fetch(query);
      setExperience(expData);
      const skillData = await client.fetch(SkillsQuery);
      setSkills(skillData);
    },
    []
  );
  return (
    <>
      <h2 className="head-text">Skills and technology using</h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div className="app__skills-exp">
          {experience.map((exp) => (
            <motion.div className="app__skills-exp-item" key={exp.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{exp.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {exp.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work app__flex"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <Tooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </Tooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
    </>
  );
};

export default AppWrapper(
  MotionWrapper(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
