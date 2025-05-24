import { Group } from '@/types/group';
import { Task } from '@/types/task';
import { Article } from '@/types/article';

type groupId = Group['id'] | `${Group['id']}`;
type articleId = Article['id'] | `${Article['id']}`;
type taskId = Task['id'] | `${Task['id']}`;

const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SIGNUP_KAKAO: '/oauth/signup/kakao',
  MYPAGE: '/mypage',
  EDITGROUP: '/editgroup',
  NOGROUP: '/nogroup',
  ADDGROUP: '/addgroup',
  JOINGROUP: '/joingroup',
  MYHISTORY: '/myhistory',
  ARTICLES: {
    BASE: '/articles',
    NEW: '/articles/new',
    getArticleDetailPath: (articleId: articleId) => `/articles/${articleId}`,
  },

  getGroupPath: (groupId: groupId) => `${groupId}`,
  getGroupTaskListPath: (groupId: groupId) => `${groupId}/tasklist`,
  getGroupTaskDetailPath: (groupId: groupId, taskId: taskId) => `${groupId}/${taskId}`,
};

export default PATHS;
