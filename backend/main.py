from fastapi import FastAPI
from dotenv import load_dotenv
import requests, os
import sqlite3
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import quote

load_dotenv()

app = FastAPI()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")


SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_ME_URL = "https://api.spotify.com/v1/me"
SPOTIFY_RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=20"

#Connecting to the DB
def init_db():
    conn = sqlite3.connect("spotify_app.db")
    cursor = conn.cursor()

    cursor.execute(
        """CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            spotify_id TEXT UNIQUE,
            name TEXT
            )""")

    cursor.execute(
        """CREATE TABLE IF NOT EXISTS listening_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            track_name TEXT,
            artist_name TEXT,
            album_name TEXT,
            played_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
            )""")
    conn.commit()
    conn.close()

init_db()

@app.get("/login")
def login():
    scope = "user-read-email user-read-private user-read-recently-played"
    encoded_redirect_uri = quote(REDIRECT_URI, safe='')
    auth_url = (
        f"{SPOTIFY_AUTH_URL}?response_type=code&client_id={CLIENT_ID}"
        f"&redirect_uri={encoded_redirect_uri}&scope={scope}&show_dialog=true"
    )
    return RedirectResponse(auth_url)


@app.get("/callback")
def callback(code: str):
    try:
        # Exchange authorization code for access token
        payload = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": REDIRECT_URI,
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
        }

        response = requests.post(SPOTIFY_TOKEN_URL, data=payload)
        
        if response.status_code != 200:
            return JSONResponse({"error": response.text}, status_code=response.status_code)

        token_info = response.json()
        access_token = token_info.get("access_token")

        if not access_token:
            return JSONResponse({"error" : "Failed to get access token"}, status_code=500)

        # Get user profile from Spotify
        headers = {"Authorization": f"Bearer {access_token}"}
        user_profile = requests.get(SPOTIFY_ME_URL, headers=headers).json()

        #getting image url
        image_url = ""
        if "images" in user_profile and len(user_profile["images"]) > 0:
            image_url = user_profile["images"][0]["url"]

        #Saving user info into DB
        conn = sqlite3.connect("spotify_app.db")
        cursor = conn.cursor()
        cursor.execute("""
            INSERT OR IGNORE INTO users (spotify_id, name) VALUES (?, ?)""", 
            (user_profile["id"], user_profile.get("display_name", "")))
        conn.commit()
        conn.close()

        # Redirect back to frontend with user info in query params
        frontend_url = (
            f"{FRONTEND_URL}/profile"
            f"?name={user_profile.get('display_name', '')}"
            f"&image={image_url}"
            f"&access_token={access_token}"
            f"&spotify_id={user_profile['id']}"
        )
        return RedirectResponse(frontend_url)
    
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

