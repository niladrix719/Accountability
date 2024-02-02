import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { style } from "../style";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
// import { textVariant } from "../utils/motion";
const Projects = [

     {  
        title: "lorem ipsum", 
       team_name: "Vendetta",
       goal: "lorem ipsum ",
      subgoal: "eohugheu"
      },
      {  
        title: "lorem ipsum", 
       team_name: "Vendetta",
       goal: "lorem ipsum ",
      subgoal: "eohugheu"
      },
      {  
        title: "lorem ipsum", 
       team_name: "Vendetta",
       goal: "lorem ipsum ",
      subgoal: "eohugheu"
      },

]
const ProjectCard = ({ experience }) => {
  return (
    
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      // icon={
      //   <div className='flex justify-center items-center w-full h-full'>
      //     <img
      //       src={experience.icon}
      //       alt={experience.company_name}
      //       className='w-[60%] h-[60%] object-contain'
      //     />
      //   </div>
      // }
    >
      <div>
        <h3 className='text-white text-[30px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[20px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[20px] pl-1 tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Project = () => {
  return (
    
    <div className="bg-cover" style={{ background: 'linear-gradient(to right, #39B8FF, #3182CE)' }}>
     <form>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Projects"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
      <motion.div>
        
       
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ProjectCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
    
  );
};

export default SectionWrapper(Project, "work");