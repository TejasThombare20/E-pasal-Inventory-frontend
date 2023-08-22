import React from 'react';
import { Vortex } from 'react-loader-spinner';
// Import a CSS file for styling (create if it doesn't exist)

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay with blur effect */}
      <div className="fixed inset-0 bg-white opacity-100 backdrop-blur-xl z-40"></div>
      
      {/* Loader */}
      <div className="z-50">
        <Vortex
          visible={true}
          height={80}
          width={80}
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
      </div>
    </div>
  );
};

export default Loader;
