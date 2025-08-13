'use client';

import { useGlobalCheckActions } from '@/app/lib/copilot-actions';

// 客户端组件包装全局支票动作
 export default function GlobalCheckActions() {
  useGlobalCheckActions();
  return null;
}