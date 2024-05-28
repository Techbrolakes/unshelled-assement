import React from "react";

export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* avatar */}
      <div className="flex  space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>
      </div>

      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
}
