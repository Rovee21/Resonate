import { useState} from "react";
import { useLocation } from "react-router-dom";


function FeedPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const name = params.get("name");
  const image = params.get("image");

  const [activeTab, setActiveTab] = useState<"activity" | "ai-playlist">("activity");
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
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("activity")}
          className={`flex-1 px-6 py-4 font-medium transition ${
            activeTab === "activity"
              ? "text-white border-b-2 border-green-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Activity
        </button>
        <button
          onClick={() => setActiveTab("ai-playlist")}
          className={`flex-1 px-6 py-4 font-medium transition ${
            activeTab === "ai-playlist"
              ? "text-white border-b-2 border-green-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          AI Playlist
        </button>
      </div>
      {/* Tab Content */}
      <main className="p-6">
        {activeTab === "activity" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Activity Feed</h2>
            <div className="text-gray-400 text-center py-12">
              <p>Your friends' recently played songs will appear here.</p>
              <p className="text-sm mt-2">Coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === "ai-playlist" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">AI Playlist Generator</h2>
            <div className="text-gray-400 text-center py-12">
              <p>Chat with our AI to create your perfect playlist.</p>
              <p className="text-sm mt-2">Coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default FeedPage;