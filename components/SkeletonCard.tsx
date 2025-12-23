const SkeletonCard = () => {
  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div className="h-full overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
        <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700" />
        <div className="p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
            <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mb-3 space-y-2">
            <div className="h-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-6 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="space-y-2">
            <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mt-4 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
