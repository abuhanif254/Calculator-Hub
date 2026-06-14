import React from 'react';

interface OnlineStatusProps {
  lastActive?: any; // Firestore timestamp
  className?: string;
  showText?: boolean;
}

export function OnlineStatus({ lastActive, className = "", showText = false }: OnlineStatusProps) {
  if (!lastActive) return null;

  // Convert Firestore timestamp to JS Date
  const lastActiveDate = lastActive?.seconds ? new Date(lastActive.seconds * 1000) : new Date(lastActive);
  
  // Calculate difference in minutes
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 60));

  // Consider online if active within the last 5 minutes
  const isOnline = diffInMinutes <= 5;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {isOnline && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}></span>
      </span>
      {showText && (
        <span className="text-xs font-medium text-slate-500">
          {isOnline ? 'Online now' : `Active ${diffInMinutes < 60 ? `${diffInMinutes}m` : `${Math.floor(diffInMinutes / 60)}h`} ago`}
        </span>
      )}
    </div>
  );
}
