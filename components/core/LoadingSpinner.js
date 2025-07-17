export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#335dab] mb-4"></div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
} 