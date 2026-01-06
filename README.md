# Resonate: Discover New Music

## Overview
An app created with the purpose of helping people find new music while in the process connecting with new friends. You will log in with your music provider, and a feed page will pop up with music recently listened by a friend. You can switch to the "AI playlists" tab and you can create a playlist based on whatever prompt you type into the chatbot.


## Tech Stack
- Frontend: React(Next.js), TailwindCSS
- Backend: FastAPI, RestAPI
- Database: MySQL
- AI/ML: LLM(either OpenAI, Anthropic, Gemini), Scikit-Learn(for clustering users history), Pandas(for filtering LLM results)

## App Flow

### 1. Welcome Screen

- **Purpose**: Be a nice landing page that a user who stumbles accoss my product can understand whats going on and take the next steps
- **Elements**:
    - Resonate Logo top left
    - Resonate in the top middle
    - Hero section with a gradient background
    - An one liner that tells user what app does in the hero section
    - A preview of what is contained in the app
    - Login options on the top right that allows a user to choose their music provider, Spotify OAuth for now

### 2. Feed Page

- **Purpose**: Where all of the functionality of the app happens: activity feed and chatbot
- **Elements**:
    - Spotify profile pic top left
    - Search user on the top
    - Activity tab that is a limitless feed that shows songs recently listen to by friends
    - AI plalists tab where you can talk to a chatbot to create your desired playlist

### 3. Profile Page

- **Purpose**: Shows you followers and following
- **Elements**:
    - Spotify profile pic top
    - Name right below that
    - Followers and Following right in the middle


## Running the app
- To run the server in a new terminal, use this command: ngrok http 8000
- To run the backend with this command: ./venv/bin/uvicorn main:app --reload 
- To run the frontend, use this command: npm run dev