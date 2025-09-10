import React, { useState, useEffect } from 'react';
import { CommunityPost } from '../../types';
import { DemoService } from '../../services/demoService';

const CommunityDisplay: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(false);

  const demoService = new DemoService();

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  const fetchCommunityPosts = async () => {
    setLoading(true);
    try {
      const communityPosts = demoService.getCommunityPosts();
      setPosts(communityPosts);
    } catch (error) {
      console.error('Failed to fetch community posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">👥 Farmer Community</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          ➕ New Post
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <span className="ml-2">Loading community posts...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

const PostCard: React.FC<{post: CommunityPost}> = ({ post }) => (
  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">
          {post.authorName.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="font-semibold text-gray-800">{post.authorName}</h3>
          {post.verified && <span className="text-blue-500">✓</span>}
          <span className="text-sm text-gray-500">
            📍 {post.location.district}, {post.location.state}
          </span>
          <span className="text-sm text-gray-400">
            {post.createdAt.toLocaleDateString()}
          </span>
        </div>
        
        <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
        <p className="text-gray-700 mb-3">{post.content}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <button className="flex items-center space-x-1 hover:text-red-500">
            <span>❤️</span>
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <span>💬</span>
            <span>{post.comments.length}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-green-500">
            <span>📤</span>
            <span>{post.shares}</span>
          </button>
          <span className="flex items-center space-x-1">
            <span>👁️</span>
            <span>{post.views}</span>
          </span>
        </div>
      </div>
    </div>
    
    {post.expertAnswered && (
      <div className="mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
        <p className="text-sm text-green-800 font-medium">✅ Expert Answer Available</p>
      </div>
    )}
  </div>
);

export default CommunityDisplay;
