interface AttachmentListProps {
  fileUrls: string[];
}

const AttachmentList: React.FC<AttachmentListProps> = ({ fileUrls }) => {
  if (!fileUrls || fileUrls.length === 0) return null;

  const getFileIcon = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '';
      case 'doc':
      case 'docx':
        return '';
      case 'txt':
        return '';
      default:
        return '';
    }
  };

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'File';
  };

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
      <div className="space-y-2">
        {fileUrls.map((url, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>{getFileIcon(url)}</span>
            <span className="underline">{getFileName(url)}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AttachmentList;
