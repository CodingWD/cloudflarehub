import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Cpu, Monitor, Smartphone, Settings, TrendingUp, Users, Award, Globe, Star, CheckCircle, Play } from 'lucide-react';
import { ApiService, ProductCategory, NewsArticle, CarouselSlide } from '../services/api';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesData, newsData, carouselData] = await Promise.all([
          ApiService.getProductCategories(),
          ApiService.getNewsArticles(3),
          ApiService.getCarouselSlides()
        ]);
        setCategories(categoriesData);
        setNews(newsData);
        setCarouselSlides(carouselData);
      } catch (error) {
        console.error('获取数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 渲染CTA按钮的函数
  const renderCTAButton = (cta: any) => {
    if (!cta) return null;

    // 兼容新旧数据结构
    const ctaData = {
      text: cta.text || cta.cta_text || '了解更多',
      type: cta.type || cta.cta_type || 'internal',
      link: cta.link || cta.cta_link || '/',
      style: (cta.style || cta.cta_style || 'primary') as 'primary' | 'secondary' | 'outline'
    };

    const baseClasses = "inline-flex items-center px-8 py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105";
    const styleClasses: Record<'primary' | 'secondary' | 'outline', string> = {
      primary: "bg-accent-600 hover:bg-accent-700 text-white shadow-lg hover:shadow-xl",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl",
      outline: "border-2 border-white text-white hover:bg-white hover:text-accent-600"
    };

    const buttonClass = `${baseClasses} ${styleClasses[ctaData.style]}`;

    if (ctaData.type === 'external') {
      return (
        <a
          href={ctaData.link}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {ctaData.text}
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      );
    }

    if (ctaData.type === 'download') {
      return (
        <a
          href={ctaData.link}
          download
          className={buttonClass}
        >
          {ctaData.text}
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      );
    }

    if (ctaData.type === 'anchor') {
      return (
        <a
          href={ctaData.link}
          className={buttonClass}
        >
          {ctaData.text}
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      );
    }

    // 默认为内部链接
    return (
      <Link
        to={ctaData.link}
        className={buttonClass}
      >
        {ctaData.text}
        <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    );
  };

  // 获取媒体URL的函数
  const getMediaUrl = (slide: CarouselSlide): string => {
    switch (slide.media_type) {
      case 'image':
        return slide.imageUrl || '';
      case 'video':
        return slide.videoUrl || '';
      case 'svg':
        return slide.svg_code || '';
      default:
        return '';
    }
  };

  // 从API获取的产品分类数据，如果没有则使用默认分类
  const getProductCategoryLink = (categoryName: string) => {
    const category = categories.find((cat: ProductCategory) => 
      cat.name.includes(categoryName) || categoryName.includes(cat.name)
    );
    return category ? `/products/category/${category.documentId}` : '/products/categories';
  };

  const staticProductCategories = [
    {
      name: '可扩展嵌入式系列',
      icon: Cpu,
      description: '高性能处理器，丰富扩展接口',
      link: getProductCategoryLink('嵌入式'),
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: '工业一体机',
      icon: Monitor,
      description: '集成显示，操作便捷',
      link: getProductCategoryLink('一体机'),
      gradient: 'from-green-500 to-green-600'
    },
    {
      name: '超紧凑迷你型',
      icon: Smartphone,
      description: '小巧精致，功能强大',
      link: getProductCategoryLink('迷你'),
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      name: '定制化服务',
      icon: Settings,
      description: '个性化定制，专业服务',
      link: getProductCategoryLink('定制'),
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const companyStats = [
    { label: '成立年份', value: '2018', icon: TrendingUp, color: 'text-blue-600' },
    { label: '服务客户', value: '500+', icon: Users, color: 'text-green-600' },
    { label: '产品系列', value: '20+', icon: Award, color: 'text-purple-600' },
    { label: '覆盖地区', value: '全国', icon: Globe, color: 'text-orange-600' }
  ];

  const caseStudies = [
    {
      title: '智能制造生产线',
      description: '为某知名汽车制造商提供完整的工控解决方案，实现生产线自动化升级',
      image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=400&h=300&fit=crop',
      tags: ['汽车制造', '自动化'],
      achievement: '效率提升40%'
    },
    {
      title: '机器视觉检测系统',
      description: '高精度视觉检测，提升产品质量控制水平，降低人工成本',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      tags: ['机器视觉', '质量控制'],
      achievement: '检测精度99.9%'
    },
    {
      title: '边缘计算平台',
      description: '实时数据处理，降低云端计算成本，提升响应速度',
      image: '/images/edge-computing-platform.svg',
      tags: ['边缘计算', '数据处理'],
      achievement: '响应时间<10ms'
    }
  ];

  const features = [
    {
      title: '高可靠性',
      description: '工业级设计，7x24小时稳定运行',
      icon: CheckCircle
    },
    {
      title: '强扩展性',
      description: '丰富的接口配置，满足各种应用需求',
      icon: Settings
    },
    {
      title: '专业服务',
      description: '从方案设计到售后维护的全程服务',
      icon: Star
    }
  ];

  useEffect(() => {
    if (carouselSlides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [carouselSlides.length]);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Carousel */}
      <section className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-50 to-accent-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent-600 border-t-transparent mx-auto mb-6"></div>
              <p className="text-accent-700 text-lg font-medium">精彩内容加载中...</p>
            </div>
          </div>
        ) : carouselSlides.length > 0 ? (
          <>
            {carouselSlides.map((slide, index) => {
              const mediaUrl = getMediaUrl(slide);
              const isVideo = slide.media_type === 'video';
              const isSvg = slide.media_type === 'svg';
              
              // 处理点击跳转
              const handleSlideClick = () => {
                if (slide.cta_link) {
                  if (slide.cta_type === 'external') {
                    window.open(slide.cta_link, '_blank');
                  } else if (slide.cta_type === 'internal') {
                    // 使用React Router进行内部导航
                    window.location.href = slide.cta_link;
                  } else if (slide.cta_type === 'anchor') {
                    window.location.href = slide.cta_link;
                  } else if (slide.cta_type === 'download') {
                    const link = document.createElement('a');
                    link.href = slide.cta_link;
                    link.download = '';
                    link.click();
                  }
                }
              };
              
              return (
                <motion.div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 cursor-pointer ${
                    index === currentSlide ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-105'
                  }`}
                  onClick={handleSlideClick}
                  style={!isVideo && !isSvg ? {
                    backgroundImage: `url(${mediaUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  } : {}}
                >
                  {/* 视频背景 */}
                  {isVideo && mediaUrl && (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={mediaUrl} type="video/mp4" />
                    </video>
                  )}
                  
                  {/* SVG背景 - 移除遮罩 */}
                  {isSvg && mediaUrl && (
                    <div 
                      className="absolute inset-0 w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${mediaUrl})`
                      }}
                    />
                  )}
                  
                  {/* Content overlay - 移除背景遮罩 */}
                

                  {/* 底部中间的查看更多按钮 - 优化样式和动画 */}
                  <div className="absolute inset-0 flex items-end justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ 
                        opacity: index === currentSlide ? 1 : 0, 
                        y: index === currentSlide ? 0 : 30,
                        scale: index === currentSlide ? 1 : 0.9
                      }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      className="mb-16"
                    >
                      <motion.div 
                        className="relative bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-10 py-4 rounded-full font-medium transition-all duration-300 shadow-2xl cursor-pointer group overflow-hidden"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* 背景动画效果 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        
                        {/* 按钮文字 */}
                        <span className="relative z-10 flex items-center gap-2">
                          查看更多
                          <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            ↓
                          </motion.div>
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white/50 ${
                    index === currentSlide 
                      ? 'bg-white scale-110 border-white shadow-lg' 
                      : 'bg-white/30 hover:bg-white/50 hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-accent-600 to-accent-700">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">欢迎来到研响科技</h1>
              <p className="text-xl md:text-2xl mb-8 text-accent-300">专业工控机解决方案提供商</p>
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-white text-accent-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                了解产品
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Product Categories Quick Access */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              产品分类
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              专业工控设备，满足不同行业的自动化需求
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-accent-600 mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {staticProductCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center group cursor-pointer overflow-hidden transform hover:-translate-y-2`}
                  onClick={() => {
                    window.location.href = category.link;
                  }}
                >
                  {/* 背景渐变 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* 图标容器 */}
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                  
                  {/* 底部按钮 */}
                  <div className="flex items-center justify-center text-accent-600 font-semibold group-hover:text-accent-700 transition-colors duration-300">
                    <span className="mr-2">了解更多</span>
                    <motion.div
                      className="transform group-hover:translate-x-1 transition-transform duration-300"
                    >
                      →
                    </motion.div>
                  </div>
                  
                  {/* 装饰元素 */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-accent-100 to-accent-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Summary */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-accent-50 to-transparent rounded-full -translate-y-48 translate-x-48 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-50 to-transparent rounded-full translate-y-32 -translate-x-32 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
                关于我们
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                深圳市研响科技有限公司成立于2018年，是一家专业从事工业控制设备研发、生产和销售的高新技术企业。
                我们秉承"诚信、务实、创新、人才"的核心价值观，致力于为客户提供高质量、高可靠性的工控解决方案。
              </p>
              
              {/* 特色功能 */}
              <div className="space-y-6 mb-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Company Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {companyStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center group"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600&h=400&fit=crop"
                  alt="关于我们"
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* 浮动卡片 */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">ISO 9001 认证</h4>
                      <p className="text-sm text-gray-600">国际质量管理体系认证</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 装饰元素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-400 to-blue-500 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
            </motion.div>
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