import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-600 text-white hover:bg-green-700",
        warning: "border-transparent bg-yellow-600 text-white hover:bg-yellow-700",
        info: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
        purple: "border-transparent bg-purple-600 text-white hover:bg-purple-700",
        gradient: "border-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

const progressVariants = cva(
  "w-full bg-secondary rounded-full overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const progressBarVariants = cva(
  "h-full transition-all duration-500 ease-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        gradient: "bg-gradient-to-r from-purple-500 to-blue-500",
      },
    },
    defaultVariants: {
      variant: "gradient",
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number
  max?: number
  variant?: VariantProps<typeof progressBarVariants>["variant"]
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, size, variant = "gradient", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    return (
      <div
        ref={ref}
        className={cn(progressVariants({ size, className }))}
        {...props}
      >
        <div
          className={cn(progressBarVariants({ variant }))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-gray-700/50",
        light: "bg-gray-600/30",
        heavy: "bg-gray-800/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
}

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]",
      },
      variant: {
        default: "bg-gray-700/50",
        solid: "bg-gray-600",
        gradient: "bg-gradient-to-r from-transparent via-gray-600 to-transparent",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
    },
  }
)

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(separatorVariants({ orientation, variant }), className)}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Badge, badgeVariants, Progress, Skeleton, Separator }