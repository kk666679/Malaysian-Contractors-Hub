import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from './button'

const ErrorMessage = ({
  message,
  title = 'Error',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`p-4 border border-red-200 rounded-lg bg-red-50 ${className}`}>
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="mt-3 border-red-300 text-red-700 hover:bg-red-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
