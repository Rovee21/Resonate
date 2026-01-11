import { useState} from "react";
import { useLocation } from "react-router-dom";


function FeedPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const name = params.get("name");
  const image = params.get("image");
  // const spotify_id = params.get("spotify_id");
  // const access_token = params.get("access_token");

  // const [activeTab, setActiveTab] = useState<"activity" | "ai-playlist">("activity");
  const [searchQuery, setSearchQuery] = useState("");

  if (!name) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        {/* User profile */}
        <div className="flex items-center gap-3">
          {image && (
            <img 
              src={image} 
              alt="Profile" 
              className="w-10 h-10 rounded-full"
            />
          )}
          <span className="font-semibold">{name}</span>
        </div>
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
        </div>
      </header>
    </div>
  );
}

export default FeedPage;