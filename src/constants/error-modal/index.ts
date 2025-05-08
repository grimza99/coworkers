export const ERROR_MODAL = {
  DELETE_TASK: 'deleteTask-error',
  EDIT_TASK: 'editTask-error',
  DELETE_COMMENT: 'deleteComment-error',
  EDIT_COMMENT: 'editComment-error',
  TASK_DONE: 'toggleTaskDone-error',
  OAUTH: 'oauth-error',
};

export const getErrorModalDescription = (MODAL_ID: string) => {
  switch (MODAL_ID) {
    case 'oauth-error':
      return '간편 로그인에 실패 했습니다.';
    default:
      return '오류가 발생했습니다.';
  }
};

export const getErrorModalButtonText = (MODAL_ID: string) => {
  switch (MODAL_ID) {
    case 'oauth-error':
      return '뒤로가기';
    default:
      return '닫기';
  }
};
