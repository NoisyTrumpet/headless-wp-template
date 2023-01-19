const Loading = () => {
  return (
    <div role="status" className="mx-auto max-w-lg animate-pulse">
      <div className="mx-auto mb-4 h-6 w-48 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-4 max-w-[360px] rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-4 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-4 max-w-[330px] rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="mb-2.5 h-4 max-w-[300px] rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-4 max-w-[360px] rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default Loading;
