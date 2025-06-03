import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Cloud, 
  Wifi, 
  Database, 
  Shield, 
  Monitor, 
  Settings, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  Clock,
  Users,
  Award,
  Server,
  Layers,
  HardDrive,
  Zap,
  Brain,
  Network,
  Eye
} from 'lucide-react';

const EdgeComputingSolutions: React.FC = () => {
  // 边缘计算设计理念
  const designPhilosophies = [
    {
      title: '分布式架构',
      description: '采用分布式边缘节点部署，就近处理数据，降低网络延迟和带宽消耗。',
      icon: Network
    },
    {
      title: '智能化处理',
      description: '集成AI推理引擎，支持本地智能决策，减少对云端依赖，提升响应速度。',
      icon: Brain
    },
    {
      title: '云边协同',
      description: '实现云端与边缘的无缝协同，数据本地处理，模型云端训练，最优资源配置。',
      icon: Cloud
    },
    {
      title: '安全可靠',
      description: '内置多重安全防护机制，支持数据加密传输，确保边缘计算环境安全可控。',
      icon: Shield
    }
  ];

  // 边缘计算产品方案特点
  const productFeatures = [
    '搭载高性能AI推理芯片，支持TensorFlow、PyTorch等主流深度学习框架。',
    '集成多种通信接口：5G/4G、WiFi6、以太网，支持多网融合和网络冗余。',
    '提供丰富的I/O接口：USB3.0、HDMI、串口、GPIO，满足各类设备连接需求。',
    '支持容器化部署，兼容Docker、Kubernetes，简化应用部署和管理。',
    '宽温工作范围-40°C~+70°C，IP65防护等级，适应恶劣工业环境。'
  ];
  
  const solutions = [
    {
      title: '智能制造边缘',
      description: '为工厂车间提供实时数据处理和智能决策能力',
      icon: Settings,
      image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=800&h=600&fit=crop',
      features: [
        '设备状态实时监控',
        '预测性维护分析',
        '质量检测与控制',
        '生产优化调度'
      ],
      benefits: [
        '设备故障率降低60%',
        '生产效率提升35%',
        '质量合格率达99.5%',
        '能耗降低20%'
      ]
    },
    {
      title: '智慧城市边缘',
      description: '构建城市级边缘计算网络，支撑智慧城市应用',
      icon: Monitor,
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
      features: [
        '交通流量分析',
        '视频智能分析',
        '环境监测预警',
        '公共安全管控'
      ],
      benefits: [
        '交通拥堵减少30%',
        '事件响应时间缩短50%',
        '能源消耗降低25%',
        '市民满意度提升40%'
      ]
    },
    {
      title: '自动驾驶边缘',
      description: '为自动驾驶车辆提供低延迟计算支持',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      features: [
        '实时路况分析',
        '车辆协同控制',
        '安全预警系统',
        '路径优化规划'
      ],
      benefits: [
        '反应时间<10ms',
        '安全性提升80%',
        '燃油效率提升15%',
        '交通事故减少70%'
      ]
    },
    {
      title: '零售边缘计算',
      description: '为新零售场景提供智能化边缘计算解决方案',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      features: [
        '客流分析统计',
        '商品识别结算',
        '库存智能管理',
        '个性化推荐'
      ],
      benefits: [
        '客户体验提升50%',
        '运营效率提升40%',
        '库存周转率提升30%',
        '人工成本降低60%'
      ]
    }
  ];

  const caseStudies = [
    {
      title: '某大型制造企业智能工厂项目',
      location: '华东地区',
      scale: '覆盖5个生产车间',
      challenge: '传统集中式数据处理延迟高，无法满足实时控制需求，设备故障预测准确率低',
      solution: '部署边缘计算节点，实现设备数据就近处理和AI智能分析',
      results: [
        '数据处理延迟降低90%',
        '设备故障预测准确率95%',
        '生产效率提升40%',
        '运维成本降低50%'
      ],
      image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=600&h=400&fit=crop'
    },
    {
      title: '智慧园区边缘计算平台',
      location: '华南地区',
      scale: '覆盖200万平方米园区',
      challenge: '园区设备众多，数据传输带宽不足，云端处理成本高昂',
      solution: '构建分布式边缘计算网络，实现园区智能化管理',
      results: [
        '网络带宽节省70%',
        '响应时间缩短至毫秒级',
        '运营成本降低40%',
        '能耗优化30%'
      ],
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop'
    },
    {
      title: '智能物流配送中心',
      location: '华北地区',
      scale: '日处理订单50万件',
      challenge: '订单处理速度慢，分拣错误率高，无法实现智能调度',
      solution: '部署边缘AI计算平台，实现智能分拣和路径优化',
      results: [
        '分拣效率提升60%',
        '错误率降低至0.01%',
        '配送时效提升35%',
        '人工成本节省45%'
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop'
    }
  ];

  const advantages = [
    {
      icon: Zap,
      title: '超低延迟',
      description: '毫秒级响应时间，满足实时应用对延迟的严格要求'
    },
    {
      icon: Database,
      title: '本地处理',
      description: '数据就近处理，减少网络传输，提高处理效率和数据安全性'
    },
    {
      icon: Brain,
      title: 'AI加速',
      description: '内置AI推理引擎，支持深度学习模型本地部署和推理'
    },
    {
      icon: Users,
      title: '专业服务',
      description: '边缘计算专家团队，提供从规划到运维的全方位技术支持'
    }
  ];

  const specifications = [
    {
      category: '计算性能',
      items: [
        'CPU：Intel Core i7/i5 或 ARM Cortex-A78',
        'GPU：NVIDIA RTX系列或集成显卡',
        '内存：8GB-64GB DDR4',
        '存储：256GB-2TB NVMe SSD'
      ]
    },
    {
      category: '通信接口',
      items: [
        '以太网：2-8个千兆网口',
        '无线：5G/4G/WiFi6/蓝牙',
        'I/O：USB3.0、HDMI、串口',
        '扩展：PCIe、M.2插槽'
      ]
    },
    {
      category: '环境适应',
      items: [
        '工作温度：-40°C ~ +70°C',
        '防护等级：IP65',
        '抗震等级：IEC 60068-2-6',
        '电源：DC 12V-48V宽电压'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center mb-6">
              <Cpu className="w-16 h-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">边缘计算解决方案</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              为边缘场景提供高性能计算平台和智能化解决方案
            </p>
            <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              专注于边缘计算技术创新，提供从硬件到软件的完整解决方案，
              助力企业实现数据就近处理、智能决策和实时响应。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200"
              >
                联系我们
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 边缘计算设计理念 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">边缘计算设计理念</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              创新的边缘计算架构，为各行业提供智能化计算支持
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designPhilosophies.map((philosophy, index) => {
              const IconComponent = philosophy.icon;
              return (
                <motion.div
                  key={philosophy.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-accent-50 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-accent-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-2">{philosophy.title}</h3>
                  <p className="text-gray-600">{philosophy.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 边缘计算产品方案 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">边缘计算产品方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专为边缘计算场景设计的高性能主机，满足各类应用场景需求
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden p-8"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-dark-800 mb-4">TP-EDGE 边缘计算专用主机</h3>
                  <p className="text-gray-600 mb-6">
                    专为边缘计算场景设计的高性能主机，集成AI推理芯片，支持多种通信协议。
                    采用工业级设计，确保在复杂环境下的稳定运行，满足边缘计算各环节的数据处理和智能决策需求。
                  </p>
                </div>
                
                <div className="space-y-3">
                  {productFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-1">
                    <div className="bg-white rounded-xl p-4">
                      <img 
                        src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop" 
                        alt="边缘计算主机产品" 
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    边缘计算专用型
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">核心解决方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              覆盖边缘计算各个应用场景，提供全方位的技术支持
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={solution.image}
                      alt={solution.title}
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
                    <h3 className="text-xl font-semibold text-dark-800 mb-3">{solution.title}</h3>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-dark-800 mb-2">主要功能</h4>
                      <ul className="space-y-1">
                        {solution.features.map((feature, featureIndex) => (
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
                        {solution.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4 text-accent-500 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Case Studies */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">成功案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              在边缘计算领域的丰富实践经验，为客户创造显著价值
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
                    {caseStudy.location} · {caseStudy.scale}
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
      </section> */}

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">核心优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的边缘计算技术，为您提供最优质的解决方案
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

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">技术规格</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              严格按照行业标准设计，确保产品可靠性和兼容性
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specifications.map((spec, index) => (
              <motion.div
                key={spec.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-dark-800 mb-4">{spec.category}</h3>
                <ul className="space-y-2">
                  {spec.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">携手共建智能边缘未来</h2>
            <p className="text-xl mb-8 text-accent-100">
              让我们为您的边缘计算应用提供最专业的解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                to="/sample-request"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-accent-600 transition-colors duration-200"
              >
                申请样品
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
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

export default EdgeComputingSolutions;