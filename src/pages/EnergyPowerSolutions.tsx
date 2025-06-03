import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Battery, 
  Wind, 
  Sun, 
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
  Cpu,
  Server,
  Layers,
  HardDrive
} from 'lucide-react';

const EnergyPowerSolutions: React.FC = () => {
  // 添加工业主机设计理念
  const designPhilosophies = [
    {
      title: '标准化设计',
      description: '标准产品可以满足绝大多数项目场景应用需求，也可针对性轻定制。',
      icon: Layers
    },
    {
      title: '针对性设计',
      description: '支持根据具体应用场景进行客制化硬件配置，支持OEM/ODM定制。',
      icon: Settings
    },
    {
      title: '模块化设计',
      description: '模块化无线缆的设计大幅提高稳定性，便于与升级，减少后期维护。',
      icon: Server
    },
    {
      title: '高质量组件',
      description: '所有部位及元器件均使用工业级硬件，包括工业主板/内存/硬盘等。',
      icon: HardDrive
    }
  ];

  // 添加工业主机产品方案特点
  const productFeatures = [
    '集成10路串行端口（6x3pin凤凰端子+4*DB9 串口），支持数字电容隔离。',
    '集成2路CAN Bus模组，支持CAN2.0B协议，支持标准帧/扩展帧/数据帧/远程帧。',
    '集成8路高速DIO接口，支持开关量输入输出，支持过2A电流，可选配为15路DIO。',
    '提供丰富扩展接口，易于扩展4G/5G/WiFi通讯模组，支持SIM卡及物联网卡。',
    '支持 DC 9-36V 宽电压，抗电流干扰极强，适应各类严苛工业供电场景。'
  ];
  
  const solutions = [
    {
      title: '电网监控系统',
      description: '实时监控电网运行状态，确保电力系统安全稳定运行',
      icon: Monitor,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
      features: [
        '实时数据采集与监控',
        '故障预警与诊断',
        '负荷预测与优化',
        '远程控制与调度'
      ],
      benefits: [
        '提高电网可靠性99.9%',
        '减少停电时间50%',
        '降低运维成本30%',
        '提升调度效率40%'
      ]
    },
    {
      title: '变电站自动化',
      description: '智能化变电站控制系统，实现无人值守运行',
      icon: Settings,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      features: [
        '自动化保护控制',
        '设备状态监测',
        '操作票管理',
        '事故录波分析'
      ],
      benefits: [
        '实现无人值守',
        '提高操作安全性',
        '降低人工成本',
        '快速故障定位'
      ]
    },
    {
      title: '新能源接入',
      description: '支持风电、光伏等新能源的并网控制和管理',
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop',
      features: [
        '新能源功率预测',
        '并网控制管理',
        '储能系统集成',
        '电能质量治理'
      ],
      benefits: [
        '提高新能源利用率',
        '保障电网稳定',
        '优化能源配置',
        '减少碳排放'
      ]
    },
    {
      title: '智能配电网',
      description: '构建智能化配电网络，提升供电质量和效率',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      features: [
        '配电自动化',
        '故障自愈功能',
        '负荷均衡控制',
        '电能质量监测'
      ],
      benefits: [
        '提升供电可靠性',
        '缩短故障恢复时间',
        '优化电网结构',
        '降低线损率'
      ]
    }
  ];

  const caseStudies = [
    {
      title: '国家电网某省级电力调度中心',
      location: '华东地区',
      scale: '覆盖全省电网',
      challenge: '传统调度系统响应慢，数据处理能力不足，难以应对复杂电网调度需求',
      solution: '部署研响科技高性能工控机群，构建新一代电力调度自动化系统',
      results: [
        '调度响应时间缩短至秒级',
        '数据处理能力提升10倍',
        '系统可靠性达到99.99%',
        '年节约运维成本500万元'
      ],
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop'
    },
    {
      title: '大型风电场集中监控系统',
      location: '西北地区',
      scale: '300MW风电场',
      challenge: '风电场分布广泛，设备监控困难，故障响应不及时',
      solution: '采用边缘计算工控机，建设分布式监控网络',
      results: [
        '实现24小时无人值守',
        '故障响应时间缩短70%',
        '发电效率提升15%',
        '运维人员减少60%'
      ],
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop'
    },
    {
      title: '城市智能配电网改造项目',
      location: '华南地区',
      scale: '覆盖200万用户',
      challenge: '配电网老化严重，停电频繁，用户投诉率高',
      solution: '全面部署智能配电终端，构建自愈型配电网',
      results: [
        '停电时间减少80%',
        '故障定位精度99%',
        '用户满意度提升至95%',
        '线损率降低12%'
      ],
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop'
    }
  ];

  const advantages = [
    {
      icon: Shield,
      title: '高可靠性',
      description: '工业级设计，支持7x24小时不间断运行，MTBF>50000小时'
    },
    {
      icon: TrendingUp,
      title: '高性能',
      description: '强大的计算能力，支持实时数据处理和复杂算法运算'
    },
    {
      icon: Clock,
      title: '实时响应',
      description: '毫秒级响应时间，满足电力系统对实时性的严格要求'
    },
    {
      icon: Users,
      title: '专业服务',
      description: '电力行业专家团队，提供从设计到运维的全生命周期服务'
    }
  ];

  const specifications = [
    {
      category: '环境适应性',
      items: [
        '工作温度：-40°C ~ +70°C',
        '存储温度：-40°C ~ +85°C',
        '相对湿度：5% ~ 95%（无凝露）',
        '抗震等级：IEC 60068-2-6'
      ]
    },
    {
      category: '电磁兼容',
      items: [
        '符合IEC 61000标准',
        '抗电磁干扰等级A',
        '浪涌保护：±4kV',
        '静电放电：±8kV接触/±15kV空气'
      ]
    },
    {
      category: '安全认证',
      items: [
        'CE认证',
        'FCC认证',
        'CCC认证',
        'ISO 9001质量管理体系'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop)'
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
              <Zap className="w-16 h-16 text-yellow-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold">能源电力解决方案</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              为电力系统提供稳定可靠的工业主机设备和监控控制解决方案
            </p>
            <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              专注于电力行业数字化转型，提供从发电到用电全链条的工控解决方案，
              助力构建安全、高效、绿色的现代电力系统。
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

      {/* 工业主机设计理念 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">工业主机设计理念</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的工业主机设计，为电力系统提供可靠的硬件支持
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

      {/* 工业主机产品方案 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">工业主机产品方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专为电力行业设计的高性能工业主机，满足各类应用场景需求
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
                  <h3 className="text-2xl font-bold text-dark-800 mb-4">TP-IPC 电力专用工业主机</h3>
                  <p className="text-gray-600 mb-6">
                    专为电力行业设计的高性能工业主机，采用工业级元器件，确保在恶劣环境下的稳定运行。
                    支持多种接口和协议，满足电力系统各环节的数据采集、处理和控制需求。
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
                        src="https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800&h=600&fit=crop" 
                        alt="工业主机产品" 
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    电力专用型
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
              覆盖电力系统各个环节，提供全方位的工控技术支持
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
              在电力行业的丰富实践经验，为客户创造显著价值
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

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">技术规格</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              严格按照电力行业标准设计，确保产品可靠性和兼容性
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

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">核心优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的电力行业解决方案，值得信赖的技术伙伴
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
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">携手共建智慧电力未来</h2>
            <p className="text-xl mb-8 text-accent-100">
              让我们为您的电力系统提供最专业的工控解决方案
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

export default EnergyPowerSolutions;