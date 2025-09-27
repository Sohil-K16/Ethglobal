import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-gray-600 bg-gray-900/50 text-white hover:border-gray-500 focus:border-purple-500",
        outline: "border-gray-600 bg-transparent text-white hover:border-gray-500",
        filled: "border-gray-700 bg-gray-800 text-white hover:bg-gray-700",
        ghost: "border-transparent bg-gray-800/50 text-white hover:bg-gray-800",
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 text-xs",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & VariantProps<typeof inputVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        inputVariants({ variant, className }),
        "min-h-[60px] resize-none"
      )}
      ref={ref}
      {...props}
    />
  )
})
TextArea.displayName = "TextArea"

export { Input, TextArea, inputVariants }