export type ActiveTab = 
  | 'home' 
  | 'dog' 
  | 'health' 
  | 'places' 
  | 'community' 
  | 'expert' 
  | 'shop' 
  | 'events' 
  | 'support' 
  | 'ai' 
  | 'mypage' 
  | 'admin';

export interface Dog {
  id: string;
  name: string;
  breed: string;
  birthDate: string; // YYYY-MM-DD
  gender: '남아' | '여아';
  weight: number; // kg
  isNeutered: boolean;
  registrationNumber?: string;
  microchipNumber?: string;
  photoUrl: string;
  allergies?: string[];
  notes?: string;
  emergencyContact?: string;
}

export interface Vaccination {
  id: string;
  dogId: string;
  name: string; // 종합백신(DHPPL), 코로나 장염, 켄넬코프, 광견병, 인플루엔자 등
  date: string; // 접종일
  nextDate: string; // 다음 접종 예정일
  clinic: string; // 접종 병원
  batchNumber?: string;
  notes?: string;
  isCompleted: boolean;
}

export interface HospitalVisit {
  id: string;
  dogId: string;
  date: string;
  clinic: string;
  reason: string; // 정기검진, 피부 가려움, 귀 염증, 슬개골 검진 등
  treatment: string;
  cost: number; // KRW
  prescription?: string;
  notes?: string;
}

export interface WeightRecord {
  id: string;
  dogId: string;
  date: string;
  weight: number; // kg
  notes?: string;
}

export interface Medication {
  id: string;
  dogId: string;
  name: string; // 심장사상충 예방약, 외이염 치료제, 알러지 소양제 등
  dosage: string; // 1회 1정
  time: string; // 아침 식후 30분
  startDate: string;
  endDate: string;
  isTakenToday?: boolean;
  notes?: string;
}

export type PlaceCategory = 
  | '애견 동반 카페' 
  | '애견 동반 식당' 
  | '애견 동반 숙소' 
  | '반려견 놀이터' 
  | '산책 공원' 
  | '반려견 동반 여행지';

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  region: string; // 서울, 경기, 강원, 제주 등
  address: string;
  image: string;
  rating: number;
  reviewCount: number;
  allowedSizes: ('소형견' | '중형견' | '대형견')[];
  environment: '실내' | '실외' | '실내+실외';
  hasParking: boolean;
  hasFencedArea: boolean;
  leashRequired: boolean;
  description: string;
  operatingHours: string;
  contact: string;
  isVerified: boolean; // 실제 확인된 데이터 vs 샘플 데이터
  bookmarked?: boolean;
}

export type PostCategory = 
  | '자유게시판' 
  | '우리 강아지 자랑' 
  | '건강 질문' 
  | '훈련 고민' 
  | '산책 친구 찾기' 
  | '제품 사용 후기';

export interface Comment {
  id: string;
  authorName: string;
  authorBreed: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  category: PostCategory;
  title: string;
  content: string;
  authorName: string;
  authorDogName: string;
  authorDogBreed: string;
  createdAt: string;
  likes: number;
  likedByMe?: boolean;
  comments: Comment[];
  image?: string;
  views: number;
  tags?: string[];
}

export type ExpertCategory = 
  | '강아지 건강관리' 
  | '예방접종' 
  | '사료 및 영양' 
  | '행동 및 훈련' 
  | '견종별 특징' 
  | '노령견 관리' 
  | '초보 견주 가이드';

export interface ExpertArticle {
  id: string;
  category: ExpertCategory;
  title: string;
  summary: string;
  content: string[];
  author: string;
  authorTitle: string; // 수의학 박사, 행동교정 전문가 등
  readTime: string;
  image: string;
  createdAt: string;
  medicalDisclaimer?: boolean;
}

export type ProductCategory = 
  | '사료' 
  | '간식' 
  | '장난감' 
  | '산책용품' 
  | '위생용품' 
  | '건강관리용품';

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isSaved?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  period: string;
  category: '출석체크' | '체험단 모집' | '사진 콘테스트' | '견주 참여 이벤트' | '특별 할인';
  status: '진행중' | '예정' | '마감';
  isOfficial: boolean; // 운영자 등록 vs 샘플 이벤트
  description: string;
  reward?: string;
  image?: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface User {
  id: string;
  email: string;
  nickname: string;
  isAdmin: boolean;
  avatarUrl?: string;
  attendanceDays: number;
  lastAttendanceDate?: string;
  points: number;
}
