import React from 'react';

const NoData: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg font-semibold text-gray-600 animate-fade-scale">No Data Available</p>
    </div>
  );
};

export default NoData;
