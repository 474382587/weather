import "./LoadingIndicator.less";

const LoadingIndicator = (): JSX.Element => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingIndicator;
