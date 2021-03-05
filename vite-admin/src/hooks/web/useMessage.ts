import { ElMessage } from 'element-plus';

function createSuccessMessage(msg: string): void {
  ElMessage.success({
    message: msg,
    type: 'success',
  });
}

function createWarningMessage(msg: string): void {
  ElMessage.warning({
    message: msg,
    type: 'warning',
  });
}

function createInfoMessage(msg: string) {
  ElMessage(msg);
}

function createErrorMessage(msg: string) {
  ElMessage.error(msg);
}

export function useMessage() {
  return {
    createSuccessMessage,
    createWarningMessage,
    createInfoMessage,
    createErrorMessage,
  };
}
