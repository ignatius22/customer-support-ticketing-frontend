import { Link } from 'react-router-dom';
import { RiAddCircleLine, RiEmotionSadLine, RiTicketLine } from 'react-icons/ri';

interface EmptyTicketStateProps {
  isCustomer: boolean;
}

const EmptyTicketState = ({ isCustomer }: EmptyTicketStateProps) => {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <RiTicketLine className="h-24 w-24 text-gray-200" />
          <RiEmotionSadLine className="absolute bottom-0 right-0 h-10 w-10 text-gray-400" />
        </div>
        
        <h3 className="mt-6 text-xl font-medium text-gray-900">
          No tickets yet
        </h3>
        
        <p className="mt-2 text-sm text-gray-500 max-w-sm">
          {isCustomer 
            ? "Need help? Get started by creating your first support ticket. We're here to assist you!" 
            : "There are no support tickets to display at the moment. Check back later for new tickets."}
        </p>

        {isCustomer && (
          <div className="mt-8">
            <Link 
              to="/tickets/new" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <RiAddCircleLine className="h-5 w-5" />
              Create Your First Ticket
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyTicketState;
