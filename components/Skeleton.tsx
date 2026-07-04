import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn("skeleton-shimmer rounded-md bg-dark-200", className)}
    aria-hidden="true"
  />
);

export default Skeleton;
