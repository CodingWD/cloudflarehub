import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu, Monitor, Smartphone, Grid3X3, Package, Settings } from 'lucide-react';
import { ApiService, ProductCategory } from '../services/api';

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ApiService.getProductCategories();
        setCategories(data);
      } catch (error) {
        console.error('获取产品分类失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIcon = (categoryName: string) => {
    if (categoryName.includes('一体机')) return Monitor;
    if (categoryName.includes('嵌入式')) return Cpu;
    if (categoryName.includes('迷你') || categoryName.includes('紧凑')) return Smartphone;
    if (categoryName.includes('定制')) return Settings;
    return Package;
  };

  const getCategoryDescription = (categoryName: string) => {
    if (categoryName.includes('一体机')) return '集成显示屏的工业计算机，操作便捷，适用于人机交互场景';
    if (categoryName.includes('嵌入式')) return '高性能处理器，丰富扩展接口，适用于复杂工业应用';
    if (categoryName.includes('迷你') || categoryName.includes('紧凑')) return '小巧精致，功能强大，适用于空间受限的应用环境';
    if (categoryName.includes('定制')) return '根据客户需求定制化设计，提供专业的解决方案';
    return '专业工控设备，满足各种工业应用需求';
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600'
    ];
    return colors[index % colors.length];
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">产品分类</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              专业工控设备产品线，涵盖嵌入式工控机、工业一体机、超紧凑设备等多个系列
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = getCategoryIcon(category.name);
              const colorClass = getCategoryColor(index);
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link
                    to={`/products?category=${category.documentId}`}
                    className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Category Header */}
                    <div className={`bg-gradient-to-r ${colorClass} p-6 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{category.name}</h3>
                            <p className="text-white/80 text-sm">Level {category.level}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>

                    {/* Category Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {getCategoryDescription(category.name)}
                      </p>
                      
                      {/* Category Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>分类级别: {category.level}</span>
                        <span>ID: {category.documentId}</span>
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center text-accent-600 font-medium group-hover:text-accent-700">
                        <span>查看产品</span>
                        <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Grid3X3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无产品分类</h3>
              <p className="text-gray-500">产品分类信息正在更新中，请稍后再试</p>
            </motion.div>
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
            <h2 className="text-3xl font-bold mb-4">找不到合适的产品？</h2>
            <p className="text-xl mb-6 text-accent-100">
              我们提供定制化服务，根据您的具体需求设计专属解决方案
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

export default ProductCategories;