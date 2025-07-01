import { useState } from 'react';
import Plugin from '@/types/Plugin';

export const useManagePlugins = () => {

  const [isInstalling, setIsInstalling] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const installPlugin = async (plugin: Plugin): Promise<void> => {
    setIsInstalling(true);
  
    try {
      if (!window.wp?.updates?.ajax) {
        throw new Error('WordPress updates API not available');
      }

      return new Promise((resolve, reject) => {
        window.wp.updates.ajax('install-plugin', {
          slug: plugin.slug,
          success: (response) => {
            console.log('Plugin installed successfully:', response.pluginName);
            setIsInstalling(false);
            resolve();
          },
          error: (error) => {
            console.error('Failed to install plugin:', error.errorMessage);
            setIsInstalling(false);
            reject(error);
          }
        });
      });

    } catch (error) {
      console.error(error);
      setIsInstalling(false);
      throw error;
    }
  };

  return {
    installPlugin,
    isInstalling,
  };
};
