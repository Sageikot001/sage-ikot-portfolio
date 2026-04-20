import { useState, useEffect } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { experiencesDB } from '../utils/appwrite'

const SortableExperienceCard = ({ experience, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: experience.$id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <ExperienceCard
        experience={experience}
        onEdit={onEdit}
        onDelete={onDelete}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  )
}

const ExperienceCard = ({ experience, onEdit, onDelete, dragHandleProps }) => {
  const { title, companyName, company_name, date, points, icon, iconBg } = experience
  const displayCompany = companyName || company_name

  return (
    <div className="bg-tertiary p-5 rounded-2xl relative group">
      <div className="flex items-start gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBg || '#E6DEDD' }}
        >
          {icon ? (
            <img src={icon} alt={displayCompany} className="w-10 h-10 object-contain" />
          ) : (
            <span className="text-2xl font-bold text-gray-600">
              {displayCompany?.charAt(0) || '?'}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-white font-bold text-[20px]">{title}</h3>
          <p className="text-secondary text-[16px]">{displayCompany}</p>
          <p className="text-secondary text-[14px]">{date}</p>

          <ul className="mt-3 space-y-1">
            {points?.map((point, idx) => (
              <li key={idx} className="text-white-100 text-[14px] flex items-start gap-2">
                <span className="text-secondary">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          {...dragHandleProps}
          className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-colors cursor-grab active:cursor-grabbing"
          title="Drag to reorder"
        >
          ⋮⋮
        </button>
        <button
          onClick={() => onEdit(experience)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(experience.$id)}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default function ManageExperiences() {
  const [experiences, setExperiences] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingExperience, setEditingExperience] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  useEffect(() => {
    loadExperiences()

    const handleUpdate = () => loadExperiences()
    window.addEventListener('experiencesUpdated', handleUpdate)
    return () => window.removeEventListener('experiencesUpdated', handleUpdate)
  }, [])

  const loadExperiences = async () => {
    try {
      const data = await experiencesDB.getAll()
      setExperiences(data)
    } catch (error) {
      console.error('Error loading experiences:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (experienceId) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await experiencesDB.delete(experienceId)
        loadExperiences()
      } catch (error) {
        console.error('Error deleting experience:', error)
        alert('Failed to delete experience')
      }
    }
  }

  const handleEdit = (experience) => {
    setEditingExperience({
      ...experience,
      companyName: experience.companyName || experience.company_name,
      points: experience.points || []
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await experiencesDB.update(editingExperience.$id, editingExperience)
      setEditingExperience(null)
      loadExperiences()
      alert('Experience updated successfully!')
    } catch (error) {
      console.error('Error updating experience:', error)
      alert('Failed to update experience')
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = experiences.findIndex(e => e.$id === active.id)
      const newIndex = experiences.findIndex(e => e.$id === over.id)
      const newOrder = arrayMove(experiences, oldIndex, newIndex)
      setExperiences(newOrder)
      try {
        await experiencesDB.updatePositions(newOrder)
      } catch (error) {
        console.error('Error saving order:', error)
        loadExperiences()
      }
    }
  }

  const handleAddPoint = () => {
    setEditingExperience({
      ...editingExperience,
      points: [...editingExperience.points, '']
    })
  }

  const handlePointChange = (index, value) => {
    const newPoints = [...editingExperience.points]
    newPoints[index] = value
    setEditingExperience({ ...editingExperience, points: newPoints })
  }

  const handleRemovePoint = (index) => {
    const newPoints = editingExperience.points.filter((_, i) => i !== index)
    setEditingExperience({ ...editingExperience, points: newPoints })
  }

  if (isLoading) return <div className="text-white">Loading...</div>

  return (
    <div>
      {editingExperience ? (
        <form onSubmit={handleUpdate} className="space-y-4 text-white mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Job Title *</label>
              <input
                type="text"
                value={editingExperience.title}
                onChange={(e) => setEditingExperience({ ...editingExperience, title: e.target.value })}
                className="w-full p-2 border rounded bg-tertiary"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Company Name *</label>
              <input
                type="text"
                value={editingExperience.companyName}
                onChange={(e) => setEditingExperience({ ...editingExperience, companyName: e.target.value })}
                className="w-full p-2 border rounded bg-tertiary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Date Range *</label>
              <input
                type="text"
                value={editingExperience.date}
                onChange={(e) => setEditingExperience({ ...editingExperience, date: e.target.value })}
                className="w-full p-2 border rounded bg-tertiary"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Icon Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={editingExperience.iconBg || '#E6DEDD'}
                  onChange={(e) => setEditingExperience({ ...editingExperience, iconBg: e.target.value })}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={editingExperience.iconBg || '#E6DEDD'}
                  onChange={(e) => setEditingExperience({ ...editingExperience, iconBg: e.target.value })}
                  className="flex-1 p-2 border rounded bg-tertiary"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2">Company Logo/Icon</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  setEditingExperience({ ...editingExperience, icon: file })
                }
              }}
              className="w-full p-2 border rounded bg-tertiary"
            />
            {editingExperience.icon && (
              <div className="mt-2 w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={editingExperience.icon instanceof File
                    ? URL.createObjectURL(editingExperience.icon)
                    : editingExperience.icon
                  }
                  alt="Preview"
                  className="w-12 h-12 object-contain"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2">Key Points / Responsibilities</label>
            {editingExperience.points.map((point, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded bg-tertiary"
                />
                {editingExperience.points.length > 1 && (
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

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditingExperience(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={experiences.map(e => e.$id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {experiences.length === 0 ? (
                <p className="text-secondary">No experiences added yet.</p>
              ) : (
                experiences.map((experience) => (
                  <SortableExperienceCard
                    key={experience.$id}
                    experience={experience}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
