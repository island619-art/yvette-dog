import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ActiveTab, 
  Dog, 
  Vaccination, 
  HospitalVisit, 
  WeightRecord, 
  Medication, 
  Place, 
  Post, 
  ExpertArticle, 
  Product, 
  EventItem, 
  User 
} from '../types';
import {
  INITIAL_USER,
  INITIAL_DOGS,
  INITIAL_VACCINATIONS,
  INITIAL_HOSPITAL_VISITS,
  INITIAL_WEIGHT_RECORDS,
  INITIAL_MEDICATIONS,
  INITIAL_PLACES,
  INITIAL_POSTS,
  INITIAL_EXPERT_ARTICLES,
  INITIAL_PRODUCTS,
  INITIAL_EVENTS,
} from '../data/initialData';

interface AppContextType {
  // Navigation & UI State
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedPlaceCategory: string | null;
  setSelectedPlaceCategory: (cat: string | null) => void;
  selectedPostCategory: string | null;
  setSelectedPostCategory: (cat: string | null) => void;
  selectedExpertCategory: string | null;
  setSelectedExpertCategory: (cat: string | null) => void;
  
  // Search & Modals
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'reset';
  setAuthMode: (mode: 'login' | 'signup' | 'reset') => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  
  // User state
  user: User;
  isLoggedIn: boolean;
  login: (email: string, nickname?: string) => void;
  logout: () => void;
  performAttendanceCheck: () => { success: boolean; message: string; points: number };
  toggleAdminMode: () => void;
  
  // Dog management
  dogs: Dog[];
  selectedDogId: string;
  setSelectedDogId: (id: string) => void;
  currentDog: Dog | undefined;
  addDog: (dog: Omit<Dog, 'id'>) => Dog;
  updateDog: (id: string, dog: Partial<Dog>) => void;
  deleteDog: (id: string) => void;
  
  // Health records
  vaccinations: Vaccination[];
  addVaccination: (vac: Omit<Vaccination, 'id'>) => void;
  deleteVaccination: (id: string) => void;
  toggleVaccinationCompleted: (id: string) => void;

  hospitalVisits: HospitalVisit[];
  addHospitalVisit: (visit: Omit<HospitalVisit, 'id'>) => void;
  deleteHospitalVisit: (id: string) => void;

  weightRecords: WeightRecord[];
  addWeightRecord: (record: Omit<WeightRecord, 'id'>) => void;
  deleteWeightRecord: (id: string) => void;

  medications: Medication[];
  addMedication: (med: Omit<Medication, 'id'>) => void;
  deleteMedication: (id: string) => void;
  toggleMedicationTaken: (id: string) => void;

  // Places
  places: Place[];
  toggleBookmarkPlace: (id: string) => void;
  addPlace: (place: Omit<Place, 'id' | 'rating' | 'reviewCount'>) => void;

  // Posts & Community
  posts: Post[];
  addPost: (post: { category: Post['category']; title: string; content: string; image?: string; tags?: string[] }) => void;
  toggleLikePost: (id: string) => void;
  addComment: (postId: string, content: string) => void;
  deletePost: (id: string) => void;

  // Expert Articles
  expertArticles: ExpertArticle[];
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  addExpertArticle: (art: Omit<ExpertArticle, 'id' | 'createdAt'>) => void;

  // Products & Shopping
  products: Product[];
  toggleSaveProduct: (id: string) => void;
  cartCount: number;
  addToCart: (productId: string) => void;

  // Events
  events: EventItem[];
  addEvent: (ev: Omit<EventItem, 'id'>) => void;

  // Reset / Backup Data
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string | null>(null);
  const [selectedPostCategory, setSelectedPostCategory] = useState<string | null>(null);
  const [selectedExpertCategory, setSelectedExpertCategory] = useState<string | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // User
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('dangdang_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('dangdang_auth');
    return saved ? JSON.parse(saved) : true; // Default logged in as demo user for best UX
  });

  // Dogs
  const [dogs, setDogs] = useState<Dog[]>(() => {
    const saved = localStorage.getItem('dangdang_dogs');
    return saved ? JSON.parse(saved) : INITIAL_DOGS;
  });
  const [selectedDogId, setSelectedDogId] = useState<string>(() => {
    const saved = localStorage.getItem('dangdang_selected_dog');
    return saved || 'dog-01';
  });

  // Health
  const [vaccinations, setVaccinations] = useState<Vaccination[]>(() => {
    const saved = localStorage.getItem('dangdang_vaccinations');
    return saved ? JSON.parse(saved) : INITIAL_VACCINATIONS;
  });
  const [hospitalVisits, setHospitalVisits] = useState<HospitalVisit[]>(() => {
    const saved = localStorage.getItem('dangdang_hospital_visits');
    return saved ? JSON.parse(saved) : INITIAL_HOSPITAL_VISITS;
  });
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>(() => {
    const saved = localStorage.getItem('dangdang_weight_records');
    return saved ? JSON.parse(saved) : INITIAL_WEIGHT_RECORDS;
  });
  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('dangdang_medications');
    return saved ? JSON.parse(saved) : INITIAL_MEDICATIONS;
  });

  // Places
  const [places, setPlaces] = useState<Place[]>(() => {
    const saved = localStorage.getItem('dangdang_places');
    return saved ? JSON.parse(saved) : INITIAL_PLACES;
  });

  // Community
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('dangdang_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  // Expert
  const [expertArticles, setExpertArticles] = useState<ExpertArticle[]>(() => {
    const saved = localStorage.getItem('dangdang_articles');
    return saved ? JSON.parse(saved) : INITIAL_EXPERT_ARTICLES;
  });
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dangdang_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [cartCount, setCartCount] = useState<number>(1);

  // Events
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('dangdang_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  // Save to LocalStorage effects
  useEffect(() => {
    localStorage.setItem('dangdang_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dangdang_auth', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('dangdang_dogs', JSON.stringify(dogs));
    if (dogs.length > 0 && !dogs.some(d => d.id === selectedDogId)) {
      setSelectedDogId(dogs[0].id);
    }
  }, [dogs, selectedDogId]);

  useEffect(() => {
    localStorage.setItem('dangdang_selected_dog', selectedDogId);
  }, [selectedDogId]);

  useEffect(() => {
    localStorage.setItem('dangdang_vaccinations', JSON.stringify(vaccinations));
  }, [vaccinations]);

  useEffect(() => {
    localStorage.setItem('dangdang_hospital_visits', JSON.stringify(hospitalVisits));
  }, [hospitalVisits]);

  useEffect(() => {
    localStorage.setItem('dangdang_weight_records', JSON.stringify(weightRecords));
  }, [weightRecords]);

  useEffect(() => {
    localStorage.setItem('dangdang_medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('dangdang_places', JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem('dangdang_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('dangdang_articles', JSON.stringify(expertArticles));
  }, [expertArticles]);

  useEffect(() => {
    localStorage.setItem('dangdang_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dangdang_events', JSON.stringify(events));
  }, [events]);

  // Current dog
  const currentDog = dogs.find(d => d.id === selectedDogId) || dogs[0];

  // Auth actions
  const login = (email: string, nickname?: string) => {
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      email,
      nickname: nickname || email.split('@')[0],
    }));
    setIsAuthOpen(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const toggleAdminMode = () => {
    setUser(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
  };

  const performAttendanceCheck = () => {
    const today = new Date().toISOString().split('T')[0];
    if (user.lastAttendanceDate === today) {
      return { success: false, message: '오늘 이미 출석체크를 완료하셨습니다!', points: user.points };
    }
    const newDays = user.attendanceDays + 1;
    const addPoints = 50 + (newDays % 7 === 0 ? 500 : 0);
    const updatedUser = {
      ...user,
      attendanceDays: newDays,
      lastAttendanceDate: today,
      points: user.points + addPoints,
    };
    setUser(updatedUser);
    return {
      success: true,
      message: `출석체크 완료! +${addPoints}P가 적립되었습니다. (연속 ${newDays}일째)`,
      points: updatedUser.points,
    };
  };

  // Dog actions
  const addDog = (dogData: Omit<Dog, 'id'>) => {
    const newDog: Dog = {
      ...dogData,
      id: `dog-${Date.now()}`,
    };
    setDogs(prev => [...prev, newDog]);
    setSelectedDogId(newDog.id);
    return newDog;
  };

  const updateDog = (id: string, dogData: Partial<Dog>) => {
    setDogs(prev => prev.map(d => (d.id === id ? { ...d, ...dogData } : d)));
  };

  const deleteDog = (id: string) => {
    setDogs(prev => {
      const remaining = prev.filter(d => d.id !== id);
      if (remaining.length > 0 && selectedDogId === id) {
        setSelectedDogId(remaining[0].id);
      }
      return remaining;
    });
  };

  // Vaccinations
  const addVaccination = (vac: Omit<Vaccination, 'id'>) => {
    const newVac: Vaccination = {
      ...vac,
      id: `vac-${Date.now()}`,
    };
    setVaccinations(prev => [newVac, ...prev]);
  };

  const deleteVaccination = (id: string) => {
    setVaccinations(prev => prev.filter(v => v.id !== id));
  };

  const toggleVaccinationCompleted = (id: string) => {
    setVaccinations(prev =>
      prev.map(v => (v.id === id ? { ...v, isCompleted: !v.isCompleted } : v))
    );
  };

  // Hospital Visits
  const addHospitalVisit = (visit: Omit<HospitalVisit, 'id'>) => {
    const newVisit: HospitalVisit = {
      ...visit,
      id: `hosp-${Date.now()}`,
    };
    setHospitalVisits(prev => [newVisit, ...prev]);
  };

  const deleteHospitalVisit = (id: string) => {
    setHospitalVisits(prev => prev.filter(v => v.id !== id));
  };

  // Weight
  const addWeightRecord = (record: Omit<WeightRecord, 'id'>) => {
    const newRec: WeightRecord = {
      ...record,
      id: `w-${Date.now()}`,
    };
    setWeightRecords(prev => [...prev, newRec].sort((a, b) => a.date.localeCompare(b.date)));
    // Also update current dog's weight
    updateDog(record.dogId, { weight: record.weight });
  };

  const deleteWeightRecord = (id: string) => {
    setWeightRecords(prev => prev.filter(r => r.id !== id));
  };

  // Medications
  const addMedication = (med: Omit<Medication, 'id'>) => {
    const newMed: Medication = {
      ...med,
      id: `med-${Date.now()}`,
    };
    setMedications(prev => [newMed, ...prev]);
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const toggleMedicationTaken = (id: string) => {
    setMedications(prev =>
      prev.map(m => (m.id === id ? { ...m, isTakenToday: !m.isTakenToday } : m))
    );
  };

  // Places
  const toggleBookmarkPlace = (id: string) => {
    setPlaces(prev =>
      prev.map(p => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  };

  const addPlace = (placeData: Omit<Place, 'id' | 'rating' | 'reviewCount'>) => {
    const newPlace: Place = {
      ...placeData,
      id: `place-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
    };
    setPlaces(prev => [newPlace, ...prev]);
  };

  // Community Posts
  const addPost = ({
    category,
    title,
    content,
    image,
    tags,
  }: {
    category: Post['category'];
    title: string;
    content: string;
    image?: string;
    tags?: string[];
  }) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      category,
      title,
      content,
      authorName: user.nickname,
      authorDogName: currentDog?.name || '우리 아이',
      authorDogBreed: currentDog?.breed || '반려견',
      createdAt: '방금 전',
      likes: 0,
      likedByMe: false,
      views: 1,
      image,
      tags: tags || [],
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const toggleLikePost = (id: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const liked = !p.likedByMe;
          return {
            ...p,
            likedByMe: liked,
            likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, content: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            authorName: user.nickname,
            authorBreed: currentDog?.breed || '반려견',
            content,
            createdAt: '방금 전',
          };
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  // Expert Articles
  const addExpertArticle = (art: Omit<ExpertArticle, 'id' | 'createdAt'>) => {
    const newArt: ExpertArticle = {
      ...art,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setExpertArticles(prev => [newArt, ...prev]);
  };

  // Products
  const toggleSaveProduct = (id: string) => {
    setProducts(prev =>
      prev.map(pr => (pr.id === id ? { ...pr, isSaved: !pr.isSaved } : pr))
    );
  };

  const addToCart = (_productId: string) => {
    setCartCount(prev => prev + 1);
  };

  // Events
  const addEvent = (ev: Omit<EventItem, 'id'>) => {
    const newEv: EventItem = {
      ...ev,
      id: `ev-${Date.now()}`,
    };
    setEvents(prev => [newEv, ...prev]);
  };

  // Reset
  const resetAllData = () => {
    localStorage.clear();
    setDogs(INITIAL_DOGS);
    setSelectedDogId('dog-01');
    setVaccinations(INITIAL_VACCINATIONS);
    setHospitalVisits(INITIAL_HOSPITAL_VISITS);
    setWeightRecords(INITIAL_WEIGHT_RECORDS);
    setMedications(INITIAL_MEDICATIONS);
    setPlaces(INITIAL_PLACES);
    setPosts(INITIAL_POSTS);
    setExpertArticles(INITIAL_EXPERT_ARTICLES);
    setProducts(INITIAL_PRODUCTS);
    setEvents(INITIAL_EVENTS);
    setUser(INITIAL_USER);
    setIsLoggedIn(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedPlaceCategory,
        setSelectedPlaceCategory,
        selectedPostCategory,
        setSelectedPostCategory,
        selectedExpertCategory,
        setSelectedExpertCategory,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        isNotificationsOpen,
        setIsNotificationsOpen,
        user,
        isLoggedIn,
        login,
        logout,
        performAttendanceCheck,
        toggleAdminMode,
        dogs,
        selectedDogId,
        setSelectedDogId,
        currentDog,
        addDog,
        updateDog,
        deleteDog,
        vaccinations,
        addVaccination,
        deleteVaccination,
        toggleVaccinationCompleted,
        hospitalVisits,
        addHospitalVisit,
        deleteHospitalVisit,
        weightRecords,
        addWeightRecord,
        deleteWeightRecord,
        medications,
        addMedication,
        deleteMedication,
        toggleMedicationTaken,
        places,
        toggleBookmarkPlace,
        addPlace,
        posts,
        addPost,
        toggleLikePost,
        addComment,
        deletePost,
        expertArticles,
        selectedArticleId,
        setSelectedArticleId,
        addExpertArticle,
        products,
        toggleSaveProduct,
        cartCount,
        addToCart,
        events,
        addEvent,
        resetAllData,
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
