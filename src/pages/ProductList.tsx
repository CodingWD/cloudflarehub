import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3X3, List, ChevronRight, Cpu, HardDrive, Zap, Thermometer } from 'lucide-react';
import { ApiService, ProductInfo, ProductCategory } from '../services/api';

const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // 从URL参数中获取分类ID
  const [selectedCategory, setSelectedCategory] = useState(
    params.categoryId || searchParams.get('category') || ''
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 监听路由参数变化，更新selectedCategory
  useEffect(() => {
    console.log('路由参数变化:', params.categoryId);
    setSelectedCategory(params.categoryId || searchParams.get('category') || '');
  }, [params.categoryId, searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          ApiService.getProductInfos(),
          ApiService.getProductCategories()
        ]);
        console.log('产品数据:', productsData);
        console.log('分类数据:', categoriesData);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 在filteredProducts定义后添加：
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.short_description && product.short_description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === '' ||
      (product.product_category &&
        (product.product_category.id.toString() === selectedCategory || 
          product.product_category.documentId === selectedCategory));
    return matchesSearch && matchesCategory;
  });

  const getProductImage = (product: ProductInfo) => {
    // 使用处理后的图片URL
    if (product.productImageUrl) {
      return product.productImageUrl;
    }
    // 如果有图片数组，使用第一张图片
    if (product.image && product.image.length > 0) {
      return `http://192.168.31.177:1337${product.image[0].url}`;
    }
    // 使用占位图片作为后备
    return 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop';
  };

  const getProductSpecs = (product: ProductInfo) => {
    console.log('处理产品规格:', product);
    const specs = [];

    // 添加一些基于可用数据的默认规格
    specs.push({ icon: Cpu, label: '产品', value: product.product_name });
    if (product.short_description) {
      specs.push({ icon: HardDrive, label: '描述', value: product.short_description.substring(0, 20) + '...' });
    }
    if (product.product_category) {
      specs.push({ icon: Zap, label: '分类', value: product.product_category.name });
    }

    console.log('生成的规格:', specs);
    return specs.slice(0, 3); // 只显示前3个规格
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark-800 to-dark-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">产品列表</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              专业工控设备产品，为您的工业应用提供可靠的计算平台
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索产品..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  <option value="">所有分类</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.documentId}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-accent-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-accent-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            找到 {filteredProducts.length} 个产品
            {selectedCategory && (
              <span className="ml-2">
                · 分类: {categories.find(c => c.documentId === selectedCategory)?.name}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Grid3X3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">未找到相关产品</h3>
              <p className="text-gray-500">请尝试调整搜索条件或选择其他分类</p>
            </motion.div>
          ) : (
            <div className={viewMode === 'grid' ?
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' :
              'space-y-6'
            }>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <Link
                      to={`/products/${product.slug}`}
                      className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={getProductImage(product)}
                          alt={product.product_name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {product.product_category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-accent-600 text-white text-xs font-medium rounded-full">
                              {product.product_category.name}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-dark-800 mb-2 group-hover:text-accent-600 transition-colors duration-200">
                          {product.product_name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.short_description || '专业工控设备，为您的工业应用提供可靠的计算平台'}
                        </p>

                        {/* Key Specs */}
                        <div className="space-y-2 mb-4">
                          {getProductSpecs(product).map((spec, specIndex) => {
                            const IconComponent = spec.icon;
                            return (
                              <div key={specIndex} className="flex items-center text-sm text-gray-600">
                                <IconComponent className="w-4 h-4 mr-2 text-accent-600" />
                                <span className="font-medium mr-2">{spec.label}:</span>
                                <span>{spec.value}</span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex items-center text-accent-600 font-medium group-hover:text-accent-700">
                          <span>查看详情</span>
                          <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    // List View
                    <Link
                      to={`/products/${product.slug}`}
                      className="flex bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <img
                        src={getProductImage(product)}
                        alt={product.product_name}
                        className="w-48 h-32 object-cover flex-shrink-0"
                      />

                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* Category badge - temporarily disabled */}
                            {product.product_category && (
                               <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full mb-2">
                                 {product.product_category.name}
                               </span>
                             )}
                            <h3 className="text-xl font-semibold text-dark-800 mb-2 group-hover:text-accent-600 transition-colors duration-200">
                              {product.product_name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {product.short_description || '专业工控设备，为您的工业应用提供可靠的计算平台'}
                            </p>

                            {/* Key Specs in List View */}
                            <div className="flex flex-wrap gap-4">
                              {getProductSpecs(product).map((spec, specIndex) => {
                                const IconComponent = spec.icon;
                                return (
                                  <div key={specIndex} className="flex items-center text-sm text-gray-600">
                                    <IconComponent className="w-4 h-4 mr-1 text-accent-600" />
                                    <span className="font-medium mr-1">{spec.label}:</span>
                                    <span>{spec.value}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex items-center text-accent-600 font-medium group-hover:text-accent-700 ml-4">
                            <span>查看详情</span>
                            <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">需要技术支持？</h2>
            <p className="text-xl mb-6 text-accent-100">
              我们的技术团队随时为您提供专业的产品咨询和技术支持
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sample-request"
                className="px-6 py-3 bg-white text-accent-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                申请样品
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-accent-600 transition-colors duration-200"
              >
                联系我们
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;