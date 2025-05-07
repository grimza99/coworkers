export const ERROR_MODAL_ID = {
  DELETE_TASK: 'deleteTask-error',
  EDIT_TASK: 'editTask-error',
  DELETE_COMMENT: 'deleteComment-error',
  EDIT_COMMENT: 'editComment-error',
  OAUTH: 'oauth-error',
};

export const getErrorModalDescription = (MODAL_ID: string) => {
  switch (MODAL_ID) {
    case 'deleteTask-error':
      return '할일 삭제에 실패 했습니다.';
    case 'editTask-error':
      return '할일 수정에 실패 했습니다.';
    case 'deleteComment-error':
      return '댓글 삭제에 실패 했습니다.';
    case 'editComment-error':
      return '댓글 수정에 실패 했습니다.';
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
