export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]}`}
        role="status"
        aria-label="Đang tải..."
      >
        <span className="sr-only">Đang tải...</span>
      </div>
    </div>
  )
}
