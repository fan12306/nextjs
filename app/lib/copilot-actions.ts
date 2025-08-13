'use client';
import { useCopilotAction } from '@copilotkit/react-core';
import { createInvoice } from './actions';
import { getCustomers, deleteCustomerAPI } from './api';
import { useState } from 'react';

// 定义全局添加支票的Copilot动作
export function useGlobalCheckActions() {
  // 用于存储动作执行状态
  const [actionState, setActionState] = useState<{
    message: string | null;
    errors: Record<string, string[]>;
    customers?: any[];
  }>({
    message: null,
    errors: {},
    customers: [],
  });

  // 添加支票动作
  useCopilotAction({
    name: "addCheck",
    description: "添加支票付款",
    parameters: [
      {
        name: "customerId",
        description: "客户ID",
        required: true,
      },
      {
        name: "amount",
        description: "支票金额(USD)",
        required: true,
        type: "number"
      },
      {
        name: "status",
        description: "支票状态(pending/paid)",
        required: true,
      }
    ],
    handler(data) {
      console.log('添加支票:', data);
      const formData = new FormData();
      formData.append('customerId', data.customerId);
      formData.append('amount', data.amount.toString());
      formData.append('status', data.status);

      // 调用创建发票函数(实际项目中应该有专门的添加支票函数)
      createInvoice(actionState, formData)
        .then(result => {
          setActionState(prev => ({...prev, ...result}));
          if (result.message) {
            console.log('添加支票结果:', result.message);
          }
        })
        .catch(error => {
          setActionState(prev => ({
            ...prev,
            message: '添加支票失败: ' + error.message,
            errors: {general: [error.message]}
          }));
        });
    },
  });

  // 访问客户列表动作
  useCopilotAction({
    name: "accessCustomers",
    description: "获取所有客户列表",
    handler() {
      console.log('获取客户列表');
      getCustomers()
        .then(customers => {
          setActionState(prev => ({
            ...prev,
            message: `成功获取 ${customers.length} 个客户`,
            customers: customers
          }));
          console.log('客户列表:', customers);
        })
        .catch(error => {
          setActionState(prev => ({
            ...prev,
            message: '获取客户列表失败: ' + error.message,
            errors: {general: [error.message]}
          }));
        });
    },
  });

  // 删除客户动作
  useCopilotAction({
    name: "deleteCustomer",
    description: "删除指定ID的客户",
    parameters: [
      {
        name: "customerId",
        description: "客户ID",
        required: true,
      }
    ],
    handler(data) {
      console.log('删除客户:', data);
      deleteCustomerAPI(data.customerId)
        .then(result => {
          setActionState(prev => ({
            ...prev,
            message: result.message
          }));
        })
        .catch(error => {
          setActionState(prev => ({
            ...prev,
            message: '删除客户失败: ' + error.message,
            errors: {general: [error.message]}
          }));
        });
    },
  });

  // 编辑支票动作
  useCopilotAction({
    name: "editCheck",
    description: "编辑现有支票付款",
    parameters: [
      {
        name: "checkId",
        description: "支票ID",
        required: true,
      },
      {
        name: "customerId",
        description: "客户ID",
        required: false,
      },
      {
        name: "amount",
        description: "支票金额(USD)",
        required: false,
        type: "number"
      },
      {
        name: "status",
        description: "支票状态(pending/paid)",
        required: false,
      }
    ],
    handler(data) {
      console.log('编辑支票:', data);
      // 实际项目中应该调用编辑支票的API
      setActionState({
        message: `支票 ${data.checkId} 编辑成功`,
        errors: {}
      });
    },
  });

  return actionState;
}