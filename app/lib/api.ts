// 客户API服务
export async function getCustomers() {
  try {
    const response = await fetch('/api/customers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('获取客户列表失败');
    }
    return response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}

export async function deleteCustomerAPI(customerId: string) {
  try {
    const response = await fetch('/api/customers', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerId }),
    });
    if (!response.ok) {
      throw new Error('删除客户失败');
    }
    return response.json();
  } catch (error) {
    console.error('API错误:', error);
    throw error;
  }
}