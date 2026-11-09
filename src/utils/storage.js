// LocalStorage helper utilities with safe parsing and fallbacks

export const StorageKeys = {
  USER_PROFILE: 'campusconnect_user_profile',
  EVENTS: 'campusconnect_events',
  REGISTERED_EVENTS: 'campusconnect_registered_events',
  SAVED_EVENTS: 'campusconnect_saved_events',
  SAVED_OPPORTUNITIES: 'campusconnect_saved_opps',
  APPLIED_OPPORTUNITIES: 'campusconnect_applied_opps',
  SAVED_STUDENTS: 'campusconnect_saved_students',
  COLLAB_REQUESTS: 'campusconnect_collab_requests',
  COMMUNITY_POSTS: 'campusconnect_community_posts',
  OPPORTUNITIES: 'campusconnect_opportunities',
  STUDENTS: 'campusconnect_students'
};

export const getFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error removing ${key} from localStorage:`, err);
  }
};

export const clearAllCampusData = () => {
  Object.values(StorageKeys).forEach((key) => {
    localStorage.removeItem(key);
  });
};

