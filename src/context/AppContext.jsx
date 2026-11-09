import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StorageKeys,
  getFromStorage,
  saveToStorage,
  clearAllCampusData
} from '../utils/storage';
import {
  INITIAL_USER_PROFILE,
  INITIAL_EVENTS,
  INITIAL_STUDENTS,
  INITIAL_OPPORTUNITIES,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_COLLAB_REQUESTS
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState(() =>
    getFromStorage(StorageKeys.USER_PROFILE, INITIAL_USER_PROFILE)
  );

  // 2. Events & Registrations
  const [events, setEvents] = useState(() =>
    getFromStorage(StorageKeys.EVENTS, INITIAL_EVENTS)
  );
  const [registeredEventIds, setRegisteredEventIds] = useState(() =>
    getFromStorage(StorageKeys.REGISTERED_EVENTS, ["evt-1"])
  );
  const [savedEventIds, setSavedEventIds] = useState(() =>
    getFromStorage(StorageKeys.SAVED_EVENTS, ["evt-2", "evt-5"])
  );

  // 3. Students & Collaboration Requests
  const [students, setStudents] = useState(() =>
    getFromStorage(StorageKeys.STUDENTS, INITIAL_STUDENTS)
  );
  const [savedStudentIds, setSavedStudentIds] = useState(() =>
    getFromStorage(StorageKeys.SAVED_STUDENTS, ["std-1", "std-3"])
  );
  const [collabRequests, setCollabRequests] = useState(() =>
    getFromStorage(StorageKeys.COLLAB_REQUESTS, INITIAL_COLLAB_REQUESTS)
  );

  // 4. Opportunities & Applications
  const [opportunities, setOpportunities] = useState(() =>
    getFromStorage(StorageKeys.OPPORTUNITIES, INITIAL_OPPORTUNITIES)
  );
  const [savedOpportunityIds, setSavedOpportunityIds] = useState(() =>
    getFromStorage(StorageKeys.SAVED_OPPORTUNITIES, ["opp-1", "opp-3"])
  );
  const [appliedOpportunityIds, setAppliedOpportunityIds] = useState(() =>
    getFromStorage(StorageKeys.APPLIED_OPPORTUNITIES, ["opp-2"])
  );

  // 5. Community Feed
  const [communityPosts, setCommunityPosts] = useState(() =>
    getFromStorage(StorageKeys.COMMUNITY_POSTS, INITIAL_COMMUNITY_POSTS)
  );

  // 6. Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const hideToast = () => setToast(null);

  // Sync state changes to localStorage
  useEffect(() => {
    saveToStorage(StorageKeys.USER_PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    saveToStorage(StorageKeys.EVENTS, events);
  }, [events]);

  useEffect(() => {
    saveToStorage(StorageKeys.REGISTERED_EVENTS, registeredEventIds);
  }, [registeredEventIds]);

  useEffect(() => {
    saveToStorage(StorageKeys.SAVED_EVENTS, savedEventIds);
  }, [savedEventIds]);

  useEffect(() => {
    saveToStorage(StorageKeys.STUDENTS, students);
  }, [students]);

  useEffect(() => {
    saveToStorage(StorageKeys.SAVED_STUDENTS, savedStudentIds);
  }, [savedStudentIds]);

  useEffect(() => {
    saveToStorage(StorageKeys.COLLAB_REQUESTS, collabRequests);
  }, [collabRequests]);

  useEffect(() => {
    saveToStorage(StorageKeys.OPPORTUNITIES, opportunities);
  }, [opportunities]);

  useEffect(() => {
    saveToStorage(StorageKeys.SAVED_OPPORTUNITIES, savedOpportunityIds);
  }, [savedOpportunityIds]);

  useEffect(() => {
    saveToStorage(StorageKeys.APPLIED_OPPORTUNITIES, appliedOpportunityIds);
  }, [appliedOpportunityIds]);

  useEffect(() => {
    saveToStorage(StorageKeys.COMMUNITY_POSTS, communityPosts);
  }, [communityPosts]);

  // Actions: Profile
  const updateProfile = (updatedFields) => {
    setProfile(prev => ({ ...prev, ...updatedFields }));
    showToast("Profile updated successfully!");
  };

  // Actions: Events
  const registerForEvent = (eventId) => {
    if (registeredEventIds.includes(eventId)) {
      showToast("You are already registered for this event.", "info");
      return;
    }
    setRegisteredEventIds(prev => [...prev, eventId]);
    // decrease seats
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId && evt.seatsAvailable > 0) {
        return { ...evt, seatsAvailable: evt.seatsAvailable - 1 };
      }
      return evt;
    }));
    showToast("Registration confirmed! Event added to your dashboard.");
  };

  const cancelEventRegistration = (eventId) => {
    setRegisteredEventIds(prev => prev.filter(id => id !== eventId));
    // increase seats
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, seatsAvailable: evt.seatsAvailable + 1 };
      }
      return evt;
    }));
    showToast("Registration cancelled.", "info");
  };

  const toggleSaveEvent = (eventId) => {
    if (savedEventIds.includes(eventId)) {
      setSavedEventIds(prev => prev.filter(id => id !== eventId));
      showToast("Event removed from saved items.", "info");
    } else {
      setSavedEventIds(prev => [...prev, eventId]);
      showToast("Event saved to your bookmarks.");
    }
  };

  // Actions: Opportunities
  const toggleSaveOpportunity = (oppId) => {
    if (savedOpportunityIds.includes(oppId)) {
      setSavedOpportunityIds(prev => prev.filter(id => id !== oppId));
      showToast("Opportunity removed from bookmarks.", "info");
    } else {
      setSavedOpportunityIds(prev => [...prev, oppId]);
      showToast("Opportunity saved for later.");
    }
  };

  const markOpportunityApplied = (oppId) => {
    if (!appliedOpportunityIds.includes(oppId)) {
      setAppliedOpportunityIds(prev => [...prev, oppId]);
      showToast("Marked as Applied! Application tracked in your records.");
    }
  };

  // Actions: Students & Collaboration Requests
  const toggleSaveStudent = (studentId) => {
    if (savedStudentIds.includes(studentId)) {
      setSavedStudentIds(prev => prev.filter(id => id !== studentId));
      showToast("Student profile removed from saved list.", "info");
    } else {
      setSavedStudentIds(prev => [...prev, studentId]);
      showToast("Student saved to your network.");
    }
  };

  const sendCollabRequest = (studentId, projectTitle, message) => {
    // Check if duplicate pending
    const existing = collabRequests.find(
      r => r.toStudentId === studentId && r.fromStudentId === profile.id && r.status === 'pending'
    );
    if (existing) {
      showToast("You already have an active request with this student.", "info");
      return false;
    }

    const newRequest = {
      id: `req-${Date.now()}`,
      fromStudentId: profile.id,
      toStudentId: studentId,
      type: "outgoing",
      status: "pending",
      projectTitle: projectTitle || "Collaboration Invite",
      message: message || "Let's team up on upcoming hackathons and projects!",
      timestamp: new Date().toISOString()
    };

    setCollabRequests(prev => [newRequest, ...prev]);
    showToast("Collaboration request sent successfully!");
    return true;
  };

  const updateCollabRequestStatus = (requestId, newStatus) => {
    setCollabRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status: newStatus };
      }
      return req;
    }));
    if (newStatus === 'accepted') {
      showToast("Collaboration request accepted! You are now teammates.");
    } else if (newStatus === 'rejected') {
      showToast("Collaboration request declined.", "info");
    } else if (newStatus === 'withdrawn') {
      showToast("Collaboration request withdrawn.", "info");
    }
  };

  // Actions: Community Feed
  const createCommunityPost = ({ content, category }) => {
    if (!content.trim()) return false;
    const newPost = {
      id: `post-${Date.now()}`,
      authorId: profile.id,
      authorName: profile.name,
      authorAvatar: profile.avatar,
      authorDept: profile.department,
      category: category || "General",
      createdAt: "Just now",
      content: content.trim(),
      likes: 0,
      isLiked: false,
      comments: []
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    showToast("Post shared with campus community!");
    return true;
  };

  const togglePostLike = (postId) => {
    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : Math.max(post.likes - 1, 0)
        };
      }
      return post;
    }));
  };

  const addPostComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: profile.name,
      authorAvatar: profile.avatar,
      content: commentText.trim(),
      createdAt: "Just now"
    };

    setCommunityPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));
    showToast("Comment added!");
  };

  const deleteCommunityPost = (postId) => {
    setCommunityPosts(prev => prev.filter(post => post.id !== postId));
    showToast("Post deleted.", "info");
  };

  // Reset Demo Data
  const resetAllDemoData = () => {
    clearAllCampusData();
    setProfile(INITIAL_USER_PROFILE);
    setEvents(INITIAL_EVENTS);
    setRegisteredEventIds(["evt-1"]);
    setSavedEventIds(["evt-2", "evt-5"]);
    setStudents(INITIAL_STUDENTS);
    setSavedStudentIds(["std-1", "std-3"]);
    setCollabRequests(INITIAL_COLLAB_REQUESTS);
    setOpportunities(INITIAL_OPPORTUNITIES);
    setSavedOpportunityIds(["opp-1", "opp-3"]);
    setAppliedOpportunityIds(["opp-2"]);
    setCommunityPosts(INITIAL_COMMUNITY_POSTS);
    showToast("All sample campus data restored to default!");
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        events,
        registeredEventIds,
        savedEventIds,
        registerForEvent,
        cancelEventRegistration,
        toggleSaveEvent,
        students,
        savedStudentIds,
        toggleSaveStudent,
        collabRequests,
        sendCollabRequest,
        updateCollabRequestStatus,
        opportunities,
        savedOpportunityIds,
        appliedOpportunityIds,
        toggleSaveOpportunity,
        markOpportunityApplied,
        communityPosts,
        createCommunityPost,
        togglePostLike,
        addPostComment,
        deleteCommunityPost,
        resetAllDemoData,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

