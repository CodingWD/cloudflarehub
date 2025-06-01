import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Search, Filter, ChevronLeft } from 'lucide-react';
import { ApiService, NewsArticle } from '../services/api';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await ApiService.getNewsArticles();
        setNews(data);
      } catch (error) {
        console.error('获取新闻失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = ['全部', '产品发布', '行业动态', '技术分享', '公司新闻'];

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    // Category filter temporarily disabled - no category field in NewsArticle
    const matchesCategory = selectedCategory === '' || selectedCategory === '全部';
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, length: number = 150) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '产品发布': 'bg-blue-100 text-blue-700',
      '行业动态': 'bg-green-100 text-green-700',
      '技术分享': 'bg-purple-100 text-purple-700',
      '公司新闻': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">新闻动态</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              了解最新的产品发布、行业动态和技术分享
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索新闻..."
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
                  {categories.map((category) => (
                    <option key={category} value={category === '全部' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            找到 {filteredNews.length} 篇文章
            {selectedCategory && selectedCategory !== '全部' && (
              <span className="ml-2">· 分类: {selectedCategory}</span>
            )}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">未找到相关新闻</h3>
              <p className="text-gray-500">请尝试调整搜索条件或选择其他分类</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {filteredNews.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Article Image */}
                    <div className="lg:w-80 h-64 lg:h-auto bg-gray-200 flex-shrink-0">
                      <img
                        src={`https://images.unsplash.com/photo-${1550000000000 + index}?w=400&h=300&fit=crop`}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop';
                        }}
                      />
                    </div>

                    {/* Article Content */}
                    <div className="flex-1 p-8">
                      <div className="flex items-center gap-4 mb-4">
                        {/* Category temporarily disabled - no category field in NewsArticle
                        {article.category && (
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                        )}
                        */}
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 mr-1" />
                          {'研响科技'}
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-dark-800 mb-4 group-hover:text-accent-600 transition-colors duration-200">
                        <Link to={`/news/${article.documentId}`}>
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {getExcerpt(article.content)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          预计阅读时间: {Math.ceil(article.content.length / 500)} 分钟
                        </div>
                        
                        <Link
                          to={`/news/${article.documentId}`}
                          className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium group-hover:translate-x-1 transition-all duration-200"
                        >
                          阅读全文
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">订阅我们的新闻</h2>
            <p className="text-xl mb-6 text-accent-100">
              第一时间获取最新的产品发布和行业动态
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="请输入您的邮箱"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-accent-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
                订阅
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// News Detail Component
export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      try {
        // 模拟获取单篇文章详情
        const allNews = await ApiService.getNewsArticles();
        const foundArticle = allNews.find(news => news.documentId === id);
        
        if (foundArticle) {
          setArticle(foundArticle);
          // 获取相关文章（同分类的其他文章）- temporarily disabled
          const related = allNews
            .filter(news => news.documentId !== id)
            .slice(0, 3);
          setRelatedNews(related);
        }
      } catch (error) {
        console.error('获取文章详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

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

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">文章未找到</h2>
          <p className="text-gray-500 mb-6">请检查文章ID是否正确</p>
          <Link
            to="/news"
            className="inline-flex items-center px-6 py-3 bg-accent-600 text-white font-medium rounded-lg hover:bg-accent-700 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            返回新闻列表
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      '产品发布': 'bg-blue-100 text-blue-700',
      '行业动态': 'bg-green-100 text-green-700',
      '技术分享': 'bg-purple-100 text-purple-700',
      '公司新闻': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-accent-600">首页</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-accent-600">新闻动态</Link>
            <span>/</span>
            <span className="text-dark-800">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Article Header */}
            <div className="p-8 border-b">
              <div className="flex items-center gap-4 mb-6">
                {/* Category temporarily disabled - no category field in NewsArticle
                        {article.category && (
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                        )}
                        */}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(article.publishedAt)}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-1" />
                  {'研响科技'}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">{article.title}</h1>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                预计阅读时间: {Math.ceil(article.content.length / 500)} 分钟
              </div>
            </div>

            {/* Article Body */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Related Articles */}
          {relatedNews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-dark-800 mb-6">相关文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/news/${relatedArticle.documentId}`}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-1550000000000?w=400&h=200&fit=crop`}
                      alt={relatedArticle.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=200&fit=crop';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-dark-800 mb-2 line-clamp-2 group-hover:text-accent-600 transition-colors duration-200">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(relatedArticle.publishedAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </div>
  );
};

export default News;