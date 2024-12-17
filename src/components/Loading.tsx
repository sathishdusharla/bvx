// components/Loading.tsx
const Loading = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 z-50">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent border-solid rounded-full animate-spin-slow"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin-reverse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-4 border-purple-500 border-t-transparent border-solid rounded-full animate-spin-reverse-slow"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;