import { useState, useEffect } from 'react'
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects as defaultProjects } from "../constants";
import { projectsDB } from "../utils/appwrite";
import { fadeIn, textVariant } from "../utils/motion";

const tagColors = [
  'blue-text-gradient',
  'green-text-gradient',
  'pink-text-gradient',
  'yellow-text-gradient'
];

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      initial="show"
      animate="show"
      viewport={{ once: true }}
      onClick={() => live_demo_link && window.open(live_demo_link, "_blank")}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[350px] w-full"
      >
        <div className="relative w-full h-[230px]">
          {!imageError ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-tertiary rounded-2xl">
              <p className="text-white text-[14px]">{name}</p>
            </div>
          )}

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <p
              key={`${name}-${idx}`}
              className={`text-[14px] ${tagColors[idx % tagColors.length]}`}
            >
              #{typeof tag === 'object' ? tag.name : tag}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [allProjects, setAllProjects] = useState(defaultProjects)
  const [isLoading, setIsLoading] = useState(true)

  const loadProjects = async () => {
    setIsLoading(true)
    try {
      const savedProjects = await projectsDB.getAll()
      setAllProjects([...savedProjects, ...defaultProjects])
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
    
    const handleProjectUpdate = () => {
      console.log('Project update event received')
      loadProjects()
    }
    
    window.addEventListener('projectsUpdated', handleProjectUpdate)
    return () => window.removeEventListener('projectsUpdated', handleProjectUpdate)
  }, [])

  if (isLoading) {
    return <div>Loading projects...</div>
  }

  return (
    <>
      <motion.div 
        variants={textVariant()}
        initial="show"
        animate="show"
      >
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          initial="show"
          animate="show"
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve comples problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {allProjects.map((project, index) => (
          <ProjectCard 
            key={project.id || `project-${index}`}
            index={index} 
            {...project} 
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");