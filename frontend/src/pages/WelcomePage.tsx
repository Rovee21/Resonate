import { useState } from "react";
import ProviderSection from "../components/ProviderSelection"

function WelcomePage(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleLoginClick = () => {
    setIsModalOpen(true);
  }

  const handleSelectProvider = (provider: string) => {
    setIsModalOpen(false);

    if (provider === "spotify") {
      window.location.href = `${API_URL}/login`;
    }

    // Can add other providers here
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-4 w-full">
        {/* Logo for now */}
        <div className="text-2xl font-extrabold tracking-tight">
          Resonate
        </div>
        {/* Spotify OAuth login*/}
        <div className="flex items-center gap-4">
          <button onClick={handleLoginClick} className="text-sm font-medium bg-green-500 hover:bg-green-600 transition">
            Log in
          </button>
        </div>
      </header>

      {/* Hero and preview */}
      <main className="flex-1 flex items-center justify-center px-8">
        
      </main>

      <ProviderSection
      isOpen={isModalOpen}
      onClose={()=> setIsModalOpen(false)}
      onSelectProvider={handleSelectProvider}/>
    </div>
  );
}

export default WelcomePage;