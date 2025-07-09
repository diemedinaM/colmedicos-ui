import api from './api';

export const filesService = {
  uploadFile: async (file) => {
    try {
      if (!file) {
        throw new Error('No se proporcionó ningún archivo');
      }

      if (!(file instanceof File)) {
        throw new Error('El archivo proporcionado no es válido');
      }

      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/files/upload-file/', formData, {
        headers: {
        },
        timeout: 60000,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Progreso de subida: ${percentCompleted}%`);
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error al subir archivo:', error);
      
      if (error.response) {
        throw new Error(`Error del servidor: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        throw new Error('Error de conexión. Verifica tu conexión a internet.');
      } else {
        throw new Error(`Error de configuración: ${error.message}`);
      }
    }
  }
};