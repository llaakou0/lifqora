import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return <div className={`skeleton ${className}`}></div>;
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <Skeleton className="skeleton-image w-full" />
      <div className="p-4">
        <Skeleton className="skeleton-text w-20 h-6" />
        <Skeleton className="skeleton-title w-full" />
        <Skeleton className="skeleton-text w-full" />
        <Skeleton className="skeleton-text w-3/4" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="flex-1 h-12 rounded-lg" />
          <Skeleton className="w-12 h-12 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <Skeleton className="w-16 h-16 rounded-xl mb-4" />
      <Skeleton className="skeleton-title w-3/4" />
      <Skeleton className="skeleton-text w-full" />
    </div>
  );
};

export const TableRowSkeleton: React.FC = () => {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div>
            <Skeleton className="skeleton-text w-32" />
            <Skeleton className="skeleton-text w-24 h-3" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4"><Skeleton className="skeleton-text w-20" /></td>
      <td className="px-6 py-4"><Skeleton className="skeleton-text w-16" /></td>
      <td className="px-6 py-4"><Skeleton className="w-6 h-6 rounded-full" /></td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
      </td>
    </tr>
  );
};

export const TextSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`skeleton-text ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
};

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="w-16 h-16 skeleton-circle" />
      <div>
        <Skeleton className="skeleton-text w-32" />
        <Skeleton className="skeleton-text w-24 h-3" />
      </div>
    </div>
  );
};
