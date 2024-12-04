import { useState, useEffect } from 'react'
import { projects as defaultProjects } from '../constants'
import { dbOperations } from '../utils/db'

export default function Projects() {
  const [allProjects, setAllProjects] = useState(defaultProjects)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const savedProjects = await dbOperations.getAll()
        setAllProjects([...defaultProjects, ...savedProjects])
      } catch (error) {
        console.error('Error loading projects:', error)
      }
    }
    loadProjects()
  }, [])

//   return (
//     // ... your existing JSX ...
//   )
} 