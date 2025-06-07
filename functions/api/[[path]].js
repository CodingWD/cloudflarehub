export async function onRequest(context) {
  // 从请求的 URL 中获取路径
  let url = new URL(context.request.url);

  // 目标 Strapi 后端的基础 URL
  const strapiBaseUrl = 'http://aifafafa.xyz:1337';

  // 构建目标 URL
  // context.params.path 是一个数组，包含了匹配到的路径部分
  // 例如，如果请求是 /api/product-categories, context.params.path 会是 ['product-categories']
  // 如果请求是 /api/foo/bar, context.params.path 会是 ['foo', 'bar']
  // 我们需要将它们拼接起来
  const targetPath = context.params.path.join('/');
  // 移除拼接中的 /api/，因为 context.params.path 已经包含了 api/entity-name
  const targetUrl = `${strapiBaseUrl}/${targetPath}${url.search}`;

  // 创建一个新的请求，并将其转发到 Strapi 后端
  // 复制原始请求的 headers, method, 和 body
  const request = new Request(targetUrl, {
    headers: context.request.headers,
    method: context.request.method,
    body: context.request.body,
    redirect: 'follow' // 允许重定向
  });

  // 发送请求到 Strapi
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    // 处理请求错误
    console.error('Error fetching from Strapi:', error);
    return new Response('Error proxying to API', { status: 500 });
  }
}