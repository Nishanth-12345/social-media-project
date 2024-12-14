import React from 'react';
import './globalLoaderStyles.scss';
import { useLoading } from '../../appContext/loadingContext';

const GlobalLoader: React.FC = () => {
  const { loading } = useLoading();

  return loading ? (
    <div className="global-loader">
      <div className="spinner"></div>
    </div>
  ) : null;
};

export default GlobalLoader;
