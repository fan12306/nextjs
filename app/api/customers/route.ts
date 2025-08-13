import { NextResponse } from 'next/server';
import { fetchCustomers } from '@/app/lib/data';
import { deleteCustomer } from '@/app/lib/actions';

// 获取客户列表
export async function GET() {
  try {
    const customers = await fetchCustomers();
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      { error: '获取客户列表失败' },
      { status: 500 }
    );
  }
}

// 删除客户
export async function DELETE(request: Request) {
  try {
    const { customerId } = await request.json();
    if (!customerId) {
      return NextResponse.json(
        { error: '客户ID不能为空' },
        { status: 400 }
      );
    }
    const result = await deleteCustomer(customerId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: '删除客户失败' },
      { status: 500 }
    );
  }
}