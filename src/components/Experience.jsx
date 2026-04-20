import { useState, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion"

import 'react-vertical-timeline-component/style.min.css';

import { styles } from "../styles";
import { experiences as defaultExperiences } from "../constants";
import { experiencesDB } from "../utils/appwrite";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
  contentStyle= {{ background: '#1d1836', colo: '#fff' }}
  contentArrowStyle={{ borderRight: '7px solid #232631'}}
  date={experience.date}
  iconStyle={{ background: experience.iconBg}}
  icon={
    <div className="flex justify-center items-center w-full h-full">
      <img
      src={experience.icon}
      alt={experience.company_name}
      className="w-[60%] h-[60%] object-contain "
      />
    </div>
  }
  >
    <div>
      <h3 className="text-white text-[24px] font-bold">
        {experience.title}
      </h3>
      <p className="text-secondary text-[16px] font-semibold " style={{ margin: 0 }}>{experience.company_name}</p>
    </div>

    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point, index) => (
        <li
        key={`experience-point-${index}`}
        className="text-white-100 text-[14px] pl-1 tracking-wider"
        >
          {point}
        </li>
      ) )}
    </ul>
  </VerticalTimelineElement>
)

const Experience = () => {
  const [allExperiences, setAllExperiences] = useState(defaultExperiences)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const savedExperiences = await experiencesDB.getAll()
        setAllExperiences([...savedExperiences, ...defaultExperiences])
      } catch (error) {
        console.error('Error loading experiences:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadExperiences()

    const handleUpdate = () => loadExperiences()
    window.addEventListener('experiencesUpdated', handleUpdate)
    return () => window.removeEventListener('experiencesUpdated', handleUpdate)
  }, [])

  if (isLoading) {
    return <div className="text-white">Loading experiences...</div>
  }

  return (
    <>
    <motion.div variants={textVariant()}>
    <p className={styles.sectionSubText}>What I have done so far</p>
      <h2 className={styles.sectionHeadText}>Work Experience.</h2>
    </motion.div>
    <div className="nt-20 flex flex-col">
      <VerticalTimeline>
        {allExperiences.map((experience, index) => (
          <ExperienceCard key={experience.$id || index} experience={experience}/>
        ))}
      </VerticalTimeline>
    </div>
    </>
  )
}

export default SectionWrapper(Experience, "work")