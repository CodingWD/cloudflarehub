import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Factory, 
  Car, 
  Zap, 
  Package, 
  Cpu, 
  Eye, 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Users
} from 'lucide-react';

const Applications: React.FC = () => {
  const industries = [
    {
      title: '能源电力',
      description: '为电力系统提供稳定可靠的监控和控制设备',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
      features: [
        '电网监控系统',
        '变电站自动化',
        '新能源接入',
        '故障诊断'
      ],
      benefits: [
        '提高供电可靠性',
        '降低运维成本',
        '优化能源配置',
        '环保节能'
      ]
    },
    {
      title: '边缘计算',
      description: '为边缘计算场景提供高性能计算平台',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      features: [
        '实时数据处理',
        'AI推理加速',
        '本地存储',
        '云边协同'
      ],
      benefits: [
        '降低延迟',
        '减少带宽成本',
        '提高数据安全',
        '增强系统可靠性'
      ]
    },
    {
      title: '机器视觉',
      description: '高性能视觉检测系统，确保产品质量',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      features: [
        '缺陷检测',
        '尺寸测量',
        '字符识别',
        '表面检查'
      ],
      benefits: [
        '检测速度提升10倍',
        '漏检率降低至0.01%',
        '检测标准统一',
        '人工成本节省70%'
      ]
    }
  ];

  const caseStudies = [
    {
      title: '某知名汽车制造商智能工厂项目',
      industry: '汽车制造',
      challenge: '传统生产线效率低下，质量控制困难，人工成本高',
      solution: '部署研响科技工控机，实现生产线全自动化控制和质量监控',
      results: [
        '生产效率提升35%',
        '产品合格率达到99.8%',
        '人工成本降低40%',
        '设备故障率下降60%'
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
    },
    {
      title: '大型物流中心自动化升级',
      industry: '物流仓储',
      challenge: '订单处理速度慢，分拣错误率高，库存管理混乱',
      solution: '采用边缘计算工控机，构建智能仓储管理系统',
      results: [
        '分拣效率提升50%',
        '错误率降低至0.1%',
        '库存周转率提升25%',
        '运营成本降低30%'
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop'
    },
    {
      title: '电子产品质量检测系统',
      industry: '机器视觉',
      challenge: '人工检测效率低，漏检率高，检测标准不统一',
      solution: '部署高性能视觉检测工控机，实现自动化质量控制',
      results: [
        '检测速度提升10倍',
        '漏检率降低至0.01%',
        '检测标准统一',
        '人工成本节省70%'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'
    }
  ];

  const advantages = [
    {
      icon: TrendingUp,
      title: '提升效率',
      description: '自动化控制系统显著提升生产效率和产品质量'
    },
    {
      icon: Shield,
      title: '稳定可靠',
      description: '工业级设计，7x24小时稳定运行，故障率极低'
    },
    {
      icon: Clock,
      title: '快速响应',
      description: '实时数据处理，毫秒级响应，满足高速生产需求'
    },
    {
      icon: Users,
      title: '专业服务',
      description: '专业技术团队提供全方位技术支持和定制服务'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=1200&h=800&fit=crop)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">行业应用</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              专业工控解决方案，赋能各行各业数字化转型
            </p>
            <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
              从智能制造到边缘计算，从汽车生产到物流仓储，研响科技工控设备广泛应用于各个工业领域，
              为客户提供稳定可靠的计算平台，助力企业实现智能化升级。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">应用领域</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              覆盖多个工业领域，为不同行业提供专业的工控解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-dark-800 mb-3">{industry.title}</h3>
                    <p className="text-gray-600 mb-4">{industry.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-dark-800 mb-2">主要功能</h4>
                      <ul className="space-y-1">
                        {industry.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-dark-800 mb-2">核心优势</h4>
                      <ul className="space-y-1">
                        {industry.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4 text-accent-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {industry.title === '能源电力' ? (
                      <Link
                        to="/energy-power-solutions"
                        className="block w-full bg-accent-600 hover:bg-accent-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                      >
                        了解更多
                      </Link>
                    ) : industry.title === '机器视觉' ? (
                      <Link
                        to="/machine-vision-solutions"
                        className="block w-full bg-accent-600 hover:bg-accent-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                      >
                        了解更多
                      </Link>
                    ) : industry.title === '边缘计算' ? (
                      <Link
                        to="/edge-computing-solutions"
                        className="block w-full bg-accent-600 hover:bg-accent-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center"
                      >
                        了解更多
                      </Link>
                    ) : (
                      <button className="w-full bg-accent-600 hover:bg-accent-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        了解更多
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">成功案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              真实案例见证我们的专业实力和技术优势
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-accent-600 to-accent-700 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
                    {caseStudy.industry}
                  </div>
                  <h3 className="text-2xl font-bold text-dark-800 mb-4">{caseStudy.title}</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-dark-800 mb-2">面临挑战</h4>
                    <p className="text-gray-600">{caseStudy.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-dark-800 mb-2">解决方案</h4>
                    <p className="text-gray-600">{caseStudy.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-dark-800 mb-3">实施效果</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {caseStudy.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">为什么选择我们</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的技术实力和丰富的行业经验，为您提供最优质的工控解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-800 mb-2">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-12 text-white"
          >
            <h2 className="text-4xl font-bold mb-4">开启您的智能化之旅</h2>
            <p className="text-xl mb-8 text-accent-100">
              无论您处于哪个行业，我们都能为您提供专业的工控解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/sample-request"
                className="inline-flex items-center px-8 py-3 bg-white text-accent-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                申请样品
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-accent-600 transition-colors duration-200"
              >
                联系我们
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Applications;