export default function NoticiasLoading() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="h-12 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-96 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700" />
            <div className="p-6">
              <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mb-3 space-y-2">
                <div className="h-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-6 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="space-y-2">
                <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
