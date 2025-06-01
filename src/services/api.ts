import axios from 'axios';

const BASE_URL = 'http://192.168.31.177:1337';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    name: string;
    phone: string;
    email: string;
    productModel: string;
    timeline?: string;
    requirements?: string;
  }): Promise<boolean> {
    try {
      await api.post('/api/sample-requests', { data });
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
      await api.post('/api/custom-requests', { data });
      return true;
    } catch (error) {
      console.error('提交定制化需求失败:', error);
      throw error;
    }
  }
}

export default ApiService;