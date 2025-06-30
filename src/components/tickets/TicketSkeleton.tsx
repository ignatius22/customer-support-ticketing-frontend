const TicketSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="space-x-2">
          <div className="inline-block h-8 w-16 bg-gray-200 rounded"></div>
          <div className="inline-block h-8 w-16 bg-gray-200 rounded"></div>
          <div className="inline-block h-8 w-24 bg-gray-200 rounded"></div>
          <div className="inline-block h-8 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div className="w-1/3">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
};

export default TicketSkeleton;
