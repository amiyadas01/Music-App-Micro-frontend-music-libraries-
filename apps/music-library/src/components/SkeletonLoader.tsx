function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-gray-100 animate-pulse" />
          <Shimmer className="flex-1 max-w-xl h-12 rounded-2xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Segmented control skeleton */}
        <div className="hidden md:flex gap-1 mb-8 w-fit p-1 bg-gray-100/80 rounded-2xl">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-24 h-9 bg-gray-200/70 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="md:hidden mb-6">
          <Shimmer className="w-full h-12 rounded-2xl" />
        </div>

        {/* Card grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
              <Shimmer className="w-full aspect-square" />
              <div className="p-4 space-y-2">
                <Shimmer className="h-4 rounded w-3/4" />
                <Shimmer className="h-3 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}