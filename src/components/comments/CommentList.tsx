import { useComments } from "../../graphql/hooks";
import { RiChat3Line, RiLoader4Line } from "react-icons/ri";
import type { Comment as GraphQLComment } from "../../graphql/types";
import CommentItem from "./CommentItem";
import NewCommentForm from "./NewCommentForm";

interface CommentListProps {
  ticketId: string;
}

const CommentList: React.FC<CommentListProps> = ({ ticketId }) => {
  const { loading, error, data, refetch } = useComments({
    variables: { ticketId },
  });

  if (loading)
    return (
      <div className="p-4 flex items-center gap-2 text-gray-500">
        <RiLoader4Line className="animate-spin" />
        Loading comments...
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-red-500">
        Error loading comments: {error.message}
      </div>
    );

  const comments = (data?.comments as unknown as GraphQLComment[]) || [];

  const hasAgentReplies = comments.some(
    (comment) => comment.user.role === "agent"
  );

  console.log(hasAgentReplies, "hasAgentReplies");

  const handleCommentAdded = () => {
    refetch();
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <RiChat3Line className="text-blue-500" />
        Comments
      </h3>
      <div className="space-y-4 mb-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      <NewCommentForm
        ticketId={ticketId}
        onCommentAdded={handleCommentAdded}
        hasAgentReplies={hasAgentReplies}
      />
    </div>
  );
};

export default CommentList;
