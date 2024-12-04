export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('portfolioDB', 1)

    request.onerror = () => {
      console.error('Database error:', request.error)
      reject(request.error)
    }

    request.onsuccess = () => {
      console.log('Database opened successfully')
      resolve(request.result)
    }

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains('projects')) {
        db.createObjectStore('projects', { keyPath: 'id', autoIncrement: true })
        console.log('Projects store created')
      }
    }
  })
}

export const dbOperations = {
  async add(project) {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction('projects', 'readwrite')
      const store = tx.objectStore('projects')
      const request = store.add(project)
      
      request.onsuccess = () => {
        console.log('Project added successfully:', request.result)
        window.dispatchEvent(new CustomEvent('projectsUpdated'))
        resolve(request.result)
      }
      request.onerror = () => reject(request.error)
      
      tx.oncomplete = () => {
        db.close()
      }
    })
  },

  async getAll() {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction('projects', 'readonly')
      const store = tx.objectStore('projects')
      const request = store.getAll()
      
      request.onsuccess = () => {
        console.log('Retrieved projects:', request.result)
        resolve(request.result)
      }
      request.onerror = () => reject(request.error)
      
      tx.oncomplete = () => {
        db.close()
      }
    })
  },

  async delete(projectId) {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction('projects', 'readwrite')
      const store = tx.objectStore('projects')
      const request = store.delete(projectId)
      
      request.onsuccess = () => {
        console.log('Project deleted successfully')
        window.dispatchEvent(new CustomEvent('projectsUpdated'))
        resolve(true)
      }
      
      request.onerror = () => reject(request.error)
      
      tx.oncomplete = () => {
        db.close()
      }
    })
  },

  async update(projectId, updatedProject) {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction('projects', 'readwrite')
      const store = tx.objectStore('projects')
      const request = store.put({ ...updatedProject, id: projectId })
      
      request.onsuccess = () => {
        console.log('Project updated successfully')
        window.dispatchEvent(new CustomEvent('projectsUpdated'))
        resolve(true)
      }
      
      request.onerror = () => reject(request.error)
      
      tx.oncomplete = () => {
        db.close()
      }
    })
  }
} 

export async function addProject(project) {
  const db = await initDB()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['projects'], 'readwrite')
    const store = transaction.objectStore('projects')
    const request = store.add(project)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
} 