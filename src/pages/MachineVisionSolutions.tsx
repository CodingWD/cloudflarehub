import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Camera, 
  Cpu, 
  Zap, 
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
  Network,
  Wifi,
  Power
} from 'lucide-react';

const MachineVisionSolutions: React.FC = () => {
  // 行业痛点
  const industryPainPoints = [
    {
      title: '检测效率低下',
      description: '产品面积大产能高，人工无法做到每张都检测，存在漏检风险。',
      icon: Clock
    },
    {
      title: '数据缺乏统计',
      description: '缺陷出现的位置、类型无法统计归纳分析，无法做到数字化。',
      icon: TrendingUp
    },
    {
      title: '缺陷识别复杂',
      description: '不同缺陷的种类复杂，类间差异大，类间模糊性大，背景复杂。',
      icon: AlertTriangle
    }
  ];

  // 方案设计特点
  const solutionDesign = [
    '采用高性能Intel Core SOC高性能处理器，确保图像处理和算法计算的高效运行。',
    '配备大容量高速工业内存，保障大规模采集时图像数据的缓存和处理。',
    '选用工业级高速固态硬盘，提供快速的数据读写，确保高帧率图像采集响应迅速。',
    '提供丰富的扩展接口，支持扩展4G/5G/WiFi模组用于网络通讯。',
    '支持DC 9-36V宽电压供电，抗电流干扰能力极强，提供2pin供电端子。'
  ];

  // 产品方案特点
  const productFeatures = [
    '提供6路Intel千兆网口，其中4路更是支持POE，免去相机供电之忧，实现一站采集。',
    '集成4路光源控制器，支持软件触发/硬件触发，支持12V/24V宽电压切换。',
    '集成8路高速GPIO（0-5V），毫秒级响应，可选配8/15路DIO，支持12V/24V开关量。',
    '提供丰富扩展接口，易于扩展4G/5G/WiFi通讯模组，支持SIM卡及物联网卡。',
    '支持 DC 9-36V 宽电压，抗电流干扰极强，兼容设备电压，提供端子供电头。'
  ];

  // 光源模组特点
  const lightingFeatures = [
    'PCB集成4路光源控制器，支持软件触发和硬件触发（硬件触发电压5-24V）。',
    '支持12V/24V的宽电压切换，可以适应不同环境下的检测需求（请勿带电切换）。',
    '光源控制器采用工业级标准，确保工作稳定，在高速生产线上也能实时捕获图像。',
    '支持电源输入TVS保护、浪涌保护、静电保护、反接保护、短路保护等。'
  ];

  // 执行标准
  const certifications = [
    {
      title: 'ISO 9001认证',
      description: '通过质量管理体系认证，确保产品质量管理体系的有效实施。',
      icon: Award
    },
    {
      title: '节能产品认证',
      description: '通过节能环保要求，符合国家节能、低碳产品标准。',
      icon: Zap
    },
    {
      title: 'CCC认证',
      description: '通过中国强制性产品认证，符合特定的安全、环保和性能标准。',
      icon: Shield
    },
    {
      title: 'CE认证',
      description: '通过CE认证，符合欧盟安全、健康和环保标准，满足安全性要求。',
      icon: Shield
    },
    {
      title: 'EMC电磁兼容性',
      description: '通过EMC电磁兼容性认证标准，适应各类严苛工业环境要求。',
      icon: Network
    },
    {
      title: 'FCC认证',
      description: '符合FCC电磁兼容性和电气安全性，严格遵循FCC 2.906、2.908、2.909。',
      icon: Wifi
    },
    {
      title: 'RoHS认证',
      description: '符合RoHS环保认证要求，符合欧盟强制性标准。',
      icon: Layers
    }
  ];

  const solutions = [
    {
      title: '表面缺陷检测',
      description: '高精度检测产品表面划痕、污渍、凹陷等各类缺陷',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      features: [
        '高分辨率图像采集',
        '智能缺陷识别算法',
        '实时检测与分析',
        '多种缺陷类型识别'
      ],
      benefits: [
        '检测精度达99.9%',
        '检测速度提升10倍',
        '漏检率降低至0.01%',
        '人工成本节省70%'
      ]
    },
    {
      title: '尺寸测量检测',
      description: '精确测量产品尺寸，确保产品符合质量标准',
      icon: Monitor,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      features: [
        '亚像素级测量精度',
        '多维度尺寸检测',
        '实时数据记录',
        '统计分析报告'
      ],
      benefits: [
        '测量精度±0.01mm',
        '检测效率提升5倍',
        '减少废品率50%',
        '提升产品一致性'
      ]
    },
    {
      title: '字符识别检测',
      description: '准确识别产品上的文字、数字、条码等信息',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=800&h=600&fit=crop',
      features: [
        'OCR字符识别',
        '条码二维码识别',
        '多语言支持',
        '模糊字符处理'
      ],
      benefits: [
        '识别准确率99.8%',
        '处理速度毫秒级',
        '支持多种字体',
        '降低人工成本'
      ]
    },
    {
      title: '装配检测',
      description: '检测产品装配是否正确，确保产品质量',
      icon: Settings,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      features: [
        '零件位置检测',
        '装配完整性检查',
        '角度偏差测量',
        '缺件漏件检测'
      ],
      benefits: [
        '装配合格率99.5%',
        '检测速度快',
        '减少返工率',
        '提升生产效率'
      ]
    }
  ];

  const caseStudies = [
    {
      title: '某知名电子制造商PCB缺陷检测项目',
      industry: '电子制造',
      location: '深圳',
      challenge: '传统人工检测PCB板缺陷效率低下，漏检率高，检测标准不统一',
      solution: '部署高性能机器视觉检测系统，实现PCB板自动化质量控制',
      results: [
        '检测速度提升15倍',
        '漏检率降低至0.005%',
        '检测标准完全统一',
        '人工成本节省80%'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'
    },
    {
      title: '汽车零部件表面质量检测系统',
      industry: '汽车制造',
      location: '上海',
      challenge: '汽车零部件表面缺陷种类多样，人工检测难以保证一致性和准确性',
      solution: '采用多光源机器视觉系统，实现多角度全方位检测',
      results: [
        '缺陷检出率达99.9%',
        '检测效率提升8倍',
        '质量稳定性大幅提升',
        '客户满意度显著提高'
      ],
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
    },
    {
      title: '食品包装质量检测解决方案',
      industry: '食品包装',
      location: '广州',
      challenge: '食品包装标签贴附质量、封口完整性检测依赖人工，效率低且易出错',
      solution: '部署智能视觉检测系统，实现包装质量全自动检测',
      results: [
        '包装合格率提升至99.8%',
        '检测速度提升12倍',
        '减少客户投诉90%',
        '生产效率大幅提升'
      ],
      image: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=600&h=400&fit=crop'
    }
  ];

  const advantages = [
    {
      icon: TrendingUp,
      title: '高效精准',
      description: '毫秒级检测响应，检测精度达到99.9%以上'
    },
    {
      icon: Shield,
      title: '稳定可靠',
      description: '工业级设计，7x24小时连续稳定运行'
    },
    {
      icon: Cpu,
      title: '智能算法',
      description: '先进的图像处理算法，适应复杂检测场景'
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
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">机器视觉缺陷检测解决方案</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              高性能视觉检测系统，确保产品质量，提升生产效率
            </p>
            <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
              机器视觉系统可以通过高分辨率的图像采集和智能算法分析，实现对产品表面的快速检测和缺陷识别。
              针对不同行业的生产线，工控机在机器视觉缺陷检测方面扮演着关键角色，提供稳定、高效的硬件支持。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 设计理念 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">设计理念</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              基于机器视觉技术的核心原则，为您提供专业的视觉检测解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-800 mb-3">高精度检测</h3>
              <p className="text-gray-600">采用高分辨率图像采集技术，实现亚像素级检测精度，确保产品质量控制的准确性</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-800 mb-3">实时处理</h3>
              <p className="text-gray-600">毫秒级图像处理响应，支持高速生产线的实时检测需求，提升生产效率</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-800 mb-3">智能算法</h3>
              <p className="text-gray-600">集成先进的图像处理算法和AI技术，适应复杂检测场景，提高识别准确率</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-dark-800 mb-3">稳定可靠</h3>
              <p className="text-gray-600">工业级硬件设计，确保7×24小时连续稳定运行，适应各种恶劣工业环境</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 行业痛点 */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">行业痛点</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              传统检测方式面临的挑战和问题
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industryPainPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 rounded-xl"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-800 mb-3">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* 解决方案详情 */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">解决方案详情</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的机器视觉检测解决方案，满足各种检测需求
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
                    
                    <div>
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

      {/* 方案设计 */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-dark-800 mb-6">方案设计</h2>
              <p className="text-lg text-gray-600 mb-8">
                采用高性能硬件配置，确保机器视觉系统的稳定运行和高效处理
              </p>
              <ul className="space-y-4">
                {solutionDesign.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop"
                alt="方案设计"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-accent-600 to-accent-700 text-white px-6 py-3 rounded-lg shadow-lg">
                <span className="font-semibold">高性能处理器</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* 应用场景 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">应用场景</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              广泛应用于各个行业的质量检测和自动化生产
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="h-40 bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                  <solution.icon className="w-12 h-12 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-dark-800 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{solution.description}</p>
                  <div className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 机器视觉产品方案 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">机器视觉产品方案</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专为机器视觉检测场景设计的高性能主机，满足各类视觉应用需求
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
                  <h3 className="text-2xl font-bold text-dark-800 mb-4">TP-VISION 机器视觉专用主机</h3>
                  <p className="text-gray-600 mb-6">
                    专为机器视觉检测场景设计的高性能主机，集成高速图像处理芯片，支持多路相机接入。
                    采用工业级设计，确保在复杂环境下的稳定运行，满足机器视觉各环节的图像采集和智能分析需求。
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
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop" 
                        alt="机器视觉主机产品" 
                        className="w-full h-auto rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    视觉检测专用型
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 光源模组 */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-dark-800 mb-6">光源模组</h2>
              <p className="text-lg text-gray-600 mb-8">
                专业的光源控制系统，确保图像采集的稳定性和一致性
              </p>
              <ul className="space-y-4">
                {lightingFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=600&h=400&fit=crop"
                alt="光源模组"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-3 rounded-lg shadow-lg">
                <span className="font-semibold">4路光源控制器</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* 成功案例 */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">成功案例</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              真实案例见证我们在机器视觉领域的专业实力
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
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-r from-accent-600 to-accent-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {caseStudy.industry}
                    </div>
                    <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                      {caseStudy.location}
                    </div>
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

      {/* 执行标准 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">执行标准</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              严格遵循国际标准，确保产品质量和可靠性
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-dark-800 mb-2 text-sm">{cert.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{cert.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-800 mb-4">核心优势</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的技术实力和丰富的行业经验，为您提供最优质的机器视觉解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-800 mb-2">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl p-12 text-white"
          >
            <h2 className="text-4xl font-bold mb-4">开启智能检测新时代</h2>
            <p className="text-xl mb-8 text-accent-100">
              让机器视觉技术为您的生产质量保驾护航
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

export default MachineVisionSolutions;