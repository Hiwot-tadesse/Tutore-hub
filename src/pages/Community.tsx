import { useState } from 'react';
import { User, Calendar, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface CommunityProps {
  onNavigate: (page: string) => void;
}

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  profiles?: {
    full_name?: string;
    grade_level?: string;
    is_tutor?: boolean;
  };
}

export default function Community({ onNavigate }: CommunityProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      title: 'Welcome to the Community!',
      content: 'Feel free to ask questions and share tips.',
      category: 'general',
      created_at: new Date().toISOString(),
      profiles: { full_name: 'Admin', is_tutor: true },
    },
  ]);

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');

  const { user } = useAuth();

  function handleSubmitPost(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      onNavigate('auth');
      return;
    }

    const newPost: CommunityPost = {
      id: Math.random().toString(),
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      created_at: new Date().toISOString(),
      profiles: { full_name: user.email || 'Anonymous' },
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('general');
    setShowNewPostForm(false);
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <User className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Community</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Connect with fellow learners, share experiences, and learn together
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Community Discussions</h2>
              <p className="text-gray-600">Share your thoughts and learn from others</p>
            </div>
            {user ? (
              <button
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                New Post
              </button>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Sign In to Post
              </button>
            )}
          </div>

          {showNewPostForm && (
            <form onSubmit={handleSubmitPost} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="What's your post about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="general">General</option>
                    <option value="homework-help">Homework Help</option>
                    <option value="study-tips">Study Tips</option>
                    <option value="questions">Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    required
                    rows={5}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Share your thoughts..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">Be the first to start a discussion!</p>
            {user && (
              <button
                onClick={() => setShowNewPostForm(true)}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create First Post
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {post.profiles?.full_name || 'Anonymous'}
                        {post.profiles?.is_tutor && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Tutor
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.created_at)}</span>
                        <span>•</span>
                        <span className="capitalize">{post.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
