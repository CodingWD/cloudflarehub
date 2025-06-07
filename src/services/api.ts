import axios from 'axios';

// 云服务器地址
// 根据环境使用不同的BASE_URL
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // 生产环境使用相对路径，通过代理访问
  : 'http://aifafafa.xyz:1337';  // 开发环境也使用域名

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('发送API请求:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('API响应成功:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('API响应错误:', error.config?.url, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// 产品信息接口
export interface ProductInfo {
  id: number;     // 后台自带，访问不到
  documentId: string;   // 系统自带的
  createdAt: string;    // 系统自带，创建时间
  updatedAt: string;    // 系统自带，更新时间
  publishedAt: string;  // 发布时间，自带
  slug: string;   // UID
  product_name: string;  // 文本  产品名称
  short_description: string;   // 长文本 简要介绍，富文本
  full_description?: string;   // 富文本  宣传图+详细介绍
  features?: string;     // 富文本  规格书
  applications?: string;    // 富文本  应用场景
  faBuStatus: string;   // 列举  发布状态
  meta_title?: string;   // 自带 文本
  meta_description?: string;   // 文本
  order?: number;  // 数字
  // 添加新属性
  cpuLeiXing?: string;  // cpu类型 文本
  neiCun?: string;      // 内存 文本
  wangKa?: string;      // 网卡 文本
  xianShiJieKou?: string; // 显示接口 文本
  powerType?: string;   // 电源类型 文本
  operating_system?: string; // 操作系统 文本
  operating_temperature?: string; // 工作温度 文本
  product_category?: {
    id: number;  // 后台自带
    name: string;  // 文本
    documentId: string;  // 实际不存在此属性
  };
  image?: Array<{
    id: number;
    name: string;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  }>;
  downloads?: Array<{
    id: number;
    name: string;
    url: string;
    size?: number;
    mime?: string;
    ext?: string;
  }>;
  productImageUrl?: string; // 用于存储处理后的图片URL 
}

// 产品分类接口
export interface ProductCategory {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  level: number;
}

// 轮播图接口
export interface CarouselSlide {
  id: number;
  documentId: string;
  title: string;           // 轮播图标题
  description?: string;    // 描述文本
  subtitle?: string;       // 副标题或描述文本
  order: number;           // 显示顺序
  media_type: 'image' | 'video' | 'svg';  // 媒体类型
  cta?: {
    text?: string;         // 按钮文本
    type?: 'internal' | 'external' | 'anchor' | 'download';  // 链接类型
    link?: string;         // 链接地址
    style?: 'primary' | 'secondary' | 'outline';  // 按钮样式
  };
  cta_text?: string;       // 按钮文本（向后兼容）
  cta_type?: 'internal' | 'external' | 'anchor' | 'download';  // 链接类型（向后兼容）
  cta_link?: string;       // 链接地址（向后兼容）
  cta_style?: 'primary' | 'secondary' | 'outline';  // 按钮样式（向后兼容）
  is_active: boolean;      // 是否启用
  locale?: string;         // 语言代码
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: {
    id: number;
    name: string;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  video?: {
    id: number;
    name: string;
    url: string;
    mime: string;
    ext: string;
  };
  svg_code?: string;       // SVG代码
  // 处理后的URL
  imageUrl?: string;
  videoUrl?: string;
}

// 新闻文章接口
export interface NewsArticle {
  id: number;
  documentId: string;
  title: string;
  content: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  featured_image?: string;
  firstImageUrl?: string;
  fengmiantu?: {
    id: number;
    url: string;
    formats: {
      thumbnail: { url: string };
      small: { url: string };
      medium: { url: string };
      large: { url: string };
    };
  };
  jianjie?: string;
  faburiqi?: string;
  fenlei?: string;
  shifoufabu?: string;
}

// 下载中心项目接口
export interface DownloadCenterItem {
  id: number;
  documentId: string;
  title: string;           // 文件标题
  description: string;     // 文件描述
  slug: string;            // UID
  category: string;        // 文件分类
  version: string;         // 文件版本
  published_date: string;  // 发布日期
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  file?: {
    id: number;
    name: string;
    url: string;
    size: number;
    mime: string;
    ext: string;
  };
  fileUrl?: string;        // 处理后的文件URL
  fileSize?: string;       // 格式化后的文件大小
  fileType?: string;       // 文件类型（根据mime类型判断）
}

// 公司信息接口
export interface Company {
  id: number;
  documentId: string;
  name: string;            // 公司名称
  address: string;         // 公司地址
  email: string;           // 公司邮箱
  phone: string;           // 公司电话
  beiyongPhone?: string;   // 备用电话
  work_time?: string;      // 工作时间
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  video?: {
    id: number;
    name: string;
    url: string;
    mime: string;
    ext: string;
  };
  erWeima?: {
    id: number;
    name: string;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  logo?: {
    id: number;
    name: string;
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  videoUrl?: string;       // 处理后的视频URL
  erWeimaUrl?: string;     // 处理后的二维码URL
  logoUrl?: string;        // 处理后的logo URL
}

// API响应接口
export interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// API服务类
export class ApiService {
  // 获取产品信息
  // 获取产品信息
  static async getProductInfos(): Promise<ProductInfo[]> {
    try {
      const response = await api.get<ApiResponse<ProductInfo>>('/api/product-infos?populate=product_category&populate=image');

      // 处理每个产品，添加图片URL
      const products = response.data.data.map(product => {
        let productImageUrl: string | undefined = undefined;

        // 如果有图片，使用第一张图片的URL
        if (product.image && product.image.length > 0) {
          productImageUrl = `${BASE_URL}${product.image[0].url}`;
        }
        return {
          ...product,
          productImageUrl
        };
      });

      return products;
    } catch (error) {
      console.error('获取产品信息失败:', error);
      throw error;
    }
  }

  // 获取单个产品信息
  static async getProductInfo(slug: string): Promise<ProductInfo | null> {
    try {
      const response = await api.get<ApiResponse<ProductInfo>>(`/api/product-infos?filters[slug][$eq]=${slug}&populate=*`);
      const product = response.data.data[0] || null;

      // 处理图片URL
      if (product && product.image && product.image.length > 0) {
        product.productImageUrl = `${BASE_URL}${product.image[0].url}`;
      }

      return product;
    } catch (error) {
      console.error('获取产品详情失败:', error);
      throw error;
    }
  }

  // 获取产品分类
  static async getProductCategories(): Promise<ProductCategory[]> {
    try {
      const response = await api.get<ApiResponse<ProductCategory>>('/api/product-categories');
      return response.data.data;
    } catch (error) {
      console.error('获取产品分类失败:', error);
      throw error;
    }
  }

  // 获取新闻文章
  static async getNewsArticles(limit: number = 10): Promise<NewsArticle[]> {
    try {
      const response = await api.get<ApiResponse<NewsArticle>>(`/api/news-articles?pagination[limit]=${limit}&sort=publishedAt:desc&populate=fengmiantu`);

      // 处理每篇文章，优先使用fengmiantu字段，如果没有则提取第一张图片URL
      const articles = response.data.data.map(article => {
        let firstImageUrl: string | undefined = undefined;

        // 优先使用fengmiantu字段
        if (article.fengmiantu && article.fengmiantu.url) {
          firstImageUrl = `${BASE_URL}${article.fengmiantu.url}`;
        } else {
          // 如果没有fengmiantu，则尝试从内容中提取图片
          // 使用更强大的正则表达式匹配多种格式的图片
          const imageMatch = article.content.match(/!\[(.*?)\]\((http[^)]+)\)|<img[^>]+src=["'](http[^"']+)["']|http[s]?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)/i);
          if (imageMatch) {
            // 根据匹配的格式提取URL
            const imgUrl = imageMatch[2] || imageMatch[3] || imageMatch[0];
            // 将localhost替换为实际的服务器地址
            firstImageUrl = imgUrl.replace('http://localhost:1337', BASE_URL);
          }
        }

        return {
          ...article,
          firstImageUrl
        };
      });

      return articles;
    } catch (error) {
      console.error('获取新闻文章失败:', error);
      // 返回模拟数据作为后备
      return [
        {
          id: 1,
          documentId: 'mock1',
          title: '研响科技发布新一代工控机产品',
          content: '集成最新AI芯片，性能提升30%，功耗降低20%',
          publishedAt: '2024-01-15',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          excerpt: '集成最新AI芯片，性能提升30%，功耗降低20%，适用于智能制造、自动化控制等多个领域',
          firstImageUrl: undefined
        },
        {
          id: 2,
          documentId: 'mock2',
          title: '技术创新：边缘计算解决方案突破',
          content: '自主研发的边缘计算平台正式商用',
          publishedAt: '2024-01-10',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-10',
          excerpt: '自主研发的边缘计算平台正式商用，为工业4.0提供强有力的技术支撑',
          firstImageUrl: undefined
        },
        {
          id: 3,
          documentId: 'mock3',
          title: '行业合作：与知名制造企业达成战略合作',
          content: '深化产业链合作，共建智能制造生态',
          publishedAt: '2024-01-05',
          createdAt: '2024-01-05',
          updatedAt: '2024-01-05',
          excerpt: '深化产业链合作，共建智能制造生态，预计年内完成10个智能工厂项目',
          firstImageUrl: undefined
        }
      ];
    }
  }

  // 提交样品申请
  static async submitSampleRequest(data: {
    name: string;        // 姓名
    phone: string;       // 手机号码
    email: string;       // 邮箱
    company: string; // 公司名称
    position: string;    // 职位
    sampleName: string;  // 样品名称
    quantity: number;    // 数量
    requiredDate: string; // 需求时间
    purpose: string;     // 用途说明
    requirements: string; // 需求概述
    address: string;     // 收货地址
    urgency: 'normal' | 'urgent' | 'very_urgent'; // 紧急程度
}): Promise<boolean> {
    try {
      // 验证必填字段
      if (!data.name || !data.phone || !data.email || !data.company || 
          !data.sampleName || !data.requiredDate || !data.requirements) {
        throw new Error('请填写所有必填字段');
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('请输入有效的邮箱地址');
      }

      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(data.phone)) {
        throw new Error('请输入有效的手机号码');
      }

      // 验证数量
      if (data.quantity < 1 || data.quantity > 100) {
        throw new Error('样品数量应在1-100之间');
      }

      const mappedData = {
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        company: data.company.trim(),
        position: data.position.trim(),
        sampleName: data.sampleName.trim(),
        quantity: data.quantity,
        requiredDate: data.requiredDate,
        purpose: data.purpose.trim(),
        requirements: data.requirements.trim(),
        address: data.address.trim(),
        urgency: data.urgency
      };

      await api.post('/api/sample-applications', { data: mappedData });
      return true;
    } catch (error) {
      console.error('提交样品申请失败:', error);
      throw error;
    }
}

  // 提交定制化需求
  static async submitCustomRequest(data: {
    name: string;
    company: string;
    phone: string;
    email: string;
    requirements: string;
    budget?: string;
    timeline?: string;
  }): Promise<boolean> {
    try {
      // 验证必填字段
      if (!data.name || !data.company || !data.phone || !data.email || !data.requirements) {
        throw new Error('请填写所有必填字段');
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('请输入有效的邮箱地址');
      }

      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(data.phone)) {
        throw new Error('请输入有效的手机号码');
      }

      // 验证需求描述长度
      if (data.requirements.trim().length < 10) {
        throw new Error('需求描述至少需要10个字符');
      }

      const mappedData = {
        name: data.name.trim(),
        company: data.company.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        requirements: data.requirements.trim(),
        budget: data.budget?.trim() || '',
        timeline: data.timeline?.trim() || ''
      };

      await api.post('/api/custom-requestes', { data: mappedData });
      return true;
    } catch (error) {
      console.error('提交定制化需求失败:', error);
      throw error;
    }
  }

  // 获取下载中心项目
  static async getDownloadItems(): Promise<DownloadCenterItem[]> {
    try {
      const response = await api.get<ApiResponse<DownloadCenterItem>>('/api/download-center-items?populate=file');

      // 处理每个下载项，添加文件URL和类型信息
      const downloadItems = response.data.data.map(item => {
        let fileUrl: string | undefined = undefined;
        let fileSize: string | undefined = undefined;
        let fileType: string | undefined = undefined;

        // 如果有文件，处理文件信息
        if (item.file) {
          fileUrl = `${BASE_URL}${item.file.url}`;

          // 格式化文件大小
          const size = item.file.size;
          if (size < 1024) {
            fileSize = `${size} B`;
          } else if (size < 1024 * 1024) {
            fileSize = `${(size / 1024).toFixed(1)} KB`;
          } else {
            fileSize = `${(size / (1024 * 1024)).toFixed(1)} MB`;
          }

          // 根据mime类型判断文件类型
          const mime = item.file.mime;
          if (mime.includes('pdf')) {
            fileType = 'pdf';
          } else if (mime.includes('image')) {
            fileType = 'image';
          } else if (mime.includes('video')) {
            fileType = 'video';
          } else if (mime.includes('zip') || mime.includes('rar') || mime.includes('tar') || mime.includes('7z')) {
            fileType = 'archive';
          } else if (mime.includes('word') || mime.includes('excel') || mime.includes('powerpoint') || mime.includes('text')) {
            fileType = 'document';
          } else {
            fileType = 'document'; // 默认为文档类型
          }
        }

        return {
          ...item,
          fileUrl,
          fileSize,
          fileType
        };
      });

      return downloadItems;
    } catch (error) {
      console.error('获取下载中心项目失败:', error);
      throw error;
    }
  }

  // 获取轮播图数据
  static async getCarouselSlides(): Promise<CarouselSlide[]> {
    try {
      console.log('开始获取轮播图数据，请求URL:', `${BASE_URL}/api/carousel-slides?populate=*&sort=order:asc`);
      const response = await api.get<ApiResponse<CarouselSlide>>('/api/carousel-slides?populate=*&sort=order:asc');
      
      console.log('轮播图原始API响应:', response.data);

      // 处理每个轮播图，添加媒体URL
      const slides = response.data.data.map(slide => {
        console.log('处理轮播图原始数据:', slide);
        
        let imageUrl: string | undefined = undefined;
        let videoUrl: string | undefined = undefined;
        
        // 处理图片URL
        if (slide.image && slide.image.url) {
          imageUrl = `${BASE_URL}${slide.image.url}`;
        }
        
        // 处理视频URL
        if (slide.video && slide.video.url) {
          videoUrl = `${BASE_URL}${slide.video.url}`;
        }
        
        // 处理轮播图数据
        const processedSlide = {
          ...slide,
          imageUrl,
          videoUrl,
          // 确保字段存在，使用默认值
          cta_text: slide.cta_text || '',
          cta_link: slide.cta_link || '',
          cta_type: slide.cta_type || 'internal',
          cta_style: slide.cta_style || 'primary',
          description: slide.subtitle || ''
        };
        
        console.log('处理后的轮播图数据:', processedSlide);
        return processedSlide;
      });

      return slides;
    } catch (error) {
      console.warn('轮播图API暂未配置，使用默认数据:', error instanceof Error ? error.message : String(error));
      // 返回默认轮播图数据作为后备
      return [
        {
          id: 1,
          documentId: 'default1',
          title: '引领工业4.0智能制造',
          subtitle: '专业工控机解决方案提供商',
          order: 1,
          media_type: 'image' as const,
          cta_text: '了解产品',
          cta_type: 'internal' as const,
          cta_link: '/products',
          cta_style: 'primary' as const,
          is_active: true,
          locale: 'zh-CN',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop'
        },
        {
          id: 2,
          documentId: 'default2',
          title: '边缘计算新突破',
          subtitle: '高性能嵌入式工控平台',
          order: 2,
          media_type: 'svg' as const,
          cta_text: '技术详情',
          cta_type: 'internal' as const,
          cta_link: '/applications',
          cta_style: 'primary' as const,
          is_active: true,
          locale: 'zh-CN',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          svg_code: '/images/edge-computing-breakthrough.svg'
        },
        {
          id: 3,
          documentId: 'default3',
          title: '定制化服务',
          subtitle: '满足您的个性化需求',
          order: 3,
          media_type: 'image' as const,
          cta_text: '立即咨询',
          cta_type: 'internal' as const,
          cta_link: '/sample-request',
          cta_style: 'primary' as const,
          is_active: true,
          locale: 'zh-CN',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
          imageUrl: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1200&h=600&fit=crop'
        }
      ];
    }
  }

  // 获取公司信息
  static async getCompanyInfo(): Promise<Company | null> {
    try {
      // 使用正确的API路径格式
      const response = await api.get<ApiResponse<Company>>('/api/companies?populate=*');

      // 如果没有数据，返回null
      if (!response.data.data.length) {
        return null;
      }

      const company = response.data.data[0];

      // 处理视频URL
      if (company.video) {
        company.videoUrl = `${BASE_URL}${company.video.url}`;
      }

      // 处理二维码URL
      if (company.erWeima) {
        company.erWeimaUrl = `${BASE_URL}${company.erWeima.url}`;
      }

      // 处理Logo URL
      if (company.logo) {
        company.logoUrl = `${BASE_URL}${company.logo.url}`;
      }

      return company;
    } catch (error) {
      console.error('获取公司信息失败:', error);
      // 返回模拟数据作为后备
      return {
        id: 1,
        documentId: 'mock-company',
        name: '深圳市研响科技有限公司',
        address: '深圳市南山区科技园南区高新南七道数字技术大厦A座12楼',
        email: 'contact@yanxiangtech.com',
        phone: '0755-12345678',
        beiyongPhone: '0755-87654321',
        work_time: '周一至周五 9:00-18:00',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        publishedAt: '2023-01-01T00:00:00.000Z'
      };
    }
  }
}

export default ApiService;