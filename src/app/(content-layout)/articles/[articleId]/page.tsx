import { getDetailArticle, getArticleComments } from './_articleId/action';
import CommentField from './_articleId/components/CommentField';
import CommentList from './_articleId/components/CommentList';
import DetailArticleInfo from './_articleId/components/DetailArticleInfo';

export default async function DetailArticle({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const articleId = Number((await params).articleId);
  const detail = await getDetailArticle(articleId);
  const comments = await getArticleComments(articleId);

  return (
    <div className="flex h-full w-full flex-col gap-20">
      <DetailArticleInfo detail={detail} />
      <div className="flex flex-col gap-8 sm:gap-10">
        <CommentField articleId={articleId} />
        <div className="border-border border" />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}
