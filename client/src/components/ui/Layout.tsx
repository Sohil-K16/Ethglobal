import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const containerVariants = cva(
  "w-full mx-auto px-4 sm:px-6 lg:px-8",
  {
    variants: {
      size: {
        sm: "max-w-3xl",
        md: "max-w-5xl",
        lg: "max-w-7xl",
        xl: "max-w-[1400px]",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

const sectionVariants = cva(
  "py-8 md:py-12 lg:py-16",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        primary: "bg-gradient-to-br from-purple-900/20 to-blue-900/20",
        secondary: "bg-gray-900/50 backdrop-blur-sm",
        accent: "bg-gradient-to-r from-emerald-900/20 to-teal-900/20",
      },
      spacing: {
        none: "py-0",
        sm: "py-4 md:py-6",
        md: "py-8 md:py-12",
        lg: "py-12 md:py-16 lg:py-20",
        xl: "py-16 md:py-20 lg:py-24",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "md",
    },
  }
)

const gridVariants = cva(
  "grid gap-6",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      },
      gap: {
        sm: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-10",
      },
    },
    defaultVariants: {
      cols: "auto",
      gap: "md",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {}

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  )
)
Container.displayName = "Container"

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, variant, spacing, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ variant, spacing, className }))}
      {...props}
    />
  )
)
Section.displayName = "Section"

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ cols, gap, className }))}
      {...props}
    />
  )
)
Grid.displayName = "Grid"

const Flex = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: "row" | "col"
    align?: "start" | "center" | "end" | "stretch"
    justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
    wrap?: boolean
    gap?: "sm" | "md" | "lg" | "xl"
  }
>(({ className, direction = "row", align = "start", justify = "start", wrap = false, gap = "md", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex",
      direction === "col" && "flex-col",
      align === "center" && "items-center",
      align === "end" && "items-end",
      align === "stretch" && "items-stretch",
      justify === "center" && "justify-center",
      justify === "end" && "justify-end",
      justify === "between" && "justify-between",
      justify === "around" && "justify-around",
      justify === "evenly" && "justify-evenly",
      wrap && "flex-wrap",
      gap === "sm" && "gap-2",
      gap === "md" && "gap-4",
      gap === "lg" && "gap-6",
      gap === "xl" && "gap-8",
      className
    )}
    {...props}
  />
))
Flex.displayName = "Flex"

export { Container, Section, Grid, Flex }