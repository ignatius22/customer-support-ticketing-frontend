import { useState } from 'react';
import { RiSendPlaneFill, RiLoader4Line } from 'react-icons/ri';
import { useCreateComment } from '../../graphql/hooks';
import { useAuth } from '../../contexts/AuthContext';
import Snackbar from '../ui/Snackbar';

interface NewCommentFormProps {
  ticketId: string;
  onCommentAdded: () => void;
  hasAgentReplies: boolean;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({
  ticketId,
  onCommentAdded,
  hasAgentReplies
}) => {
  const [content, setContent] = useState('');
  const [createComment, { loading }] = useCreateComment();
  const { user } = useAuth();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    // Check if customer is trying to comment without agent reply
    if (user?.role === 'customer' && !hasAgentReplies) {
      setShowSnackbar(true);
      return;
    }

    try {
      await createComment({
        variables: {
          input: {
            ticketId,
            content: content.trim()
          }
        }
      });
      
      setContent('');
      onCommentAdded();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     transition-all duration-200 flex items-center justify-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            {loading ? (
              <>
                <RiLoader4Line className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RiSendPlaneFill />
                Add Comment
              </>
            )}
          </button>
        </div>
      </form>
      <Snackbar
        isOpen={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        message="You cannot add a comment until an agent has replied to this ticket."
        type="warning"
      />
    </>
  );
};

export default NewCommentForm;
