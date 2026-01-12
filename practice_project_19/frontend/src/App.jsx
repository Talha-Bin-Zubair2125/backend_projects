import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // States For Music Search
  const [music, setMusic] = useState("");
  const [data, setData] = useState([]);

  const submit = async () => {
    if (!music) return; // Do not search empty
    try {
      const search_music = await axios.get(
        "http://localhost:3000/music/search",
        {
          params: {
            music_to_search: music,
          },
        }
      );
      console.log(search_music.data);
      setData(search_music.data.data);
    } catch (error) {
      console.error("Error Fetching Music:", error);
    }
  };

  return (
    <div className="app-container">
      {/* Heading */}
      <header className="header">
        <h1>TuneWave</h1>
        <p>
          Web-Based Music Search and Preview Player. Search songs, artists, and
          albums in real time with album artwork and 30-second previews.
        </p>
      </header>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search music..."
          value={music}
          onChange={(e) => setMusic(e.target.value)}
        />
        <button onClick={submit}>Search</button>
      </div>

      {/* Results */}
      <div className="results-container">
        {data.length === 0 ? (
          <p className="no-data">No results found</p>
        ) : (
          data.map((track) => (
            <div key={track.id} className="track-card">
              <img
                src={track.album.cover_medium}
                alt={track.album.title}
                className="album-cover"
              />
              <div className="track-info">
                <h3>
                  {track.title.length > 20
                    ? track.title.slice(0, 20) + "..."
                    : track.title}
                </h3>
                <p>{track.artist.name}</p>
                <audio controls src={track.preview} className="audio-player">
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
