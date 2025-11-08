import { useState, useEffect, useCallback } from 'react';
import { configService } from '../services/configService';

/**
 * Custom Hook to fetch and cache upload configuration
 * 
 * Cache Strategy:
 * 1. Check sessionStorage first - if exists, use immediately (NO API call)
 * 2. Periodically check backend for version changes (every 5 minutes)
 * 3. If version changed, fetch new config
 * 4. Manual refresh available via refreshConfig()
 */
// Default config constant (outside component to avoid re-creation)
const DEFAULT_CONFIG = {
  configVersion: '1.0',
  allowedImageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  maxImageUploadSizeMb: 5.0,
  allowedVideoFormats: ['mp4', 'mpeg', 'quicktime', 'avi'],
  maxVideoUploadSizeMb: 50.0,
  allowedDocumentFormats: ['pdf', 'doc', 'docx'],
  maxDocumentUploadSizeMb: 10.0,
  maxTrainerDocuments: 10,
};

export const useUploadConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConfigFromBackend = useCallback(async () => {
    try {
      const result = await configService.getUploadConfig();
      
      if (result.success) {
        const newConfig = result.data;
        setConfig(newConfig);
        sessionStorage.setItem('uploadConfig', JSON.stringify(newConfig));
        setError(null);
        return newConfig;
      } else {
        setError(result.error);
        return null;
      }
    } catch (err) {
      console.error('Error fetching upload config:', err);
      setError(err.message);
      return null;
    }
  }, []);

  useEffect(() => {
    const initConfig = async () => {
      setLoading(true);
      
      // STEP 1: Check cache first (NO API call)
      const cachedConfig = sessionStorage.getItem('uploadConfig');
      
      if (cachedConfig) {
        try {
          const parsedCache = JSON.parse(cachedConfig);
          console.log('✅ Using cached config (version:', parsedCache.configVersion, ')');
          setConfig(parsedCache);
          setLoading(false);
          
          // STEP 2: Verify version in background (after a delay)
          // This allows UI to render immediately with cached data
          setTimeout(async () => {
            try {
              const freshConfig = await fetchConfigFromBackend();
              
              if (freshConfig && freshConfig.configVersion !== parsedCache.configVersion) {
                console.log('🔄 Config version changed:', parsedCache.configVersion, '→', freshConfig.configVersion);
                console.log('📥 Updated to fresh config');
                setConfig(freshConfig);
              }
            } catch (err) {
              console.error('Background version check failed:', err);
            }
          }, 2000); // Check after 2 seconds
          
          return;
        } catch (err) {
          console.error('Failed to parse cached config:', err);
          sessionStorage.removeItem('uploadConfig');
        }
      }
      
      // STEP 3: No cache - fetch from backend
      console.log('📥 No cache found, fetching from backend...');
      const freshConfig = await fetchConfigFromBackend();
      
      if (!freshConfig) {
        console.log('⚠️ Using default config');
        setConfig(DEFAULT_CONFIG);
      }
      
      setLoading(false);
    };

    initConfig();
  }, [fetchConfigFromBackend]);

  /**
   * Refresh config from backend
   */
  const refreshConfig = async () => {
    sessionStorage.removeItem('uploadConfig');
    setLoading(true);
    
    try {
      const result = await configService.getUploadConfig();
      
      if (result.success) {
        setConfig(result.data);
        sessionStorage.setItem('uploadConfig', JSON.stringify(result.data));
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    config,
    loading,
    error,
    refreshConfig,
  };
};

