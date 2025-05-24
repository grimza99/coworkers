import { Group } from '@/types/group';
import { Task } from '@/types/task';
import { Article } from '@/types/article';
import { NumberLike } from '@/types/utils';

type GroupId = NumberLike<Group['id']>;
type ArticleId = NumberLike<Article['id']>;
type TaskId = NumberLike<Task['id']>;

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
    getArticleDetailPath: (articleId: ArticleId) => `/articles/${articleId}`,
  },

  getGroupPath: (groupId: GroupId) => `${groupId}`,
  getGroupTaskListPath: (groupId: GroupId) => `${groupId}/tasklist`,
  getGroupTaskDetailPath: (groupId: GroupId, taskId: TaskId) => `${groupId}/${taskId}`,
};

export default PATHS;
