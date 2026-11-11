import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Post, PostCategory } from '../../types';
import { 
  MessageSquare, 
  Heart, 
  Search, 
  Plus, 
  Trash2, 
  Send, 
  Image as ImageIcon, 
  X, 
  Flame, 
  Sparkles,
  Share2
} from 'lucide-react';

const CATEGORIES: ('전체' | PostCategory)[] = [
  '전체',
  '자유게시판',
  '우리 강아지 자랑',
  '건강 질문',
  '훈련 고민',
  '산책 친구 찾기',
  '제품 사용 후기',
];

const SAMPLE_POST_IMAGES = [
  '/src/assets/images/dog_profile_sample_1794379968759.jpg',
  '/src/assets/images/hero_dog_park_1794379968344.jpg',
  '/src/assets/images/place_dog_cafe_1794379969714.jpg',
];

export const CommunityView: React.FC = () => {
  const { 
    posts, 
    addPost, 
    toggleLikePost, 
    addComment, 
    deletePost, 
    isLoggedIn, 
    setIsAuthOpen,
    user,
    currentDog,
    selectedPostCategory,
    setSelectedPostCategory
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>(selectedPostCategory || '전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New post form state
  const [newCategory, setNewCategory] = useState<PostCategory>('자유게시판');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState<string | undefined>(undefined);
  const [newTags, setNewTags] = useState('');

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      if (activeCategory !== '전체' && p.category !== activeCategory) return false;
      if (onlyPopular && p.likes < 10) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchContent = p.content.toLowerCase().includes(q);
        const matchTag = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchContent && !matchTag) return false;
      }
      return true;
    });
  }, [posts, activeCategory, onlyPopular, searchQuery]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setIsAuthOpen(true);
      return;
    }
    if (!newTitle.trim() || !newContent.trim()) {
      alert('제목과 내용을 모두 작성해 주세요.');
      return;
    }

    addPost({
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      image: newImage,
      tags: newTags ? newTags.split(',').map(t => t.trim()).filter(Boolean) : [],
    });

    setIsWriteModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setNewImage(undefined);
    setNewTags('');
  };

  const handleSendComment = (postId: string) => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
      return;
    }
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-[#6F9278] uppercase tracking-wider">Pet Parent Community</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332B] mt-1">견주 커뮤니티</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            일상 자랑부터 건강·훈련 고민, 산책 친구 찾기까지 따뜻하게 소통해보세요.
          </p>
        </div>

        <button
          onClick={() => {
            if (!isLoggedIn) {
              setIsAuthOpen(true);
            } else {
              setIsWriteModalOpen(true);
            }
          }}
          className="px-5 py-2.5 bg-[#6F9278] hover:bg-[#5a7c63] text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>이야기 작성하기</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedPostCategory(cat === '전체' ? null : cat);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? 'bg-[#6F9278] text-white border-[#6F9278] shadow-xs'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Popular Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-stone-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="게시글 제목, 내용, 태그 검색..."
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6F9278]/30 focus:outline-none"
          />
        </div>

        <button
          onClick={() => setOnlyPopular(!onlyPopular)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
            onlyPopular
              ? 'bg-[#F4B183]/20 text-[#26332B] border-[#F4B183] font-bold'
              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${onlyPopular ? 'text-[#F4B183] fill-current' : ''}`} />
          <span>인기글만 보기 (좋아요 10+)</span>
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
            <MessageSquare className="w-8 h-8 mx-auto text-stone-300 mb-2" />
            <p className="text-sm font-semibold text-stone-600">게시글이 없습니다.</p>
            <p className="text-xs text-stone-400 mt-1">첫 번째 주인공이 되어 새로운 이야기를 들려주세요!</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4 hover:border-stone-300 transition-colors"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F7F3EA] flex items-center justify-center text-[#6F9278] font-bold text-xs border border-stone-200">
                    {post.authorName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#26332B]">{post.authorName}</span>
                      <span className="text-[11px] text-[#6F9278] bg-[#6F9278]/10 px-2 py-0.5 rounded-full font-medium">
                        {post.authorDogName} ({post.authorDogBreed})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-0.5">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{post.createdAt}</span>
                      <span>·</span>
                      <span>조회 {post.views}</span>
                    </div>
                  </div>
                </div>

                {isLoggedIn && user.nickname === post.authorName && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-stone-300 hover:text-rose-500 p-1 transition-colors"
                    title="게시글 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Title & Content */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[#26332B] leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 whitespace-pre-line leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Attached Photo */}
              {post.image && (
                <div className="rounded-2xl overflow-hidden max-h-96 bg-stone-100 border border-stone-200">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] text-stone-500 hover:text-[#6F9278] cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Actions Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      post.likedByMe ? 'text-rose-600' : 'text-stone-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-current' : ''}`} />
                    <span>좋아요 {post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-stone-500">
                    <MessageSquare className="w-4 h-4" />
                    <span>댓글 {post.comments.length}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('게시글 링크가 클립보드에 복사되었습니다.');
                  }}
                  className="p-1 text-stone-400 hover:text-stone-700"
                  title="공유"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Comments Section */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/60 space-y-3">
                {post.comments.length > 0 && (
                  <div className="space-y-2.5 divide-y divide-stone-200/40">
                    {post.comments.map(c => (
                      <div key={c.id} className="pt-2 first:pt-0">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#26332B]">{c.authorName} ({c.authorBreed})</span>
                          <span className="text-stone-400 text-[10px]">{c.createdAt}</span>
                        </div>
                        <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">{c.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSendComment(post.id);
                    }}
                    placeholder={isLoggedIn ? '따뜻한 댓글을 남겨보세요...' : '로그인 후 댓글을 작성할 수 있습니다'}
                    className="flex-1 px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#6F9278]/30 focus:outline-none"
                  />
                  <button
                    onClick={() => handleSendComment(post.id)}
                    className="p-2 bg-[#6F9278] text-white rounded-xl hover:bg-[#5a7c63] transition-colors"
                    aria-label="댓글 등록"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Write Post Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 my-8 max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 shrink-0">
              <h3 className="text-base font-bold text-[#26332B]">새로운 이야기 작성하기</h3>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="overflow-y-auto pr-1 mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">카테고리 선택</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as PostCategory)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                >
                  {CATEGORIES.filter(c => c !== '전체').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">제목</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="제목을 입력해 주세요"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">내용</label>
                <textarea
                  rows={5}
                  required
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="반려견과의 소중한 일상이나 궁금한 점을 자유롭게 적어주세요."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs leading-relaxed"
                />
              </div>

              {/* Photo Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1.5">사진 첨부 (선택)</label>
                <div className="flex items-center gap-3">
                  {SAMPLE_POST_IMAGES.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewImage(newImage === url ? undefined : url)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        newImage === url ? 'border-[#6F9278] ring-2 ring-[#6F9278]/20 scale-105' : 'border-stone-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  {newImage && (
                    <button
                      type="button"
                      onClick={() => setNewImage(undefined)}
                      className="text-xs text-rose-500 hover:underline"
                    >
                      사진 취소
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#26332B] mb-1">태그 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="예: 비숑, 산책친구, 슬개골"
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#6F9278] hover:bg-[#5a7c63] rounded-xl shadow-sm"
                >
                  게시글 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
