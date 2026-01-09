interface ProviderSectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProvider: (provider: string) => void;
}

function ProviderSection({ isOpen, onClose, onSelectProvider }: ProviderSectionProps) {
  if (!isOpen){
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">Choose your music provider</h2>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelectProvider("spotify")}
            className="w-full flex items-center gap-4 p-4 bg-green-500 hover:bg-green-600 rounded-lg transition"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
            <div className="text-left">
              <div className="font-semibold">Spotify</div>
              <div className="text-sm opacity-80">Connect your Spotify account</div>
            </div>
          </button>
          
          {/* Future providers can go here */}
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-gray-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProviderSection;