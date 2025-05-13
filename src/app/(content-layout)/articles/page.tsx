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
    <div className="w-full">
      <DetailArticleInfo detail={data} />
    </div>
  );
}
