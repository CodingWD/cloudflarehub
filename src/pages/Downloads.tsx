import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image, Video, Archive, Search, Filter, Calendar, Eye, ExternalLink } from 'lucide-react';

interface DownloadItem {
  id: number;
  title: string;
  description: string;
  fileType: 'pdf' | 'image' | 'video' | 'archive' | 'document';
  category: string;
  version: string;
  size: string;
  downloadUrl: string;
  previewUrl?: string;
  uploadDate: string;
  downloadCount: number;
}

const Downloads: React.FC = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFileType, setSelectedFileType] = useState('');

  // 模拟下载数据
  useEffect(() => {
    const mockDownloads: DownloadItem[] = [
      {
        id: 1,
        title: 'YX-IPC-3000 产品规格书',
        description: '详细的技术规格和参数说明，包含接口定义、性能指标等',
        fileType: 'pdf',
        category: '产品规格书',
        version: 'v2.1',
        size: '2.3 MB',
        downloadUrl: '/downloads/yx-ipc-3000-specs.pdf',
        previewUrl: '/preview/yx-ipc-3000-specs',
        uploadDate: '2024-01-15',
        downloadCount: 1250
      },
      {
        id: 2,
        title: 'YX-IPC-5000 安装指南',
        description: '完整的安装步骤和配置说明，适用于工程师和技术人员',
        fileType: 'pdf',
        category: '安装指南',
        version: 'v1.8',
        size: '4.7 MB',
        downloadUrl: '/downloads/yx-ipc-5000-install.pdf',
        uploadDate: '2024-01-10',
        downloadCount: 890
      },
      {
        id: 3,
        title: '工控机选型指南',
        description: '帮助客户根据应用场景选择合适的工控机产品',
        fileType: 'pdf',
        category: '选型指南',
        version: 'v3.0',
        size: '1.8 MB',
        downloadUrl: '/downloads/selection-guide.pdf',
        uploadDate: '2024-01-08',
        downloadCount: 2100
      },
      {
        id: 4,
        title: '产品宣传册',
        description: '公司全系列产品介绍和应用案例展示',
        fileType: 'pdf',
        category: '宣传资料',
        version: 'v2024.1',
        size: '8.5 MB',
        downloadUrl: '/downloads/product-brochure.pdf',
        uploadDate: '2024-01-05',
        downloadCount: 3200
      },
      {
        id: 5,
        title: 'CAD 设计图纸包',
        description: '包含主要产品的CAD设计图纸，支持二次开发',
        fileType: 'archive',
        category: '设计资料',
        version: 'v1.5',
        size: '15.2 MB',
        downloadUrl: '/downloads/cad-drawings.zip',
        uploadDate: '2024-01-03',
        downloadCount: 560
      },
      {
        id: 6,
        title: '产品演示视频',
        description: '工控机产品功能演示和应用场景介绍视频',
        fileType: 'video',
        category: '演示视频',
        version: 'v1.0',
        size: '125 MB',
        downloadUrl: '/downloads/product-demo.mp4',
        previewUrl: '/preview/product-demo',
        uploadDate: '2023-12-28',
        downloadCount: 780
      },
      {
        id: 7,
        title: '驱动程序包',
        description: '适用于Windows和Linux系统的驱动程序',
        fileType: 'archive',
        category: '驱动程序',
        version: 'v4.2.1',
        size: '45.8 MB',
        downloadUrl: '/downloads/drivers.zip',
        uploadDate: '2023-12-25',
        downloadCount: 1890
      },
      {
        id: 8,
        title: '质量认证证书',
        description: 'ISO9001、CE、FCC等质量认证证书',
        fileType: 'pdf',
        category: '认证证书',
        version: 'v2023',
        size: '3.2 MB',
        downloadUrl: '/downloads/certificates.pdf',
        uploadDate: '2023-12-20',
        downloadCount: 450
      }
    ];

    // 模拟API调用延迟
    setTimeout(() => {
      setDownloads(mockDownloads);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = ['全部', '产品规格书', '安装指南', '选型指南', '宣传资料', '设计资料', '演示视频', '驱动程序', '认证证书'];
  const fileTypes = ['全部', 'pdf', 'image', 'video', 'archive', 'document'];

  const filteredDownloads = downloads.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === '全部' || 
                           item.category === selectedCategory;
    const matchesFileType = selectedFileType === '' || selectedFileType === '全部' || 
                           item.fileType === selectedFileType;
    return matchesSearch && matchesCategory && matchesFileType;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'document':
        return <FileText className="w-8 h-8" />;
      case 'image':
        return <Image className="w-8 h-8" />;
      case 'video':
        return <Video className="w-8 h-8" />;
      case 'archive':
        return <Archive className="w-8 h-8" />;
      default:
        return <FileText className="w-8 h-8" />;
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'document':
        return 'text-red-600 bg-red-50';
      case 'image':
        return 'text-green-600 bg-green-50';
      case 'video':
        return 'text-purple-600 bg-purple-50';
      case 'archive':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDownloadCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handleDownload = (item: DownloadItem) => {
    // 模拟下载
    console.log('下载文件:', item.title);
    // 在实际应用中，这里会触发文件下载
    // window.open(item.downloadUrl, '_blank');
  };

  const handlePreview = (item: DownloadItem) => {
    if (item.previewUrl) {
      console.log('预览文件:', item.title);
      // 在实际应用中，这里会打开预览窗口
      // window.open(item.previewUrl, '_blank');
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark-800 to-dark-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">下载专区</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              获取产品规格书、安装指南、驱动程序等技术资料
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索文件..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category === '全部' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                {fileTypes.map((type) => (
                  <option key={type} value={type === '全部' ? '' : type}>
                    {type === '全部' ? '全部类型' : type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            找到 {filteredDownloads.length} 个文件
            {selectedCategory && selectedCategory !== '全部' && (
              <span className="ml-2">· 分类: {selectedCategory}</span>
            )}
            {selectedFileType && selectedFileType !== '全部' && (
              <span className="ml-2">· 类型: {selectedFileType.toUpperCase()}</span>
            )}
          </div>
        </div>
      </section>

      {/* Downloads List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDownloads.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">未找到相关文件</h3>
              <p className="text-gray-500">请尝试调整搜索条件或选择其他分类</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredDownloads.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-center p-6">
                    {/* File Icon */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center ${getFileTypeColor(item.fileType)}`}>
                      {getFileIcon(item.fileType)}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 ml-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-dark-800 mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-3">{item.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center">
                              <span className="font-medium">版本:</span>
                              <span className="ml-1">{item.version}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">大小:</span>
                              <span className="ml-1">{item.size}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(item.uploadDate)}
                            </div>
                            <div className="flex items-center">
                              <Download className="w-4 h-4 mr-1" />
                              {formatDownloadCount(item.downloadCount)} 次下载
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 ml-6">
                          {item.previewUrl && (
                            <button
                              onClick={() => handlePreview(item)}
                              className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              预览
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDownload(item)}
                            className="flex items-center px-6 py-2 bg-accent-600 text-white font-medium rounded-lg hover:bg-accent-700 transition-colors duration-200"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            下载
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Download Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-800 mb-4">下载统计</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们提供丰富的技术资料，帮助您更好地了解和使用我们的产品
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '总下载量', value: '12.5k+', icon: Download },
              { label: '文件数量', value: downloads.length.toString(), icon: FileText },
              { label: '用户数量', value: '3.2k+', icon: ExternalLink },
              { label: '更新频率', value: '每周', icon: Calendar }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-accent-600" />
                </div>
                <div className="text-3xl font-bold text-dark-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-dark-800 mb-4">需要帮助？</h2>
            <p className="text-xl text-gray-600 mb-8">
              如果您找不到所需的文件或有任何技术问题，请联系我们的技术支持团队
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-accent-600 text-white font-medium rounded-lg hover:bg-accent-700 transition-colors duration-200">
                联系技术支持
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
                提交反馈
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;