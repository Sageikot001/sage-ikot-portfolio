import React from 'react'
import {Tilt} from 'react-tilt';
import { motion } from 'framer-motion';
import { Document, Page } from 'react-pdf'

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc'
import cv from '../assets/cv.pdf'

const ServiceCard = ({ index, title, icon}) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div 
      variants={fadeIn("right", "spring", 0.5 * index, 0.75 )}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card '
      >
        <div 
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
   </Tilt>
  )
}

const About = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
    </motion.div>

    <motion.p 
    variants={fadeIn("", "", 0.1, 1)}
    className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
      I am a skilled software developer with experience in Typescript and JavaScript, and expertise in frameworks like React, Node.js and React Native.
      I'm a quick learner, highly motivated and creative individual. I collaborate closely with clients and teams to create efficient, scalable, and user-friendly solutions that solve real world challenges. Lets work together to bring your ideas to life.
    </motion.p>

    <div className=" mt-20 flex flex-1 flex-wrap gap-10">
      {services.map((services, index) => (<ServiceCard key={services.title} index={index} {...services} />
      ))}
    </div>

    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-10">
      <a
        href={cv}
        download="YourName_CV.pdf"
        className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
      >
        Download CV
      </a>
      
      <button
        onClick={() => window.open(cv, '_blank')}
        className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
      >
        View CV
      </button>
    </div>
    </>
  )
}

export default SectionWrapper (About, "about") 