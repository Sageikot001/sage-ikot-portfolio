import { useState } from 'react'
import AddProjectForm from '../components/AddProjectForm'
import ManageProjects from '../components/ManageProjects'
import AddExperienceForm from '../components/AddExperienceForm'
import ManageExperiences from '../components/ManageExperiences'
import AdminAuth from '../components/AdminAuth'
import { styles } from '../styles'

export default function AddProject() {
  const [activeTab, setActiveTab] = useState('projects')

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    window.location.reload()
  }

  return (
    <AdminAuth>
      <div className="relative z-0 bg-primary min-h-screen">
        <div className={`${styles.padding} max-w-7xl mx-auto`}>
          <div className="flex justify-between items-center mb-10">
            <h1 className={`${styles.heroHeadText} text-white`}>
              Admin Panel
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex gap-4 mb-10">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                activeTab === 'projects'
                  ? 'bg-tertiary text-white'
                  : 'bg-black-100 text-secondary hover:text-white'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                activeTab === 'experience'
                  ? 'bg-tertiary text-white'
                  : 'bg-black-100 text-secondary hover:text-white'
              }`}
            >
              Experience
            </button>
          </div>

          {activeTab === 'projects' && (
            <>
              <h2 className={`${styles.sectionHeadText} text-white mb-6`}>
                Add New Project
              </h2>
              <AddProjectForm />

              <h2 className={`${styles.sectionHeadText} text-white mt-20 mb-10`}>
                Manage Projects
              </h2>
              <ManageProjects />
            </>
          )}

          {activeTab === 'experience' && (
            <>
              <h2 className={`${styles.sectionHeadText} text-white mb-6`}>
                Add New Experience
              </h2>
              <AddExperienceForm />

              <h2 className={`${styles.sectionHeadText} text-white mt-20 mb-10`}>
                Manage Experiences
              </h2>
              <ManageExperiences />
            </>
          )}
        </div>
      </div>
    </AdminAuth>
  )
} 