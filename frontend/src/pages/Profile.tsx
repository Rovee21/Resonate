import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface TrackHistory {
  track_name: string;
  artist_name: string;
  album_name: string;
  played_at: string;
}

function Profile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const name = params.get("name");
  const image = params.get("image");
  const spotify_id = params.get("spotify_id");
  const access_token = params.get("access_token");

  const [history, setHistory] = useState<TrackHistory[]>([]);

  //This function runs whenever the access token or the spotify id change and updates history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/history`, {
          params: { spotify_id, access_token },
        });
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (spotify_id && access_token) {
      fetchHistory();
    }
  }, [spotify_id, access_token, API_URL]);

  if (!name) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="flex flex-col items-center p-6">
        {image && (
        <img src={image} alt="Profile" className="w-24 h-24 rounded-full mb-4"/>
        )}
        <h2 className="text-lg font-semibold">{name}</h2>
        <h3 className="mt-6 mb-2 text-md font-bold">Listening History</h3>
        <div className="w-full max-w-md max-h-64 overflow-y-scroll border p-2">
          {history.map((track, idx) => (
            <div key={idx} className="mb-2">
              <strong>{track.track_name}</strong> — {track.artist_name}
              <br />
              <em>{track.album_name}</em>
              <br />
              <small>{new Date(track.played_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
    </div>
  );
}

export default Profile;