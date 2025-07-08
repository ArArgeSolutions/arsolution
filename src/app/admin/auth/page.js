"use client"; // Client-side rendering
import { useRouter } from 'next/navigation';

export default function CanvasLoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/api/canvas');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-white text-3xl mb-6">Canvas Login</h1>
      <button onClick={handleLogin} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Canvas Login</button>
    </div>
  );
}
