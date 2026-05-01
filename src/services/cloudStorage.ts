// Cloud Storage Service using JSONBin.io

const JSONBIN_API_KEY = '$2a$10$D8LYVnfo1zVyKam1z.pl8.7dASUbrtGgsG0WVHyPPjA0D.LVrsHcG';

interface CloudData {
  products: any[];
  categories: any[];
  orders: any[];
  settings: any;
}

// Save data to cloud
export const saveToCloud = async (data: CloudData): Promise<boolean> => {
  try {
    let binId = localStorage.getItem('lifqora_bin_id');
    
    if (!binId) {
      // Create new bin
      const createResponse = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY,
          'X-Bin-Name': 'lifqora-store-data'
        },
        body: JSON.stringify(data)
      });
      
      if (createResponse.ok) {
        const result = await createResponse.json();
        const newBinId = result.metadata.id;
        localStorage.setItem('lifqora_bin_id', newBinId);
        console.log('Created new bin:', newBinId);
        return true;
      }
    } else {
      // Update existing bin
      const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(data)
      });
      
      if (updateResponse.ok) {
        console.log('Data saved to cloud');
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error saving to cloud:', error);
    return false;
  }
};

// Load data from cloud
export const loadFromCloud = async (): Promise<CloudData | null> => {
  try {
    const binId = localStorage.getItem('lifqora_bin_id');
    
    if (!binId) {
      console.log('No bin ID found, using local data');
      return null;
    }
    
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      method: 'GET',
      headers: {
        'X-Master-Key': JSONBIN_API_KEY
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Data loaded from cloud');
      return result.record;
    }
    
    return null;
  } catch (error) {
    console.error('Error loading from cloud:', error);
    return null;
  }
};

// Check if cloud storage is configured
export const isCloudConfigured = (): boolean => {
  return JSONBIN_API_KEY.length > 0 && JSONBIN_API_KEY.startsWith('$2a$');
};

// Get bin ID for sharing
export const getBinId = (): string | null => {
  return localStorage.getItem('lifqora_bin_id');
};

// Set bin ID (for sharing between devices)
export const setBinId = (binId: string): void => {
  localStorage.setItem('lifqora_bin_id', binId);
};
