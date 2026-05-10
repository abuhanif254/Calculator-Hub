export default function Loading() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-4 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-4 bg-slate-100 dark:bg-slate-800 rounded" />
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Main content */}
        <div className="flex-1 w-full max-w-4xl min-w-0 space-y-6">
          {/* Category badge */}
          <div className="h-6 w-28 bg-blue-50 dark:bg-slate-800 rounded-full" />
          {/* Title */}
          <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          {/* Description */}
          <div className="h-6 w-full max-w-xl bg-slate-100 dark:bg-slate-800 rounded" />

          {/* Calculator placeholder */}
          <div className="h-[500px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 mt-8" />
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-[360px] shrink-0 space-y-6">
          <div className="h-[120px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800" />
          <div className="h-[250px] bg-slate-50 dark:bg-slate-900 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
