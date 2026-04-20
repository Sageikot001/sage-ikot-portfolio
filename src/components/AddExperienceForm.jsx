import { useState } from 'react'
import { experiencesDB } from '../utils/appwrite'

export default function AddExperienceForm() {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    icon: null,
    iconBg: '#E6DEDD',
    date: '',
    points: ['']
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddPoint = () => {
    setFormData({
      ...formData,
      points: [...formData.points, '']
    })
  }

  const handlePointChange = (index, value) => {
    const newPoints = [...formData.points]
    newPoints[index] = value
    setFormData({ ...formData, points: newPoints })
  }

  const handleRemovePoint = (index) => {
    const newPoints = formData.points.filter((_, i) => i !== index)
    setFormData({ ...formData, points: newPoints })
  }

  const handleIconChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, icon: file }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await experiencesDB.add(formData)
      setFormData({
        title: '',
        companyName: '',
        icon: null,
        iconBg: '#E6DEDD',
        date: '',
        points: ['']
      })
      alert('Experience added successfully!')
    } catch (error) {
      console.error('Error adding experience:', error)
      alert('Failed to add experience. Error: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Job Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded bg-tertiary"
            placeholder="e.g. React Developer"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Company Name *</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full p-2 border rounded bg-tertiary"
            placeholder="e.g. Acme Corp"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Date Range *</label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded bg-tertiary"
            placeholder="e.g. Jan 2022 - Present"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Icon Background Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={formData.iconBg}
              onChange={(e) => setFormData({ ...formData, iconBg: e.target.value })}
              className="w-12 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={formData.iconBg}
              onChange={(e) => setFormData({ ...formData, iconBg: e.target.value })}
              className="flex-1 p-2 border rounded bg-tertiary"
              placeholder="#E6DEDD"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block mb-2">Company Logo/Icon</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleIconChange}
          className="w-full p-2 border rounded bg-tertiary"
        />
        {formData.icon && (
          <div className="mt-2 w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <img
              src={URL.createObjectURL(formData.icon)}
              alt="Preview"
              className="w-12 h-12 object-contain"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block mb-2">Key Points / Responsibilities *</label>
        {formData.points.map((point, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={point}
              onChange={(e) => handlePointChange(index, e.target.value)}
              className="flex-1 p-2 border rounded bg-tertiary"
              placeholder="Describe a responsibility or achievement..."
            />
            {formData.points.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemovePoint(index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPoint}
          className="text-blue-500 hover:text-blue-600"
        >
          + Add Point
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
        {isSubmitting ? 'Adding Experience...' : 'Add Experience'}
      </button>
    </form>
  )
}
