import { useState } from 'react';
import { RiFileDownloadLine } from 'react-icons/ri';
import { Tooltip } from '../common/Tooltip';
import { useExportClosedTickets } from '../../graphql/hooks';

const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [exportTickets] = useExportClosedTickets({
    onCompleted: (data) => {
      setIsExporting(false);
      if (data.exportClosedTickets.errors?.length > 0) {
        setError(data.exportClosedTickets.errors.join(', '));
        return;
      }
      
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = data.exportClosedTickets.downloadUrl;
      link.setAttribute('download', 'closed_tickets.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onError: (error) => {
      setIsExporting(false);
      setError(error.message);
    }
  });

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);
    
    try {
      await exportTickets({
        variables: {
          input: {} as never
        }
      });
    } catch (err) {
      // Error will be handled by onError callback
      console.error('Export error:', err);
    }
  };

  return (
    <div className="relative inline-block">
      <Tooltip content="Export Last Month's Closed Tickets" side="bottom">
        <button
          onClick={handleExport}
          disabled={isExporting}
          aria-label="Export Last Month's Closed Tickets"
          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                   hover:scale-105 active:scale-95"
        >
          {isExporting ? (
            <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent" />
          ) : (
            <RiFileDownloadLine className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </Tooltip>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ExportButton;
