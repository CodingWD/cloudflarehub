import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const siteMap = {
    '产品中心': [
      { name: '可扩展嵌入式系列', href: '/products/expandable-embedded' },
      { name: '工业一体机', href: '/products/all-in-one' },
      { name: '超紧凑迷你型', href: '/products/mini' },
      { name: '定制化服务', href: '/custom-service' },
    ],
    '解决方案': [
      { name: '智能制造', href: '/applications/smart-manufacturing' },
      { name: '自动化控制', href: '/applications/automation' },
      { name: '机器视觉', href: '/applications/machine-vision' },
      { name: '边缘计算', href: '/applications/edge-computing' },
    ],
    '服务支持': [
      { name: '技术支持', href: '/support/technical' },
      { name: '下载专区', href: '/downloads' },
      { name: '样品申请', href: '/sample-request' },
      { name: '售后服务', href: '/support/after-sales' },
    ],
    '关于我们': [
      { name: '公司简介', href: '/about' },
      { name: '新闻动态', href: '/news' },
      { name: '联系我们', href: '/contact' },
      { name: '招聘信息', href: '/careers' },
    ],
  };

  const contactInfo = [
    {
      icon: Phone,
      label: '销售热线',
      value: '0755-8888-9999',
      href: 'tel:0755-8888-9999',
    },
    {
      icon: Phone,
      label: '技术支持',
      value: '0755-8888-8888',
      href: 'tel:0755-8888-8888',
    },
    {
      icon: Mail,
      label: '邮箱',
      value: 'info@futurerobottech.com',
      href: 'mailto:info@futurerobottech.com',
    },
    {
      icon: MapPin,
      label: '地址',
      value: '深圳市南山区科技园南区R2-A栋',
      href: '#',
    },
    {
      icon: Clock,
      label: '工作时间',
      value: '周一至周五 9:00-18:00',
      href: '#',
    },
  ];

  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Site Map */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-6 text-accent-400">网站地图</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(siteMap).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-medium mb-3 text-white">{category}</h4>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-accent-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Company Info & Contact */}
          <div className="lg:col-span-2">
            {/* Company Logo & Info */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">研</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">研响科技</h3>
                  <p className="text-sm text-gray-400">深圳市研响科技有限公司</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                专业从事工业控制设备研发、生产和销售的高新技术企业，
                致力于为客户提供高质量、高可靠性的工控解决方案。
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-medium mb-4 text-accent-400">联系方式</h4>
              <div className="space-y-3">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <IconComponent className="w-4 h-4 text-accent-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="text-gray-400">{item.label}：</span>
                        {item.href !== '#' ? (
                          <a
                            href={item.href}
                            className="text-white hover:text-accent-400 transition-colors duration-200"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-white">{item.value}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>Copyright © 深圳市研响科技有限公司 All Rights Reserved</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-accent-400 transition-colors duration-200">
                隐私政策
              </Link>
              <Link to="/terms" className="hover:text-accent-400 transition-colors duration-200">
                使用条款
              </Link>
              <span>粤ICP备XXXXXXXX号</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;