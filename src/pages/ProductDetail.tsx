import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Download,
  Cpu,
  HardDrive,
  Zap,
  Thermometer,
  Wifi,
  Monitor,
  Package,
  FileText,
  Image as ImageIcon,
  Settings,
  ExternalLink
} from 'lucide-react';
import { ApiService, ProductInfo, BASE_URL } from '../services/api';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('images');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [navOriginalTop, setNavOriginalTop] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const data = await ApiService.getProductInfo(id);
        setProduct(data);
      } catch (error) {
        console.error('获取产品详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // 添加状态保存导航栏高度
  const [navHeight, setNavHeight] = useState(0);

  // 添加滚动监听
  useEffect(() => {
    // 延迟计算，确保DOM完全加载
    let ticking = false;

    // 获取导航栏原始位置
    const calculateNavPosition = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const newNavOriginalTop = rect.top + scrollTop;
        const newNavHeight = rect.height;
        
        // 只有在导航栏不是固定状态时才更新原始位置
        if (!isNavSticky) {
          setNavOriginalTop(newNavOriginalTop);
          setNavHeight(newNavHeight);
          console.log('导航栏原始位置计算完成:', newNavOriginalTop, '高度:', newNavHeight);
        }
      } else {
        console.log('导航栏元素未找到，重试中...');
        // 如果元素未找到，延迟重试
        setTimeout(calculateNavPosition, 200);
      }
    };

    // 等待DOM完全加载后再计算位置，增加延迟时间
    setTimeout(calculateNavPosition, 1000);

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (navRef.current && navOriginalTop > 0) {
            const currentScrollY = window.scrollY;
            const mainNavHeight = 64; // 主导航栏高度
            const stickPoint = navOriginalTop - mainNavHeight; // 固定触发点
            
            let shouldSticky;
            
            if (currentScrollY >= stickPoint) {
              // 向下滑动超过触发点：固定导航栏
              shouldSticky = true;
            } else {
              // 向上滑动回到触发点以下：恢复跟随页面滚动
              shouldSticky = false;
            }
            
            if (isNavSticky !== shouldSticky) {
              setIsNavSticky(shouldSticky);
              console.log('🔄 导航栏状态更新:', shouldSticky ? '固定在顶部' : '跟随页面滚动', 
                '滚动位置:', currentScrollY, '触发点:', stickPoint, '原始位置:', navOriginalTop);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // 初始执行一次滚动处理
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateNavPosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateNavPosition);
    };
  }, [isNavSticky, navOriginalTop]); // 添加必要的依赖项

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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">产品未找到</h2>
          <p className="text-gray-500 mb-6">请检查产品ID是否正确</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-accent-600 text-white font-medium rounded-lg hover:bg-accent-700 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            返回产品列表
          </Link>
        </div>
      </div>
    );
  }

  const getProductImages = () => {
    // 如果产品有图片，使用产品图片
    if (product.image && product.image.length > 0) {
      // 生产环境下，BASE_URL是'/api'，图片URL已经是相对路径，不需要再拼接BASE_URL
      // 开发环境下，BASE_URL是'http://aifafafa.xyz:1337'，需要拼接
      return product.image.map(img => 
        process.env.NODE_ENV === 'production' 
          ? `${BASE_URL}${img.url}` 
          : `${BASE_URL}${img.url}`
      );
    }
    // 默认图片
    return [
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop'
    ];
  };

  const productImages = getProductImages();

  const specifications = [
    // 使用新添加的属性
    // { label: '产品名称', value: product.product_name, icon: Cpu },
    // { label: '产品ID', value: product.id.toString(), icon: HardDrive },
    // { label: '发布状态', value: product.faBuStatus, icon: Zap },
    { label: 'CPU', value: product.cpuLeiXing, icon: Cpu },
    { label: '内存', value: product.neiCun, icon: HardDrive },
    { label: '网卡', value: product.wangKa, icon: Wifi },
    { label: '显示', value: product.xianShiJieKou, icon: Monitor },
    { label: '电源', value: product.powerType, icon: Zap },
    { label: '系统', value: product.operating_system, icon: Package },
    { label: '工作温度', value: product.operating_temperature, icon: Thermometer },
  ].filter(spec => spec.value);

  const tabs = [
    { id: 'images', label: '产品详情', icon: ImageIcon },
    { id: 'specs', label: '技术规格', icon: FileText },
    { id: 'applications', label: '应用场景', icon: Settings },
    { id: 'downloads', label: '附件下载', icon: Download }
  ];

  const applications = [
    {
      title: '智能制造',
      description: '适用于自动化生产线控制、设备监控和数据采集',
      image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=400&h=300&fit=crop'
    },
    {
      title: '机器视觉',
      description: '高性能图像处理，支持实时视觉检测和质量控制',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
    },
    {
      title: '边缘计算',
      description: '本地数据处理，降低延迟，提升系统响应速度',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    }
  ];

  // 格式化文件大小
  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '未知大小';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  // 获取文件类型
  const getFileType = (filename: string, mime?: string): string => {
    if (mime) {
      if (mime.includes('pdf')) return 'PDF';
      if (mime.includes('zip') || mime.includes('rar')) return 'ZIP';
      if (mime.includes('dwg')) return 'DWG';
      if (mime.includes('doc')) return 'DOC';
      if (mime.includes('excel') || mime.includes('spreadsheet')) return 'XLS';
    }
    const ext = filename.split('.').pop()?.toUpperCase();
    return ext || 'FILE';
  };

  // 处理文件下载
  const handleDownload = (file: any) => {
    const downloadUrl = file.url.startsWith('http') ? file.url : `${BASE_URL}${file.url}`;
    
    // 创建临时a标签进行下载
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name || 'download'; // 设置下载文件名
    link.target = '_blank';
    
    // 添加到DOM并触发点击
    document.body.appendChild(link);
    link.click();
    
    // 清理DOM
    document.body.removeChild(link);
  };

  // 获取下载文件列表
  const downloadFiles = product?.downloads || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-accent-600">首页</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent-600">产品列表</Link>
            <span>/</span>
            <span className="text-dark-800">{product.product_name}</span>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4 relative">
                <div 
                  className="relative overflow-hidden rounded-xl shadow-lg cursor-crosshair"
                  onMouseEnter={() => setShowMagnifier(true)}
                  onMouseLeave={() => setShowMagnifier(false)}
                  onMouseMove={(e) => {
                    if (!imageRef.current) return;
                    
                    const rect = imageRef.current.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // 计算图片在容器中的实际位置和尺寸
                    const imgNaturalWidth = imageRef.current.naturalWidth;
                    const imgNaturalHeight = imageRef.current.naturalHeight;
                    const imgDisplayWidth = rect.width;
                    const imgDisplayHeight = rect.height;
                    
                    // 计算缩放比例
                    const scaleX = imgNaturalWidth / imgDisplayWidth;
                    const scaleY = imgNaturalHeight / imgDisplayHeight;
                    
                    setMagnifierPosition({ x, y });
                    setImagePosition({ 
                      x: x * scaleX, 
                      y: y * scaleY 
                    });
                  }}
                >
                  <img
                    ref={imageRef}
                    src={productImages[selectedImageIndex]}
                    alt={product.product_name}
                    className="w-full h-96 object-cover"
                  />
                  
                  {/* 放大镜 */}
                  {showMagnifier && (
                    <div
                      className="absolute pointer-events-none border-2 border-white shadow-lg"
                      style={{
                        left: magnifierPosition.x - 75,
                        top: magnifierPosition.y - 75,
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        backgroundImage: `url(${productImages[selectedImageIndex]})`,
                        backgroundSize: `${imageRef.current?.naturalWidth || 0}px ${imageRef.current?.naturalHeight || 0}px`,
                        backgroundPosition: `-${imagePosition.x - 75}px -${imagePosition.y - 75}px`,
                        backgroundRepeat: 'no-repeat',
                        transform: 'scale(2)',
                        transformOrigin: 'center',
                        zIndex: 10
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${index === selectedImageIndex ? 'border-accent-600' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <img
                        src={image}
                        alt={`${product.product_name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category badge - temporarily disabled
              {product.product_category && (
                <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full mb-4">
                  {product.product_category.name}
                </span>
              )}
              */}

              <h1 className="text-3xl md:text-4xl font-bold text-dark-800 mb-4">{product.product_name}</h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {product.short_description || '专业工控设备，为您的工业应用提供可靠的计算平台。采用先进的处理器技术，具备出色的性能和稳定性。'}
              </p>

              {/* Key Specifications */}
              <div className="bg-gray-50 rounded-xl p-3  mb-8">
                <h3 className="text-lg font-semibold text-dark-800 mb-4">核心参数</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specifications.slice(0, 6).map((spec, index) => {
                    const IconComponent = spec.icon || Cpu; // 提供默认图标
                    return (
                      <div key={index} className="flex items-center">
                        <div className="w-5  h-5 flex-shrink-0 mr-3">
                          <IconComponent className="w-full h-full text-accent-600" />
                        </div>
                        <span className="font-medium text-gray-700 mr-2">{spec.label}:</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/sample-request"
                  className="flex-1 bg-accent-600 hover:bg-accent-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 text-center"
                >
                  申请样品
                </Link>
                <button className="flex-1 border-2 border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                  技术咨询
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="relative">
        {/* 导航栏容器 */}
        <div className="relative">
          <section
            ref={navRef}
            className={`bg-white ${isNavSticky
              ? 'fixed top-[64px] left-0 right-0 z-40 shadow-[0_2px_10px_rgba(0,0,0,0.05)] animate-slideDown'
              : 'border-t'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="flex space-x-8 overflow-x-auto py-2 scrollbar-hide">
                {/* 添加左右渐变阴影指示器 */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>

                {tabs.map((tab) => {
                  const IconComponent = tab.icon || ImageIcon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        // 点击后滚动到内容区域，确保内容不被遮挡
                        const contentSection = document.querySelector('#tab-content');
                        if (contentSection) {
                          const offsetTop = contentSection.getBoundingClientRect().top + window.scrollY;
                          const mainNavHeight = 64;
                          const tabNavHeight = navHeight || 60;
                          const scrollTo = offsetTop - mainNavHeight - tabNavHeight - 20; // 额外20px间距
                          window.scrollTo({
                            top: scrollTo,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className={`flex items-center py-3 px-4 font-medium text-sm transition-all duration-200 whitespace-nowrap hover:bg-gray-50 rounded-md ${
                        activeTab === tab.id
                          ? 'text-accent-600 border-b-2 border-accent-600'
                          : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}

                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
              </div>
            </div>
          </section>

          {/* 添加占位空间，防止内容跳动，确保内容不被覆盖 */}
          {isNavSticky && <div style={{ height: `${navHeight}px`, marginBottom: '20px' }} />}
        </div>
      </div>
      {/* Tab Content */}
      <section id="tab-content" className={`${isNavSticky ? 'pt-8 pb-6' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'images' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {product.full_description ? (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      img: ({ node, ...props }: any) => (
                        <img
                          {...props}
                          className="max-w-full h-auto rounded-lg mx-auto my-6"
                          src={props.src?.replace(/^\//, `${BASE_URL}/`) || ''}
                          alt={props.alt || '产品图片'}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop';
                          }}
                        />
                      ),
                      a: ({ node, ...props }: any) => (
                        <a
                          {...props}
                          className="text-accent-600 hover:text-accent-700 underline"
                          target="_blank"
                          aria-label={`在新窗口打开链接: ${props.children}`}
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {product.full_description}
                  </ReactMarkdown>
                </div>
              ) : (
                <div>
                  {/* <h3 className="text-2xl font-bold text-dark-800 mb-6">产品详情</h3> */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productImages.map((image, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${product.product_name} 宣传图 ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-medium text-dark-800">产品图片 {index + 1}</h4>
                          <p className="text-sm text-gray-600 mt-1">高清产品展示图</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'specs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                {/* <h3 className="text-2xl font-bold text-dark-800 mb-6">技术规格</h3> */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200">
                      {specifications.map((spec, index) => {
                        const IconComponent = spec.icon || Cpu; // 提供默认图标
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-4 pr-6">
                              <div className="flex items-center">
                                <div className="w-5 h-5 flex-shrink-0 mr-3">
                                  <IconComponent className="w-full h-full text-accent-600" />
                                </div>
                                <span className="font-medium text-gray-900">{spec.label}</span>
                              </div>
                            </td>
                            <td className="py-4 text-gray-600">{spec.value}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                {/* <h3 className="text-2xl font-bold text-dark-800 mb-4">应用场景</h3> */}
                <p className="text-lg text-gray-600">广泛应用于各种工业自动化和智能制造场景</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {applications.map((app, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-dark-800 mb-3">{app.title}</h4>
                      <p className="text-gray-600">{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'downloads' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                {/* <h3 className="text-2xl font-bold text-dark-800 mb-6">附件下载</h3> */}
                {downloadFiles.length > 0 ? (
                  <div className="space-y-4">
                    {downloadFiles.map((file, index) => (
                      <div key={file.id || index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                            <FileText className="w-6 h-6 text-accent-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-dark-800">{file.name}</h4>
                            <p className="text-sm text-gray-600">
                              {getFileType(file.name, file.mime)} · {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDownload(file)}
                          className="flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          下载
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-500 mb-2">暂无下载文件</h4>
                    <p className="text-gray-400">该产品暂时没有可下载的附件文件</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Products CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">需要更多信息？</h2>
            <p className="text-xl mb-6 text-accent-100">
              我们的技术专家随时为您提供详细的产品咨询和技术支持
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sample-request"
                className="px-6 py-3 bg-white text-accent-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                申请样品
              </Link>
              <Link
                to="/products"
                className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-accent-600 transition-colors duration-200"
              >
                查看更多产品
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;