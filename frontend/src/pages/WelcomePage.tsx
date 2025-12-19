import React from "react";

function WelcomePage(){
    const handleLogin = () => {
        window.location.href = "http://localhost:8000/login";
      };

      return (
        <div className="min-h-screen bg-black text-white flex flex-col">
          {/* Navbar */}
          <header className="flex items-center justify-between px-8 py-4 w-full">
            {/* Logo for now */}
            <div className="text-2xl font-extrabold tracking-tight">
              Resonate
            </div>
            {/* Spotify OAuth login and signup */}
            <div className="flex items-center gap-4">
              <button onClick={handleLogin} className="text-sm font-medium bg-green-500 hover:bg-green-600 transition">
                Log in with Spotify
                </button>
              <button onClick={handleLogin} className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-sm font-semibold transition">
                Sign up with Spotify
              </button>
            </div>
          </header>
    
          {/* Hero and preview */}
          <main className="flex-1 flex items-center justify-center px-8">
            
          </main>
        </div>
      );
}

export default WelcomePage;