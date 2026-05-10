export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-4 bg-slate-100 dark:bg-slate-800 rounded" />
          <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-4 bg-slate-100 dark:bg-slate-800 rounded" />
          <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero section */}
        <div className="text-center py-8 max-w-4xl mx-auto space-y-4">
          <div className="h-12 w-2/3 mx-auto bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-6 w-1/2 mx-auto bg-slate-100 dark:bg-slate-800 rounded" />
        </div>

        {/* Tool interface placeholder */}
        <div className="h-[600px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800" />
      </div>
    </div>
  );
}
