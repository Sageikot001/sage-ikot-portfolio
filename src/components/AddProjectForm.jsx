'use client'
import { useState } from 'react'
import { projectsDB } from '../utils/appwrite'

export default function AddProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    source_code_link: '',
    live_demo_link: '',
    tags: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, '']
    })
  }

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags]
    newTags[index] = value
    setFormData({ ...formData, tags: newTags })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      console.log('Submitting data:', formData)

      const formattedProject = {
        name: formData.name,
        description: formData.description,
        source_code_link: formData.source_code_link,
        live_demo_link: formData.live_demo_link,
        tags: Array.isArray(formData.tags) 
          ? formData.tags
              .map(tag => String(tag).trim())
              .filter(tag => tag !== '')
          : [],
        image: formData.image ? formData.image : null
      }

      console.log('Formatted data:', formattedProject)
      
      await projectsDB.add(formattedProject)
      window.dispatchEvent(new CustomEvent('projectsUpdated'))
      setFormData({
        name: '',
        description: '',
        image: null,
        source_code_link: '',
        live_demo_link: '',
        tags: []
      })
      alert('Project added successfully!')
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project. Error: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div>
        <label className="block mb-2">Project Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded bg-tertiary"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-2 border rounded bg-tertiary"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block mb-2">Image URL *</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
        />
        <small className="text-gray-400 mt-1 block">
          For Google Drive images: Share the file and set access to "Anyone with the link"
        </small>
      </div>

      {formData.image && (
        <div className="mt-2">
          <img 
            src={URL.createObjectURL(formData.image)} 
            alt="Preview" 
            className="w-full max-h-64 object-contain"
          />
        </div>
      )}

      <div>
        <label className="block mb-2">Source Code URL *</label>
        <input
          type="url"
          value={formData.source_code_link}
          onChange={(e) => setFormData({...formData, source_code_link: e.target.value})}
          className="w-full p-2 border rounded bg-tertiary"
          required
          placeholder="https://github.com/..."
        />
      </div>

      <div>
        <label className="block mb-2">Live Demo URL</label>
        <input
          type="url"
          value={formData.live_demo_link}
          onChange={(e) => setFormData({...formData, live_demo_link: e.target.value})}
          className="w-full p-2 border rounded bg-tertiary"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block mb-2">Tags</label>
        {formData.tags.map((tag, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              className="w-full p-2 border rounded bg-tertiary"
              placeholder="Tag name"
            />
            {/* <select
              value={tag.color}
              onChange={(e) => handleTagChange(index, 'color', e.target.value)}
              className="p-2 border rounded bg-tertiary"
            >
              <option value="blue-text-gradient">Blue</option>
              <option value="green-text-gradient">Green</option>
              <option value="pink-text-gradient">Pink</option>
              <option value="yellow-text-gradient">Yellow</option>
            </select> */}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTag}
          className="text-blue-500 hover:text-blue-600"
        >
          + Add Tag
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${
          isSubmitting 
            ? 'bg-blue-300 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-4 py-2 rounded transition-colors`}
      >
        {isSubmitting ? 'Adding Project...' : 'Add Project'}
      </button>
    </form>
  )
}