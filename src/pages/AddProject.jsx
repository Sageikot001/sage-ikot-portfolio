import AddProjectForm from '../components/AddProjectForm'
import ManageProjects from '../components/ManageProjects'
import { styles } from '../styles'

export default function AddProject() {
  return (
    <div className="relative z-0 bg-primary">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <h1 className={`${styles.heroHeadText} text-white mb-10`}>
          Add New Project
        </h1>
        <AddProjectForm />
        
        <h2 className={`${styles.sectionHeadText} text-white mt-20 mb-10`}>
          Manage Projects
        </h2>
        <ManageProjects />
      </div>
    </div>
  )
} 