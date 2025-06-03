import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, FileText, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ApiService, ProductInfo, NewsArticle } from '../services/api';

interface SearchResult {
  type: 'product' | 'news';
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductInfo[]>([]);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 获取所有产品和新闻数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, news] = await Promise.all([
          ApiService.getProductInfos(),
          ApiService.getNewsArticles(100) // 获取更多新闻用于搜索
        ]);
        setAllProducts(products);
        setAllNews(news);
      } catch (error) {
        console.error('获取搜索数据失败:', error);
      }
    };

    fetchData();
  }, []);

  // 当搜索框打开时聚焦输入框
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // 点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC键关闭搜索框
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // 执行搜索
  const performSearch = (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchResults: SearchResult[] = [];
    const lowerTerm = term.toLowerCase();

    // 搜索产品
    allProducts.forEach(product => {
      const matchScore = getMatchScore(product, lowerTerm);
      if (matchScore > 0) {
        searchResults.push({
          type: 'product',
          id: product.documentId,
          title: product.product_name,
          description: product.short_description || '暂无描述',
          url: `/products/${product.slug}`,
          imageUrl: product.productImageUrl
        });
      }
    });

    // 搜索新闻
    allNews.forEach(article => {
      const matchScore = getNewsMatchScore(article, lowerTerm);
      if (matchScore > 0) {
        searchResults.push({
          type: 'news',
          id: article.documentId,
          title: article.title,
          description: getNewsDescription(article.content),
          url: `/news/${article.documentId}`,
          imageUrl: article.firstImageUrl
        });
      }
    });

    // 按相关性排序并限制结果数量
    setResults(searchResults.slice(0, 10));
    setLoading(false);
  };

  // 计算产品匹配分数
  const getMatchScore = (product: ProductInfo, searchTerm: string): number => {
    let score = 0;
    
    // 产品名称匹配（权重最高）
    if (product.product_name.toLowerCase().includes(searchTerm)) {
      score += 10;
    }
    
    // 简短描述匹配
    if (product.short_description?.toLowerCase().includes(searchTerm)) {
      score += 5;
    }
    
    // 详细描述匹配
    if (product.full_description?.toLowerCase().includes(searchTerm)) {
      score += 3;
    }
    
    // 特性匹配
    if (product.features?.toLowerCase().includes(searchTerm)) {
      score += 3;
    }
    
    // 应用场景匹配
    if (product.applications?.toLowerCase().includes(searchTerm)) {
      score += 3;
    }
    
    // 分类匹配
    if (product.product_category?.name.toLowerCase().includes(searchTerm)) {
      score += 5;
    }
    
    // 技术规格匹配
    if (product.cpuLeiXing?.toLowerCase().includes(searchTerm)) score += 2;
    if (product.neiCun?.toLowerCase().includes(searchTerm)) score += 2;
    if (product.operating_system?.toLowerCase().includes(searchTerm)) score += 2;
    
    return score;
  };

  // 计算新闻匹配分数
  const getNewsMatchScore = (article: NewsArticle, searchTerm: string): number => {
    let score = 0;
    
    // 标题匹配（权重最高）
    if (article.title.toLowerCase().includes(searchTerm)) {
      score += 10;
    }
    
    // 内容匹配
    if (article.content.toLowerCase().includes(searchTerm)) {
      score += 5;
    }
    
    return score;
  };

  // 获取新闻描述
  const getNewsDescription = (content: string): string => {
    // 移除HTML标签并截取前100个字符
    const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
  };

  // 处理搜索输入
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // 防抖搜索
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch(searchTerm);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, allProducts, allNews]);

  // 清空搜索
  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // 处理结果点击
  const handleResultClick = () => {
    onClose();
    setSearchTerm('');
    setResults([]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
      >
        <motion.div
          ref={searchContainerRef}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden"
        >
          {/* 搜索输入框 */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="搜索产品和新闻..."
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* 搜索结果 */}
          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <div className="p-4 text-center text-gray-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-600 mx-auto"></div>
                <p className="mt-2">搜索中...</p>
              </div>
            )}

            {!loading && searchTerm && results.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                <p>未找到相关结果</p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="p-2">
                {results.map((result, index) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    to={result.url}
                    onClick={handleResultClick}
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      {/* 图标或图片 */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {result.imageUrl ? (
                          <img
                            src={result.imageUrl}
                            alt={result.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {result.type === 'product' ? (
                              <Package className="w-6 h-6" />
                            ) : (
                              <FileText className="w-6 h-6" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* 内容 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            result.type === 'product' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {result.type === 'product' ? '产品' : '新闻'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 overflow-hidden" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!loading && !searchTerm && (
              <div className="p-4 text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>输入关键词搜索产品和新闻</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GlobalSearch;