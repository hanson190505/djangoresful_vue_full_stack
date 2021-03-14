import { ElNotification } from 'element-plus';

function createSuccessMessage(msg: string): void {
  ElNotification({
    message: msg,
    type: 'success'
  })
}

function createWarningMessage(msg: string): void {
  ElNotification({
    message: msg,
    type: 'warning',
  });
}

function createInfoMessage(msg: string) {
  ElNotification({
    message: msg,
    type: 'info'
  });
}

function createErrorMessage(msg: string) {
  ElNotification({
    message: msg,
    type:'error',
    duration: 0
  });
}

export function useMessage() {
  return {
    createSuccessMessage,
    createWarningMessage,
    createInfoMessage,
    createErrorMessage,
  };
}
