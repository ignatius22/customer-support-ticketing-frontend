import { useState, type ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ children, content, side = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrows = {
    top: 'border-t-gray-800 -bottom-1',
    bottom: 'border-b-gray-800 -top-1',
    left: 'border-l-gray-800 -right-1',
    right: 'border-r-gray-800 -left-1',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2 py-1 text-sm text-white bg-gray-800 rounded shadow-lg pointer-events-none
                     whitespace-nowrap ${positions[side]}`}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-gray-800 transform rotate-45
                       ${arrows[side]}`}
          />
        </div>
      )}
    </div>
  );
};
