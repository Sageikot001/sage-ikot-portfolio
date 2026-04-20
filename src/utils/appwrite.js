import { Client, Databases, Storage, ID, Query } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const EXPERIENCES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_EXPERIENCES_COLLECTION_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export const projectsDB = {
  async add(project) {
    try {
      let imageUrl = '';
      if (project.image instanceof File) {
        const fileUpload = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          project.image
        );
        imageUrl = storage.getFileView(BUCKET_ID, fileUpload.$id);
      }

      // Format project data with simple string tags
      const formattedProject = {
        ...project,
        image: imageUrl || project.image,
        // Store tags as simple strings
        tags: Array.isArray(project.tags) 
          ? project.tags.map(tag => String(tag).trim()).filter(tag => tag !== '')
          : []
      };

      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        formattedProject
      );
      
      window.dispatchEvent(new CustomEvent('projectsUpdated'));
      return response;
    } catch (error) {
      console.error('Error adding project:', error);
      throw error;
    }
  },

  async getAll() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderAsc('position')]
      );

      return response.documents.map(doc => {
        let imageUrl = doc.image;
        
        // Handle image from Appwrite storage
        if (imageUrl && !imageUrl.startsWith('http')) {
          try {
            // Get direct view URL from Appwrite storage
            imageUrl = storage.getFileView(BUCKET_ID, imageUrl);
          } catch (error) {
            console.warn('Error processing image:', error);
          }
        }
        
        return {
          ...doc,
          image: imageUrl,
          // Ensure tags are in the correct format for display
          tags: doc.tags.map(tag => tag), // Keep tags as simple strings
          index: doc.$id // Add index for animation purposes
        };
      });
    } catch (error) {
      console.error('Error getting projects:', error);
      return [];
    }
  },

  async delete(projectId) {
    try {
      // Get project to delete associated image
      const project = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        projectId
      );

      // Delete image from storage if exists
      if (project.image) {
        const fileId = project.image.split('/').pop();
        await storage.deleteFile(BUCKET_ID, fileId);
      }

      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        projectId
      );
      
      window.dispatchEvent(new CustomEvent('projectsUpdated'));
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  async update(projectId, updatedProject) {
    try {
      if (!projectId) {
        throw new Error('Project ID is required for update');
      }

      const { $id, $createdAt, $updatedAt, $permissions, id, ...cleanProject } = updatedProject;

      // Handle image update if new image is provided
      let imageUrl = cleanProject.image;
      if (cleanProject.image instanceof File) {
        try {
          // Delete old image if exists
          const oldProject = await databases.getDocument(DATABASE_ID, COLLECTION_ID, projectId);
          if (oldProject.image) {
            try {
              await storage.deleteFile(BUCKET_ID, oldProject.image);
            } catch (e) {
              console.warn('Failed to delete old image:', e);
            }
          }

          // Upload new image
          const fileUpload = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            cleanProject.image
          );
          imageUrl = fileUpload.$id;
        } catch (e) {
          console.error('Error handling image:', e);
          throw e;
        }
      }

      // Store only tag names as strings
      const formattedTags = cleanProject.tags.map(tag => 
        typeof tag === 'object' ? tag.name : tag
      );

      // Prepare the update data
      const formattedProject = {
        name: cleanProject.name,
        description: cleanProject.description,
        image: imageUrl,
        source_code_link: cleanProject.source_code_link,
        live_demo_link: cleanProject.live_demo_link,
        tags: formattedTags // Now just an array of strings
      };

      const response = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        projectId,
        formattedProject
      );
      
      window.dispatchEvent(new CustomEvent('projectsUpdated'));
      return response;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async updatePositions(projects) {
    try {
      const updates = projects.map((project, index) =>
        databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          project.$id,
          { position: index }
        )
      );
      await Promise.all(updates);
      window.dispatchEvent(new CustomEvent('projectsUpdated'));
      return true;
    } catch (error) {
      console.error('Error updating positions:', error);
      throw error;
    }
  }
};

export const experiencesDB = {
  async add(experience) {
    try {
      let iconUrl = '';
      if (experience.icon instanceof File) {
        const fileUpload = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          experience.icon
        );
        iconUrl = storage.getFileView(BUCKET_ID, fileUpload.$id);
      }

      const formattedExperience = {
        title: experience.title,
        companyName: experience.companyName,
        icon: iconUrl || experience.icon || '',
        iconBg: experience.iconBg || '#E6DEDD',
        date: experience.date,
        points: Array.isArray(experience.points)
          ? experience.points.filter(p => p.trim() !== '')
          : [],
        position: experience.position || 0
      };

      const response = await databases.createDocument(
        DATABASE_ID,
        EXPERIENCES_COLLECTION_ID,
        ID.unique(),
        formattedExperience
      );

      window.dispatchEvent(new CustomEvent('experiencesUpdated'));
      return response;
    } catch (error) {
      console.error('Error adding experience:', error);
      throw error;
    }
  },

  async getAll() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        EXPERIENCES_COLLECTION_ID,
        [Query.orderAsc('position')]
      );

      return response.documents.map(doc => {
        let iconUrl = doc.icon;

        if (iconUrl && !iconUrl.startsWith('http')) {
          try {
            iconUrl = storage.getFileView(BUCKET_ID, iconUrl);
          } catch (error) {
            console.warn('Error processing icon:', error);
          }
        }

        return {
          ...doc,
          icon: iconUrl,
          company_name: doc.companyName
        };
      });
    } catch (error) {
      console.error('Error getting experiences:', error);
      return [];
    }
  },

  async delete(experienceId) {
    try {
      const experience = await databases.getDocument(
        DATABASE_ID,
        EXPERIENCES_COLLECTION_ID,
        experienceId
      );

      if (experience.icon && experience.icon.includes(BUCKET_ID)) {
        try {
          const fileId = experience.icon.split('/').pop();
          await storage.deleteFile(BUCKET_ID, fileId);
        } catch (e) {
          console.warn('Failed to delete icon:', e);
        }
      }

      await databases.deleteDocument(
        DATABASE_ID,
        EXPERIENCES_COLLECTION_ID,
        experienceId
      );

      window.dispatchEvent(new CustomEvent('experiencesUpdated'));
      return true;
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  },

  async update(experienceId, updatedExperience) {
    try {
      if (!experienceId) {
        throw new Error('Experience ID is required for update');
      }

      const { $id, $createdAt, $updatedAt, $permissions, $databaseId, $collectionId, ...cleanExperience } = updatedExperience;

      let iconUrl = cleanExperience.icon;
      if (cleanExperience.icon instanceof File) {
        const fileUpload = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          cleanExperience.icon
        );
        iconUrl = storage.getFileView(BUCKET_ID, fileUpload.$id);
      }

      const formattedExperience = {
        title: cleanExperience.title,
        companyName: cleanExperience.companyName || cleanExperience.company_name,
        icon: iconUrl || '',
        iconBg: cleanExperience.iconBg || '#E6DEDD',
        date: cleanExperience.date,
        points: Array.isArray(cleanExperience.points)
          ? cleanExperience.points.filter(p => p.trim() !== '')
          : []
      };

      const response = await databases.updateDocument(
        DATABASE_ID,
        EXPERIENCES_COLLECTION_ID,
        experienceId,
        formattedExperience
      );

      window.dispatchEvent(new CustomEvent('experiencesUpdated'));
      return response;
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  },

  async updatePositions(experiences) {
    try {
      const updates = experiences.map((exp, index) =>
        databases.updateDocument(
          DATABASE_ID,
          EXPERIENCES_COLLECTION_ID,
          exp.$id,
          { position: index }
        )
      );
      await Promise.all(updates);
      window.dispatchEvent(new CustomEvent('experiencesUpdated'));
      return true;
    } catch (error) {
      console.error('Error updating positions:', error);
      throw error;
    }
  }
};

export { client, databases, storage, ID }; 