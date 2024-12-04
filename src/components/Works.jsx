import { useState, useEffect } from 'react'
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects as defaultProjects } from "../constants";
import { dbOperations } from "../utils/db";
import { fadeIn, textVariant } from "../utils/motion";

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

  // Function to convert Google Drive link to viewable image URL
  const getImageUrl = (url) => {
    if (!url) return '';
    
    console.log('Original URL:', url);
    
    // Check if it's a Google Drive link
    if (url.includes('drive.google.com')) {
      // Extract file ID from various Google Drive URL formats
      let fileId = '';
      
      if (url.includes('/file/d/')) {
        fileId = url.split('/file/d/')[1].split('/')[0];
      } else if (url.includes('id=')) {
        fileId = url.split('id=')[1].split('&')[0];
      }
      
      if (fileId) {
        // Try the alternative export format
        const transformedUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
        console.log('Transformed URL:', transformedUrl);
        return transformedUrl;
      }
    }
    
    return url;
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e);
    console.log('Failed image URL:', e.target.src);
    setImageError(true);
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)} onClick={() => live_demo_link && window.open(live_demo_link, "_blank")}>
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
              src={getImageUrl(image)}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
              onError={handleImageError}
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-tertiary rounded-2xl">
              <p className="text-white text-[14px]">{name}</p>
            </div>
          )}

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
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
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
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
      const savedProjects = await dbOperations.getAll()
      console.log('Loaded projects from DB:', savedProjects)
      setAllProjects([...defaultProjects, ...savedProjects])
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
    
    // Create a custom event listener for project updates
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

  console.log('Current allProjects state:', allProjects)

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
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
