import CommentField from './[articleId]/_articleId/CommentField';
import CommentList from './[articleId]/_articleId/CommentList';
import DetailArticleInfo from './[articleId]/_articleId/DetailArticleInfo';

interface ArticleWriter {
  id: number;
  nickname: string;
  image: string;
}

export interface Article {
  id: number;
  title: string;
  content?: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount?: number;
  writer: ArticleWriter;
  isLiked: boolean;
}

const data = {
  id: 0,
  title: 'title',
  content: 'content',
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1844/이미지 2024. 1. 12. 15.07.jpeg',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  likeCount: 0,
  commentCount: 0,
  writer: {
    id: 0,
    nickname: 'nickname',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1844/이미지 2024. 1. 12. 15.07.jpeg',
  },
  isLiked: false,
};

export default function DetailArticle() {
  return (
    <div className="flex h-full w-full flex-col gap-20">
      <DetailArticleInfo detail={data} />
      <div className="flex flex-col gap-8 sm:gap-10">
        <CommentField />
        <div className="border-border border" />
        <CommentList />
      </div>
    </div>
  );
}
