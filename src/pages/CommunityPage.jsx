import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Heart,
  Send,
  PlusCircle,
  Trash2,
  Share2,
  Search,
  Filter,
  User,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

const CommunityPage = () => {
  const {
    profile,
    communityPosts,
    createCommunityPost,
    togglePostLike,
    addPostComment,
    deleteCommunityPost
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Post creation modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  // Comments state per post: { [postId]: string }
  const [commentInputs, setCommentInputs] = useState({});
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);

  const categories = [
    { label: 'All Categories', value: 'All' },
    { label: 'General', value: 'General' },
    { label: 'Technical', value: 'Technical' },
    { label: 'Events', value: 'Events' },
    { label: 'Academics', value: 'Academics' },
    { label: 'Opportunities', value: 'Opportunities' },
  ];

  const filteredPosts = useMemo(() => {
    return communityPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        post.content.toLowerCase().includes(query) ||
        post.authorName.toLowerCase().includes(query) ||
        (post.category && post.category.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [communityPosts, selectedCategory, searchQuery]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (createCommunityPost({ content: newContent, category: newCategory })) {
      setNewContent('');
      setNewCategory('General');
      setIsCreateModalOpen(false);
    }
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (text && text.trim()) {
      addPostComment(postId, text);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Campus Community</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Connect with peers, share project updates, discuss course roadmaps, and exchange advice.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-sm self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Discussion Post</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-soft flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search discussions by topic, student name, keyword..."
          className="flex-1"
        />

        <div className="flex items-center gap-2.5">
          <FilterDropdown
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === cat.value
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredPosts.map((post) => {
            const isOwnPost = post.authorId === profile.id;
            const isCommentsExpanded = activeCommentPostId === post.id;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-soft hover:shadow-soft-lg transition-all"
              >
                {/* Author Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800">{post.authorName}</h4>
                        {post.authorDept && (
                          <span className="text-[11px] text-slate-400 font-medium">
                            • {post.authorDept}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-50 text-brand-700">
                      {post.category}
                    </span>

                    {isOwnPost && (
                      <button
                        onClick={() => deleteCommunityPost(post.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 whitespace-pre-line">
                  {post.content}
                </p>

                {/* Engagement Bar: Like & Comments toggle */}
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <button
                    onClick={() => togglePostLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors font-medium ${
                      post.isLiked ? 'text-rose-600 font-semibold' : 'hover:text-rose-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current text-rose-600' : ''}`} />
                    <span>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveCommentPostId(isCommentsExpanded ? null : post.id)
                    }
                    className="flex items-center gap-1.5 hover:text-brand-600 transition-colors font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{(post.comments || []).length} Comments</span>
                  </button>
                </div>

                {/* Comment Section */}
                {isCommentsExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                    {/* Comment list */}
                    {(post.comments || []).length > 0 && (
                      <div className="space-y-2.5 mb-3">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <img
                              src={comment.authorAvatar}
                              alt={comment.authorName}
                              className="w-7 h-7 rounded-full object-cover border border-slate-200 mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between text-xs mb-0.5">
                                <span className="font-bold text-slate-800">{comment.authorName}</span>
                                <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                              </div>
                              <p className="text-xs text-slate-600">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment input */}
                    <div className="flex items-center gap-2">
                      <img
                        src={profile.avatar}
                        alt={profile.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                        className="p-1.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:bg-slate-200 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={MessageSquare}
          title="No discussions found"
          description="Be the first to share an update or question with your campus community!"
          actionLabel="Create First Post"
          onAction={() => setIsCreateModalOpen(true)}
        />
      )}

      {/* Create Post Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Community Post"
      >
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="General">General</option>
              <option value="Technical">Technical</option>
              <option value="Events">Events</option>
              <option value="Academics">Academics</option>
              <option value="Opportunities">Opportunities</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Discussion Content</label>
            <textarea
              rows={4}
              required
              placeholder="What would you like to ask or share with fellow students?"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm"
            >
              Publish Post
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CommunityPage;

