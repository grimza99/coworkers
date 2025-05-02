type NumericString = `${number}`;
type groupId = number | NumericString;
type taskId = number | NumericString;

const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SIGNUP_KAKAO: '/oauth/signup/kakao',
  MYPAGE: '/mypage',
  ADDTEAM: '/addteam',
  MYHISTORY: '/myhistory',
  BOARDS: '/boards',
  NO_GROUP: '/nogroup',

  getGroupPath: (groupId: groupId) => `${groupId}`,
  getGroupTaskListPath: (groupId: groupId) => `${groupId}/tasklist`,
  getGroupTaskDetailPath: (groupId: groupId, taskId: taskId) => `${groupId}/${taskId}`,
};

export default PATHS;
