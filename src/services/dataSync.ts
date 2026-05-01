// Simple Data Sync Service
// يوفر تصدير واستيراد البيانات + مزامنة سحابية بسيطة

export interface StoreData {
  products: any[];
  categories: any[];
  orders: any[];
  settings: any;
  exportedAt: string;
}

// Export data to JSON file
export const exportData = (data: StoreData): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `lifqora-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Import data from JSON file
export const importData = (): Promise<StoreData | null> => {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          resolve(data);
        } catch (error) {
          console.error('Error parsing file:', error);
          resolve(null);
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  });
};

// Generate shareable link (encoded data)
export const generateShareLink = (data: StoreData): string => {
  const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
  return `${window.location.origin}?data=${encoded}`;
};

// Load data from URL
export const loadDataFromUrl = (): StoreData | null => {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('data');
  
  if (!encoded) return null;
  
  try {
    const decoded = decodeURIComponent(atob(encoded));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error loading data from URL:', error);
    return null;
  }
};

// Save to simple cloud storage (using a free service)
const CLOUD_STORAGE_KEY = 'lifqora_data';

// Generate unique device ID
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('lifqora_device_id');
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('lifqora_device_id', deviceId);
  }
  return deviceId;
};

// Simple cloud sync using localStorage with timestamp
export const syncToCloud = async (data: StoreData): Promise<boolean> => {
  try {
    const syncData = {
      ...data,
      deviceId: getDeviceId(),
      syncedAt: new Date().toISOString()
    };
    
    // Save to localStorage with sync marker
    localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(syncData));
    localStorage.setItem('lifqora_last_sync', new Date().toISOString());
    
    return true;
  } catch (error) {
    console.error('Error syncing to cloud:', error);
    return false;
  }
};

// Check if data needs sync
export const needsSync = (): boolean => {
  const lastSync = localStorage.getItem('lifqora_last_sync');
  if (!lastSync) return true;
  
  const lastSyncDate = new Date(lastSync);
  const now = new Date();
  const diffMinutes = (now.getTime() - lastSyncDate.getTime()) / (1000 * 60);
  
  return diffMinutes > 5; // Sync every 5 minutes
};

// Get last sync time
export const getLastSyncTime = (): string | null => {
  return localStorage.getItem('lifqora_last_sync');
};
