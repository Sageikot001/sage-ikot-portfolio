'use client'
import { useState } from 'react'
import { dbOperations } from '../utils/db'

export default function AddProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    source_code_link: '',
    live_demo_link: '',
    tags: [{ name: '', color: 'blue-text-gradient' }]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, { name: '', color: 'blue-text-gradient' }]
    })
  }

  const handleTagChange = (index, field, value) => {
    const newTags = [...formData.tags]
    newTags[index][field] = value
    setFormData({ ...formData, tags: newTags })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await dbOperations.add(formData)
      setFormData({
        name: '',
        description: '',
        image: '',
        source_code_link: '',
        live_demo_link: '',
        tags: [{ name: '', color: 'blue-text-gradient' }]
      })
      alert('Project added successfully!')
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Failed to add project')
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
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          className="w-full p-2 border rounded bg-tertiary"
          required
          placeholder="https://..."
        />
        <small className="text-gray-400 mt-1 block">
          For Google Drive images: Share the file and set access to "Anyone with the link"
        </small>
      </div>

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
              value={tag.name}
              onChange={(e) => handleTagChange(index, 'name', e.target.value)}
              className="w-full p-2 border rounded bg-tertiary"
              placeholder="Tag name"
            />
            <select
              value={tag.color}
              onChange={(e) => handleTagChange(index, 'color', e.target.value)}
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