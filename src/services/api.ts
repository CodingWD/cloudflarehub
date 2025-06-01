import axios from 'axios';

const BASE_URL = 'http://192.168.31.130:1337';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 产品信息接口
export interface ProductInfo {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  product_name: string;
  short_description: string;
  full_description?: string;
  features?: string;
  applications?: string;
  faBuStatus: string;
  meta_title?: string;
  meta_description?: string;
  order?: number;
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
  static async getProductInfos(): Promise<ProductInfo[]> {
    try {
      const response = await api.get<ApiResponse<ProductInfo>>('/api/product-infos');
      return response.data.data;
    } catch (error) {
      console.error('获取产品信息失败:', error);
      throw error;
    }
  }

  // 获取单个产品信息
  static async getProductInfo(slug: string): Promise<ProductInfo | null> {
    try {
      const response = await api.get<ApiResponse<ProductInfo>>(`/api/product-infos?filters[slug][$eq]=${slug}`);
      return response.data.data[0] || null;
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
      const response = await api.get<ApiResponse<NewsArticle>>(`/api/news-articles?pagination[limit]=${limit}&sort=publishedAt:desc`);
      return response.data.data;
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
        },
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