import React, { useState } from 'react';
import FarmIcon from '../../ui/FarmIcon';
import Modal from '../../ui/Modal';

const ProduceMarketplace: React.FC = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    organic: false
  });

  const [products] = useState([
    {
      id: 1,
      name: 'Organic Wheat',
      price: '₹25/kg',
      farmer: 'Ram Singh',
      location: '2km away',
      image: '/images/crops/wheat.png',
      organic: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Fresh Rice',
      price: '₹38/kg',
      farmer: 'Priya Devi',
      location: '5km away',
      image: '/images/crops/rice.png',
      organic: false,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Premium Cotton',
      price: '₹52/kg',
      farmer: 'Suresh Kumar',
      location: '8km away',
      image: '/images/crops/cotton.png',
      organic: true,
      rating: 4.9
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Product submitted:', productForm);
    alert(`Product "${productForm.name}" listed successfully!`);
    setProductForm({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      organic: false
    });
    setShowAddProductModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FarmIcon name="marketplace" size="xl" className="mr-4 text-white" />
          Local Produce Market
        </h1>
        <p className="text-blue-100 text-lg">Buy directly from farmers in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search crops..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FarmIcon name="market" size="md" className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Within 50km</option>
            <option>Within 25km</option>
            <option>Within 10km</option>
          </select>
          
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Grains</option>
            <option>Vegetables</option>
            <option>Fruits</option>
          </select>
        </div>

        {/* Filter Tags */}
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
            🌱 Organic Only
          </button>
          <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors">
            ⭐ Premium Quality
          </button>
          <button className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors">
            📍 Nearby
          </button>
          <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
            💰 Best Price
          </button>
        </div>
      </div>

      {/* ✅ WORKING ADD PRODUCT BUTTON */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <button
          className="w-full bg-green-600 text-white rounded-lg py-4 text-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
          onClick={() => setShowAddProductModal(true)}
        >
          + List Your Produce for Sale
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.organic && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  🌱 Organic
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full">
                <span className="text-yellow-500">⭐ {product.rating}</span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">by {product.farmer}</p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">{product.price}</span>
                <span className="text-gray-500 text-sm">📍 {product.location}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
                  Buy Now
                </button>
                <button className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Contact Farmer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ WORKING ADD PRODUCT MODAL */}
      <Modal 
        isOpen={showAddProductModal} 
        onClose={() => setShowAddProductModal(false)}
        title="List Your Produce for Sale"
        size="lg"
      >
        <form onSubmit={handleSubmitProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Organic Wheat"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={productForm.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Category</option>
                <option value="grains">Grains</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="pulses">Pulses</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={productForm.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe your produce quality, harvesting details, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per Kg (₹) *</label>
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="25"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Quantity (Kg) *</label>
              <input
                type="number"
                name="quantity"
                value={productForm.quantity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="100"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="organic"
              checked={productForm.organic}
              onChange={handleInputChange}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="text-sm font-medium text-gray-700">
              This is an organic product 🌱
            </label>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={() => setShowAddProductModal(false)}
              className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              List Product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProduceMarketplace;
