import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  TrendingUp, 
  Globe,
  CheckCircle,
  ArrowRight,
  Send
} from 'lucide-react';
import { ApiService, Company } from '../services/api';

const About: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirements: '',
    budget: '',
    timeline: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [companyInfo, setCompanyInfo] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  // 获取公司信息
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const data = await ApiService.getCompanyInfo();
        setCompanyInfo(data);
      } catch (error) {
        console.error('获取公司信息失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyInfo();
  }, []);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      await ApiService.submitCustomRequest(formData);
      setFormStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        requirements: '',
        budget: '',
        timeline: ''
      });
    } catch (error) {
      console.error('提交定制需求失败:', error);
      setFormStatus('error');
      setErrorMessage('提交失败，请稍后再试或直接联系我们');
    }
  };

  const companyStats = [
    { label: '成立年份', value: '2018', icon: TrendingUp },
    { label: '服务客户', value: '500+', icon: Users },
    { label: '产品系列', value: '20+', icon: Award },
    { label: '覆盖地区', value: '全国', icon: Globe }
  ];

  // 动态生成联系信息数组
  const contactInfo = [
    { 
      icon: Phone, 
      label: '电话', 
      value: companyInfo?.phone || '0755-12345678',
      secondValue: companyInfo?.beiyongPhone
    },
    { 
      icon: Mail, 
      label: '邮箱', 
      value: companyInfo?.email || 'contact@yanxiangtech.com' 
    },
    { 
      icon: MapPin, 
      label: '地址', 
      value: companyInfo?.address || '深圳市南山区科技园南区高新南七道数字技术大厦A座12楼' 
    },
    { 
      icon: Clock, 
      label: '工作时间', 
      value: companyInfo?.work_time || '周一至周五 9:00-18:00' 
    }
  ];

  const coreValues = [
    {
      title: '诚信',
      description: '诚实守信是我们的立业之本，我们始终坚持以诚信为基础，与客户建立长期稳定的合作关系。'
    },
    {
      title: '务实',
      description: '脚踏实地，追求实效，我们注重产品的实用性和可靠性，为客户提供真正有价值的解决方案。'
    },
    {
      title: '创新',
      description: '持续创新是企业发展的动力，我们不断探索新技术、新方法，推动产品和服务的升级换代。'
    },
    {
      title: '人才',
      description: '人才是企业最宝贵的资源，我们重视人才培养和团队建设，打造专业高效的技术团队。'
    }
  ];

  const customServices = [
    {
      title: '硬件定制',
      description: '根据客户需求定制硬件配置，包括处理器、内存、存储、接口等',
      items: ['处理器选型', '内存容量', '存储方案', '接口扩展', '散热设计']
    },
    {
      title: '软件定制',
      description: '提供操作系统定制、驱动开发、应用软件开发等服务',
      items: ['操作系统裁剪', '驱动程序开发', '应用软件开发', '系统优化', '安全加固']
    },
    {
      title: '外观定制',
      description: '提供产品外观设计、结构设计、LOGO定制等服务',
      items: ['外壳设计', '面板定制', '按键布局', 'LOGO印制', '颜色定制']
    },
    {
      title: '解决方案',
      description: '提供完整的行业解决方案，包括硬件、软件、服务等',
      items: ['需求分析', '方案设计', '产品选型', '系统集成', '技术支持']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark-800 to-dark-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {companyInfo?.name || '深圳市研响科技有限公司'} - 专业工控设备提供商
            </p>
            <div className="flex justify-center space-x-6">
              {companyStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <IconComponent className="w-8 h-8 text-accent-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-dark-800 mb-6">公司简介</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  深圳市研响科技有限公司成立于2018年，是一家专业从事工业控制设备研发、生产和销售的高新技术企业。
                  公司总部位于深圳市南山区科技园，拥有一支高素质的研发团队和完善的生产体系。
                </p>
                <p>
                  我们专注于工控机、嵌入式系统、边缘计算设备等产品的研发和生产，产品广泛应用于智能制造、
                  自动化控制、机器视觉、边缘计算等领域，为客户提供高质量、高可靠性的工控解决方案。
                </p>
                <p>
                  公司秉承"诚信、务实、创新、人才"的核心价值观，致力于成为工业控制领域的领导者，
                  为中国制造业的智能化升级贡献力量。
                </p>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  查看我们的产品
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {companyInfo?.videoUrl ? (
                <div className="rounded-xl shadow-lg overflow-hidden">
                  <video 
                    src={companyInfo.videoUrl} 
                    controls 
                    className="w-full h-auto" 
                    poster={companyInfo.erWeimaUrl || undefined}
                  >
                    您的浏览器不支持视频播放
                  </video>
                </div>
              ) : (
                <>
                  <img
                    src="https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=600&h=400&fit=crop"
                    alt="公司简介"
                    className="rounded-xl shadow-lg w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-600/20 to-transparent rounded-xl"></div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-800 mb-4">核心价值观</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              我们的企业文化和价值观指引着我们的发展方向
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-accent-600">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-dark-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-800 mb-4">联系我们</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              我们随时为您提供专业的技术支持和服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-800 mb-2">{info.label}</h3>
                  <p className="text-gray-600">{info.value}</p>
                  {info.secondValue && (
                    <p className="text-gray-600 mt-1">{info.secondValue}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* 二维码 */}
          {companyInfo?.erWeimaUrl && (
            <div className="mt-12 flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-dark-800 mb-4">扫码联系我们</h3>
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <img 
                  src={companyInfo.erWeimaUrl} 
                  alt="联系我们二维码" 
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
          )}
          

        </div>
      </section>

      {/* Custom Service */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-800 mb-4">定制化服务</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              根据您的需求提供个性化的产品和解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {customServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-dark-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Custom Request Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-dark-800 mb-6 text-center">提交定制需求</h3>
            
            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-semibold text-dark-800 mb-2">提交成功！</h4>
                <p className="text-gray-600 mb-6">我们会尽快与您联系，感谢您的信任。</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  提交新需求
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">公司名称 *</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">电子邮箱 *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">联系电话 *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">需求描述 *</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">预算范围</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="">请选择</option>
                      <option value="10万以下">10万以下</option>
                      <option value="10-50万">10-50万</option>
                      <option value="50-100万">50-100万</option>
                      <option value="100万以上">100万以上</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">期望交付时间</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    >
                      <option value="">请选择</option>
                      <option value="1个月内">1个月内</option>
                      <option value="1-3个月">1-3个月</option>
                      <option value="3-6个月">3-6个月</option>
                      <option value="6个月以上">6个月以上</option>
                    </select>
                  </div>
                </div>
                
                {formStatus === 'error' && (
                  <div className="text-red-500 text-sm">{errorMessage}</div>
                )}
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="inline-flex items-center px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:bg-gray-400"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        提交中...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        提交需求
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;