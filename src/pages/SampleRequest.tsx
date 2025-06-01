import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, User, Mail, Phone, Calendar, FileText, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { ApiService } from '../services/api';

interface SampleRequestForm {
  name: string;
  phone: string;
  email: string;
  company: string;
  position: string;
  sampleName: string;
  quantity: number;
  requiredDate: string;
  purpose: string;
  requirements: string;
  address: string;
  urgency: 'normal' | 'urgent' | 'very_urgent';
}

const SampleRequest: React.FC = () => {
  const [formData, setFormData] = useState<SampleRequestForm>({
    name: '',
    phone: '',
    email: '',
    company: '',
    position: '',
    sampleName: '',
    quantity: 1,
    requiredDate: '',
    purpose: '',
    requirements: '',
    address: '',
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<SampleRequestForm>>({});

  const sampleProducts = [
    'YX-IPC-3000 嵌入式工控机',
    'YX-IPC-5000 无风扇工控机',
    'YX-IPC-7000 高性能工控机',
    'YX-BOX-2000 超紧凑工控机',
    'YX-PANEL-15 工业平板电脑',
    'YX-PANEL-21 触摸一体机',
    '其他产品（请在需求概述中说明）'
  ];

  const urgencyOptions = [
    { value: 'normal', label: '常规（7-10个工作日）', color: 'text-green-600' },
    { value: 'urgent', label: '紧急（3-5个工作日）', color: 'text-yellow-600' },
    { value: 'very_urgent', label: '非常紧急（1-2个工作日）', color: 'text-red-600' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<SampleRequestForm> = {};

    if (!formData.name.trim()) newErrors.name = '请输入姓名';
    if (!formData.phone.trim()) newErrors.phone = '请输入手机号码';
    else if (!/^1[3-9]\d{9}$/.test(formData.phone)) newErrors.phone = '请输入有效的手机号码';
    
    if (!formData.email.trim()) newErrors.email = '请输入邮箱地址';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = '请输入有效的邮箱地址';
    
    if (!formData.company.trim()) newErrors.company = '请输入公司名称';
    if (!formData.sampleName.trim()) newErrors.sampleName = '请选择样品名称';
    if (!formData.requiredDate) newErrors.requiredDate = '请选择需求时间';
    if (!formData.requirements.trim()) newErrors.requirements = '请输入需求概述';
    if (!formData.address.trim()) newErrors.address = '请输入收货地址';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SampleRequestForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 在实际应用中，这里会调用API
      // await ApiService.submitSampleRequest(formData);
      
      setSubmitStatus('success');
      // 重置表单
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        position: '',
        sampleName: '',
        quantity: 1,
        requiredDate: '',
        purpose: '',
        requirements: '',
        address: '',
        urgency: 'normal'
      });
    } catch (error) {
      console.error('提交样品申请失败:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // 最早明天
    return today.toISOString().split('T')[0];
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">申请样品</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              免费申请产品样品，体验我们的工控机解决方案
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sample Request Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-accent-600 to-accent-700 px-8 py-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-white mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-white">样品申请表</h2>
                  <p className="text-accent-100">请填写以下信息，我们将尽快为您安排样品</p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border-l-4 border-green-400 p-6 m-8 rounded-lg"
              >
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">申请提交成功！</h3>
                    <p className="text-green-700">我们已收到您的样品申请，将在1个工作日内与您联系确认详情。</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-l-4 border-red-400 p-6 m-8 rounded-lg"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 text-red-400 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">提交失败</h3>
                    <p className="text-red-700">申请提交时出现错误，请稍后重试或联系客服。</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 基本信息 */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-dark-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    基本信息
                  </h3>
                </div>

                {/* 姓名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none ${
                      errors.name ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="请输入您的姓名"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* 手机号码 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    手机号码 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none ${
                      errors.phone ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="请输入您的手机号码"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                {/* 邮箱地址 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    邮箱地址 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none ${
                      errors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="请输入您的邮箱地址"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* 公司名称 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    公司名称 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none ${
                      errors.company ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="请输入您的公司名称"
                  />
                  {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                </div>

                {/* 职位 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    职位
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    placeholder="请输入您的职位"
                  />
                </div>

                {/* 样品信息 */}
                <div className="md:col-span-2 mt-6">
                  <h3 className="text-lg font-semibold text-dark-800 mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    样品信息
                  </h3>
                </div>

                {/* 样品名称 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    样品名称 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.sampleName}
                    onChange={(e) => handleInputChange('sampleName', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none ${
                      errors.sampleName ? 'ring-2 ring-red-500' : ''
                    }`}
                  >
                    <option value="">请选择样品</option>
                    {sampleProducts.map((product) => (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    ))}
                  </select>
                  {errors.sampleName && <p className="mt-1 text-sm text-red-500">{errors.sampleName}</p>}
                </div>

                {/* 数量 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    申请数量
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                  />
                  <p className="mt-1 text-sm text-gray-500">最多可申请5台样品</p>
                </div>

                {/* 需求时间 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    需求时间 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    min={getMinDate()}
                    value={formData.requiredDate}
                    onChange={(e) => handleInputChange('requiredDate', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none ${
                      errors.requiredDate ? 'ring-2 ring-red-500' : ''
                    }`}
                  />
                  {errors.requiredDate && <p className="mt-1 text-sm text-red-500">{errors.requiredDate}</p>}
                </div>

                {/* 紧急程度 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    紧急程度
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value as 'normal' | 'urgent' | 'very_urgent')}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                  >
                    {urgencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 使用目的 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    使用目的
                  </label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none"
                    placeholder="如：产品评估、项目测试、技术验证等"
                  />
                </div>

                {/* 需求概述 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    需求概述 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none resize-none ${
                      errors.requirements ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="请详细描述您的应用场景、技术要求、预期目标等"
                  />
                  {errors.requirements && <p className="mt-1 text-sm text-red-500">{errors.requirements}</p>}
                </div>

                {/* 收货地址 */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    收货地址 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg border-0 focus:ring-2 focus:ring-accent-500 focus:outline-none resize-none ${
                      errors.address ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="请输入详细的收货地址，包括省市区、街道、门牌号等"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
              </div>

              {/* 提交按钮 */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-8 py-4 bg-dark-800 text-white font-medium rounded-lg hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      提交中...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3" />
                      提交申请
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Sample Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-dark-800 mb-4">样品申请流程</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              简单四步，快速获取产品样品
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: '提交申请',
                description: '填写样品申请表，提供详细需求信息',
                icon: FileText
              },
              {
                step: '02',
                title: '审核确认',
                description: '我们将在1个工作日内联系您确认申请',
                icon: CheckCircle
              },
              {
                step: '03',
                title: '样品发货',
                description: '确认后3-7个工作日内安排样品发货',
                icon: Package
              },
              {
                step: '04',
                title: '技术支持',
                description: '提供完整的技术支持和使用指导',
                icon: User
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-dark-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-dark-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-dark-800 mb-4">需要帮助？</h2>
            <p className="text-xl text-gray-600 mb-8">
              如有任何疑问，请随时联系我们的客服团队
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent-600 mr-2" />
                <span className="text-gray-700">400-123-4567</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-600 mr-2" />
                <span className="text-gray-700">sample@yxtech.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent-600 mr-2" />
                <span className="text-gray-700">工作日 9:00-18:00</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SampleRequest;