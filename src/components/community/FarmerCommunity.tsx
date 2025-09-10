import React, { useState } from 'react';
import FarmIcon from '../../ui/FarmIcon';
import Modal from '../../ui/Modal'

const FarmerCommunity: React.FC = () => {
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New post submitted:', newPost);
    alert(`पोस्ट सफलतापूर्वक बनाई गई: "${newPost.title}"`);
    setNewPost({ title: '', content: '' });
    setShowNewPostModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FarmIcon name="community" size="xl" className="mr-4 text-white" />
          किसान समुदाय
        </h1>
        <p className="text-purple-100 text-lg">अपने सवाल पूछें और अनुभव साझा करें</p>
      </div>

      {/* ✅ WORKING NEW POST BUTTON */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center space-x-2"
          onClick={() => setShowNewPostModal(true)}
        >
          <span className="text-lg">+</span>
          <span>New Post</span>
        </button>
      </div>

      {/* Sample Posts */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="border-b pb-4 mb-4">
          <h3 className="font-semibold text-lg text-gray-800">राम सिंह</h3>
          <p className="text-gray-600 mt-2">या कोई रोग है? कृपया सुझाव दें।</p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <span>2 hours ago</span>
            <button className="text-blue-600 hover:text-blue-800">Reply</button>
            <button className="text-green-600 hover:text-green-800">Like</button>
          </div>
        </div>
      </div>

      {/* ✅ WORKING NEW POST MODAL */}
      <Modal 
        isOpen={showNewPostModal} 
        onClose={() => setShowNewPostModal(false)}
        title="नया पोस्ट बनाएं"
        size="lg"
      >
        <form onSubmit={handleSubmitPost} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">विषय</label>
            <input
              type="text"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="अपने प्रश्न या विषय का शीर्षक लिखें"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">विवरण</label>
            <textarea
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="अपना सवाल या सुझाव यहाँ विस्तार से लिखें..."
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setShowNewPostModal(false)}
              className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              पोस्ट करें
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FarmerCommunity;
