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

export default function DetailArticle() {
  return (
    <div className="flex h-full w-full flex-col gap-20">
      <DetailArticleInfo detail={detail} />
      <div className="flex flex-col gap-8 sm:gap-10">
        <CommentField />
        <div className="border-border border" />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}
