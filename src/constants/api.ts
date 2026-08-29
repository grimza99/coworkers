const BFF_BASEURL = '/api';
const BACKEND_BASEURL = process.env.NEXT_PUBLIC_API_URL;

/**--------------------------------------------Next.js api route endpoint------------------------------------------------------------- */

export const BFF_API = {
  entry: BFF_BASEURL,
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    kakao_oauth: '/auth/kakao',
    logout: '/auth/logout', //backend api 없음 bff에서 처리
  },
  user: '/user',
  article: {
    list: '/articles',
    create: '/articles',
    detail: (id: string) => `/articles/${id}`,
    edit: (id: string) => `/articles/${id}`,
    delete: (id: string) => `/articles/${id}`,
    comment: {
      list: (articleId: string) => `/articles/${articleId}/comments`,
      create: (articleId: string) => `/articles/${articleId}/comments`,
      edit: (commentId: string) => `/comments/${commentId}`,
      delete: (commentId: string) => `/comments/${commentId}`,
    },
  },
  group: {
    detail: (groupId: string) => `/groups/${groupId}`,
    create: '/groups',
    edit: (groupId: string) => `/groups/${groupId}`,
    delete: (groupId: string) => `/groups/${groupId}`,
  },
  taskLists: {
    create: (groupId: string) => `/groups/${groupId}/task-lists`,
  },
  task: {
    detail: (groupId: string, taskListId: string, taskId: string) =>
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    create: (groupId: string, taskListId: string) =>
      `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    edit: (groupId: string, taskListId: string, taskId: string) =>
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    delete: (groupId: string, taskListId: string, taskId: string) =>
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    comment: {
      list: (taskId: string) => `/tasks/${taskId}/comments`,
      create: (taskId: string) => `/tasks/${taskId}/comments`,
      edit: (taskId: string, commentId: string) => `/tasks/${taskId}/comments/${commentId}`,
      delete: (taskId: string, commentId: string) => `/tasks/${taskId}/comments/${commentId}`,
    },
  },
  member: {
    copyInvitationCode: (groupId: string) => `/groups/${groupId}/invitation`,
    acceptInviteCode: '/groups/accept-invitation',
  },
  image: {
    upload: '/images/upload',
  },
};

/**--------------------------------------------Backend api endpoint------------------------------------------------------------- */
export const BACKEND_API = {
  user: `${BACKEND_BASEURL}${BFF_API.user}`,
  auth: {
    login: `${BACKEND_BASEURL}/auth/signIn`,
    signup: `${BACKEND_BASEURL}/auth/signUp`,
    kakao_oauth: `${BACKEND_BASEURL}/auth/signIn/KAKAO`,
  },
  article: {
    list: `${BACKEND_BASEURL}${BFF_API.article.list}`,
    create: `${BACKEND_BASEURL}${BFF_API.article.create}`,
    detail: (id: string) => `${BACKEND_BASEURL}${BFF_API.article.detail(id)}`,
    edit: (id: string) => `${BACKEND_BASEURL}${BFF_API.article.edit(id)}`,
    delete: (id: string) => `${BACKEND_BASEURL}${BFF_API.article.delete(id)}`,

    comment: {
      list: (articleId: string) => `${BACKEND_BASEURL}${BFF_API.article.comment.list(articleId)}`,
      create: (articleId: string) =>
        `${BACKEND_BASEURL}${BFF_API.article.comment.create(articleId)}`,
      edit: (commentId: string) => `${BACKEND_BASEURL}${BFF_API.article.comment.edit(commentId)}`,
      delete: (commentId: string) =>
        `${BACKEND_BASEURL}${BFF_API.article.comment.delete(commentId)}`,
    },
  },
  group: {
    detail: (groupId: string) => `${BACKEND_BASEURL}${BFF_API.group.detail(groupId)}`,
    create: `${BACKEND_BASEURL}${BFF_API.group.create}`,
    edit: (groupId: string) => `${BACKEND_BASEURL}${BFF_API.group.edit(groupId)}`,
    delete: (groupId: string) => `${BACKEND_BASEURL}${BFF_API.group.delete(groupId)}`,
  },
  taskLists: {
    create: (groupId: string) => `${BACKEND_BASEURL}${BFF_API.taskLists.create(groupId)}`,
  },
  task: {
    detail: (groupId: string, taskListId: string, taskId: string) =>
      `${BACKEND_BASEURL}${BFF_API.task.detail(groupId, taskListId, taskId)}`,
    create: (groupId: string, taskListId: string) =>
      `${BACKEND_BASEURL}${BFF_API.task.create(groupId, taskListId)}`,
    edit: (groupId: string, taskListId: string, taskId: string) =>
      `${BACKEND_BASEURL}${BFF_API.task.edit(groupId, taskListId, taskId)}`,
    delete: (groupId: string, taskListId: string, taskId: string) =>
      `${BACKEND_BASEURL}${BFF_API.task.delete(groupId, taskListId, taskId)}`,
    comment: {
      list: (taskId: string) => `${BACKEND_BASEURL}${BFF_API.task.comment.list(taskId)}`,
      create: (taskId: string) => `${BACKEND_BASEURL}${BFF_API.task.comment.create(taskId)}`,
      edit: (taskId: string, commentId: string) =>
        `${BACKEND_BASEURL}${BFF_API.task.comment.edit(taskId, commentId)}`,
      delete: (taskId: string, commentId: string) =>
        `${BACKEND_BASEURL}${BFF_API.task.comment.edit(taskId, commentId)}`,
    },
  },
  member: {
    copyInvitationCode: (groupId: string) =>
      `${BACKEND_BASEURL}${BFF_API.member.copyInvitationCode(groupId)}`,
    acceptInviteCode: `${BACKEND_BASEURL}${BFF_API.member.acceptInviteCode}`,
  },
  image: {
    upload: `${BACKEND_BASEURL}${BFF_API.image.upload}`,
  },
};
