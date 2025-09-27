import * as React from "react"
import { cn } from "../../lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium text-gray-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
  )
)
Label.displayName = "Label"

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))
FormField.displayName = "FormField"

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
  <Label
    ref={ref}
    className={className}
    required={required}
    {...props}
  >
    {children}
  </Label>
))
FormLabel.displayName = "FormLabel"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm",
      error ? "text-red-400" : "text-gray-400",
      className
    )}
    {...props}
  />
))
FormMessage.displayName = "FormMessage"

export { Label, FormField, FormLabel, FormMessage }