import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ApiService, ProductCategory } from '../../services/api';
import GlobalSearch from '../GlobalSearch';

// 定义子菜单项的类型
interface SubmenuItem {
  name: string;
  href: string;
}

// 定义导航项的类型
interface NavigationItem {
  name: string;
  href: string;
  submenu?: SubmenuItem[];
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileOpenSubmenu, setMobileOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  // const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);

  // 基本导航菜单
  const [navigation, setNavigation] = useState<NavigationItem[]>([
    { name: '首页', href: '/' },
    {
      name: '产品中心',
      href: '/products',
      submenu: [] // 初始化为空数组，稍后在useEffect中获取categories后再更新
    },
    { name: '行业应用', href: '/applications' },
    {
      name: '关于我们',
      href: '/about',
      submenu: [
        { name: '公司简介', href: '/about' },
        { name: '新闻动态', href: '/news' },
        { name: '联系我们', href: '/contact' }
      ]
    },
    { name: '下载专区', href: '/downloads' },
    { name: '样品申请', href: '/sample-request' },
  ]);

  // 获取产品分类
  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const categories = await ApiService.getProductCategories();
        console.log('导航栏获取产品分类:', categories);

        // 更新产品中心的子菜单
        setNavigation(prev => {
          return prev.map(item => {
            if (item.name === '产品中心') {
              return {
                ...item,
                submenu: [
                  // 产品中心本身就是产品列表页，不需要再添加产品列表菜单项
                  ...categories.map((cat: ProductCategory) => ({
                    name: cat.name,
                    href: `/products/category/${cat.id}`
                  }))
                ]
              };
            }
            return item;
          });
        });
      } catch (error) {
        console.error('获取产品分类失败:', error);
      }
    };

    fetchProductCategories();
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">研</span>
            </div>
            <span className="text-xl font-bold text-dark-800">研响科技</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <div
                  className="flex items-center space-x-1 cursor-pointer h-6"
                  onMouseEnter={() => item.submenu && setOpenSubmenu(item.name)}
                  onMouseLeave={() => item.submenu && setOpenSubmenu(null)}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-accent-600'
                        : 'text-dark-600 hover:text-accent-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4 text-dark-400" />
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && (
                  <AnimatePresence>
                    {openSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-dark-600 hover:text-accent-600 hover:bg-gray-50 transition-colors duration-200"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* 搜索按钮 */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-dark-600 hover:text-accent-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="全局搜索"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link
              to="/sample-request"
              className="px-4 py-2 text-accent-600 border border-accent-600 rounded-lg hover:bg-accent-50 transition-colors duration-200"
            >
              申请样品
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
            >
              联系我们
            </Link>
          </div>

          {/* Mobile Search and Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* 移动端搜索按钮 */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-md text-dark-600 hover:text-accent-600 hover:bg-gray-100 transition-colors duration-200"
              title="搜索"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-dark-600 hover:text-accent-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => setMobileOpenSubmenu(mobileOpenSubmenu === item.name ? null : item.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'text-accent-600 bg-accent-50'
                            : 'text-dark-600 hover:text-accent-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileOpenSubmenu === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      <AnimatePresence>
                        {mobileOpenSubmenu === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 space-y-1 overflow-hidden"
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setMobileOpenSubmenu(null);
                                }}
                                className="block px-3 py-2 rounded-md text-sm text-dark-500 hover:text-accent-600 hover:bg-gray-50 transition-colors duration-200"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive(item.href)
                          ? 'text-accent-600 bg-accent-50'
                          : 'text-dark-600 hover:text-accent-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Action Buttons */}
              {/* Action Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/sample-request"
                  className="px-4 py-2 text-accent-600 border border-accent-600 rounded-lg hover:bg-accent-50 transition-colors duration-200"
                >
                  申请样品
                </Link>
                <Link
                  to="/contact"
                  className="block w-full px-4 py-2 text-center bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  联系我们
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 全局搜索组件 */}
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
};

export default Header;