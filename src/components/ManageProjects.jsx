import { useState, useEffect } from 'react'
import { Tilt } from "react-tilt"
import { motion } from 'framer-motion'
import { github } from "../assets"
import { fadeIn, textVariant } from '../utils/motion'
import { dbOperations } from '../utils/db'

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const { index, name, description, tags, image, source_code_link, live_demo_link } = project
  const [imageError, setImageError] = useState(false)

  // Function to convert Google Drive link to viewable image URL
  const getImageUrl = (url) => {
    if (!url) return '';
    
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
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    }
    
    return url;
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[350px] w-full relative group"
      >
        <div className="relative w-full h-[230px]">
          {!imageError ? (
            <img
              src={getImageUrl(image)}
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
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(project)}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>

        {live_demo_link && (
          <div 
            onClick={() => window.open(live_demo_link, "_blank")}
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-blue-500 hover:text-blue-400"
          >
            Live Demo →
          </div>
        )}
      </Tilt>
    </motion.div>
  )
}

export default function ManageProjects() {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProject, setEditingProject] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const savedProjects = await dbOperations.getAll()
      setProjects(savedProjects)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await dbOperations.delete(projectId)
        loadProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Failed to delete project')
      }
    }
  }

  const handleEdit = (project) => {
    setEditingProject({ ...project })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await dbOperations.update(editingProject.id, editingProject)
      setEditingProject(null)
      loadProjects()
      alert('Project updated successfully!')
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Failed to update project')
    }
  }

  if (isLoading) return <div className="text-white">Loading...</div>

  return (
    <div>
      {editingProject ? (
        <form onSubmit={handleUpdate} className="space-y-4 text-white mb-10">
          <div>
            <label className="block mb-2">Project Name *</label>
            <input
              type="text"
              value={editingProject.name}
              onChange={(e) => setEditingProject({
                ...editingProject,
                name: e.target.value
              })}
              className="w-full p-2 border rounded bg-tertiary"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Description *</label>
            <textarea
              value={editingProject.description}
              onChange={(e) => setEditingProject({
                ...editingProject,
                description: e.target.value
              })}
              className="w-full p-2 border rounded bg-tertiary"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Image URL *</label>
            <input
              type="url"
              value={editingProject.image}
              onChange={(e) => setEditingProject({
                ...editingProject,
                image: e.target.value
              })}
              className="w-full p-2 border rounded bg-tertiary"
              required
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block mb-2">Source Code URL *</label>
            <input
              type="url"
              value={editingProject.source_code_link}
              onChange={(e) => setEditingProject({
                ...editingProject,
                source_code_link: e.target.value
              })}
              className="w-full p-2 border rounded bg-tertiary"
              required
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="block mb-2">Live Demo URL</label>
            <input
              type="url"
              value={editingProject.live_demo_link}
              onChange={(e) => setEditingProject({
                ...editingProject,
                live_demo_link: e.target.value
              })}
              className="w-full p-2 border rounded bg-tertiary"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block mb-2">Tags</label>
            {editingProject.tags.map((tag, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tag.name}
                  onChange={(e) => {
                    const newTags = [...editingProject.tags]
                    newTags[index].name = e.target.value
                    setEditingProject({
                      ...editingProject,
                      tags: newTags
                    })
                  }}
                  className="w-full p-2 border rounded bg-tertiary"
                  placeholder="Tag name"
                />
                <select
                  value={tag.color}
                  onChange={(e) => {
                    const newTags = [...editingProject.tags]
                    newTags[index].color = e.target.value
                    setEditingProject({
                      ...editingProject,
                      tags: newTags
                    })
                  }}
                  className="p-2 border rounded bg-tertiary"
                >
                  <option value="blue-text-gradient">Blue</option>
                  <option value="green-text-gradient">Green</option>
                  <option value="pink-text-gradient">Pink</option>
                  <option value="yellow-text-gradient">Yellow</option>
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setEditingProject({
                ...editingProject,
                tags: [...editingProject.tags, { name: '', color: 'blue-text-gradient' }]
              })}
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Tag
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-20 flex flex-wrap gap-7">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || `project-${index}`}
              project={{ ...project, index }}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
} 