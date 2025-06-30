import type { Comment } from '../../graphql/types';
import { formatDate } from '../../utils/dateUtils';
import { RiUser3Line, RiTimeLine } from 'react-icons/ri';
import '../../styles/comment.css';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const isAgent = comment.user.role === 'agent';

  return (
    <div className={isAgent ? 'comment-container-agent' : 'comment-container-customer'}>
      <div className="flex flex-col max-w-[80%]">
        <div className="flex items-center space-x-2 mb-1">
          <span className={isAgent ? 'comment-name-agent' : 'comment-name-customer'}>
            <RiUser3Line className="flex-shrink-0" />
            {comment.user.name || comment.user.email}
          </span>
          <span className={isAgent ? 'comment-role-agent' : 'comment-role-customer'}>
            {comment.user.role.charAt(0).toUpperCase() + comment.user.role.slice(1)}
          </span>
        </div>
        <div className={isAgent ? 'comment-bubble-agent' : 'comment-bubble-customer'}>
          <p className="whitespace-pre-wrap">{comment.content}</p>
          <span className="block text-xs text-gray-500 mt-1 flex items-center gap-1">
            <RiTimeLine className="flex-shrink-0" />
            {formatDate(comment.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
