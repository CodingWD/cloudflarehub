import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Cpu, Monitor, Smartphone, Settings, TrendingUp, Users, Award, Globe } from 'lucide-react';
import { ApiService, ProductCategory, NewsArticle } from '../services/api';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, newsData] = await Promise.all([
          ApiService.getProductCategories(),
          ApiService.getNewsArticles(3)
        ]);
        setCategories(categoriesData);
        setNews(newsData);
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchData();
  }, []);

  const heroSlides = [
    {
      title: '引领工业4.0智能制造',
      subtitle: '专业工控机解决方案提供商',
      description: '集成最新AI芯片技术，为智能制造提供强有力的计算支撑',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop',
      cta: '了解产品',
      ctaLink: '/products'
    },
    {
      title: '边缘计算新突破',
      subtitle: '高性能嵌入式工控平台',
      description: '超低功耗设计，宽温工作范围，适应各种恶劣工业环境',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop',
      cta: '技术详情',
      ctaLink: '/applications'
    },
    {
      title: '定制化服务',
      subtitle: '满足您的个性化需求',
      description: '从硬件配置到软件定制，提供一站式解决方案',
      image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1200&h=600&fit=crop',
      cta: '立即咨询',
      ctaLink: '/sample-request'
    }
  ];

  const productCategories = [
    {
      name: '可扩展嵌入式系列',
      icon: Cpu,
      description: '高性能处理器，丰富扩展接口',
      link: '/products/expandable-embedded'
    },
    {
      name: '工业一体机',
      icon: Monitor,
      description: '集成显示，操作便捷',
      link: '/products/all-in-one'
    },
    {
      name: '超紧凑迷你型',
      icon: Smartphone,
      description: '小巧精致，功能强大',
      link: '/products/mini'
    },
    {
      name: '定制化服务',
      icon: Settings,
      description: '个性化定制，专业服务',
      link: '/custom-service'
    }
  ];

  const companyStats = [
    { label: '成立年份', value: '2018', icon: TrendingUp },
    { label: '服务客户', value: '500+', icon: Users },
    { label: '产品系列', value: '20+', icon: Award },
    { label: '覆盖地区', value: '全国', icon: Globe }
  ];

  const caseStudies = [
    {
      title: '智能制造生产线',
      description: '为某知名汽车制造商提供完整的工控解决方案',
      image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=400&h=300&fit=crop',
      tags: ['汽车制造', '自动化']
    },
    {
      title: '机器视觉检测系统',
      description: '高精度视觉检测，提升产品质量控制水平',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      tags: ['机器视觉', '质量控制']
    },
    {
      title: '边缘计算平台',
      description: '实时数据处理，降低云端计算成本',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      tags: ['边缘计算', '数据处理']
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold mb-4"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl mb-2 text-accent-300"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg mb-8 text-gray-200"
                >
                  {slide.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-accent-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Product Categories Quick Access */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-800 mb-4">产品分类</h2>
            <p className="text-lg text-gray-600">专业工控设备，满足不同应用场景需求</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={category.link}
                    className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-dark-800 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="flex items-center text-accent-600 text-sm font-medium group-hover:text-accent-700">
                      了解更多
                      <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-800 mb-6">关于我们</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                深圳市研响科技有限公司成立于2018年，是一家专业从事工业控制设备研发、生产和销售的高新技术企业。
                我们秉承"诚信、务实、创新、人才"的核心价值观，致力于为客户提供高质量、高可靠性的工控解决方案。
              </p>
              <p className="text-gray-600 mb-8">
                公司拥有完整的产品线，包括嵌入式工控机、工业一体机、超紧凑迷你型设备等，
                广泛应用于智能制造、自动化控制、机器视觉、边缘计算等领域。
              </p>
              
              {/* Company Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {companyStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                    >
                      <IconComponent className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-dark-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
              
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                了解更多
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop"
                alt="关于我们"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-600/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-800 mb-4">案例展示</h2>
            <p className="text-lg text-gray-600">成功案例见证我们的专业实力</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">{caseStudy.title}</h3>
                  <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent-100 text-accent-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-dark-800 mb-4">新闻动态</h2>
              <p className="text-lg text-gray-600">了解最新的产品发布和行业动态</p>
            </div>
            <Link
              to="/news"
              className="text-accent-600 hover:text-accent-700 font-medium flex items-center"
            >
              查看全部
              <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 h-96 flex flex-col"
              >
                {/* 图片部分 */}
                <div className="h-48 overflow-hidden">
                  {article.fengmiantu?.url ? (
                    <img 
                      src={article.firstImageUrl || `http://192.168.31.177:1337${article.fengmiantu.url}`}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                      <div className="text-accent-600 text-4xl font-bold opacity-50">
                        新闻
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 内容部分 */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <div className="text-sm text-accent-600 mb-2">
                      {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                    </div>
                    <h3 className="text-lg font-semibold text-dark-800 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-2 mb-3">
                      {article.jianjie || article.excerpt || article.content}
                    </p>
                  </div>
                  <div className="mt-auto pt-2">
                    <Link
                      to={`/news/${article.documentId}`}
                      className="text-accent-600 hover:text-accent-700 text-sm font-medium flex items-center"
                    >
                      了解更多
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;