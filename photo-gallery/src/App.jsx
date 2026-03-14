import { useState, useReducer, useMemo, useEffect } from "react";
import axios from "axios";
import { favouriteReducer } from "./reducer/favouriteReducer";
import Card from "./components/Card";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Initialize favorites from localStorage
  const [favourites, dispatch] = useReducer(
    favouriteReducer,
    [],
    () => {
      const localData = localStorage.getItem("favourites");
      return localData ? JSON.parse(localData) : [];
    }
  );

  // Fetch Logic
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get("https://picsum.photos/v2/list?limit=30");
        setPhotos(res.data);
      } catch (err) {
        setError("Failed to load photos. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Filter Logic
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  const toggleFav = (photo) => {
    dispatch({ type: "TOGGLE_FAV", payload: photo });
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl font-mono">Initializing Gallery...</div>;
  if (error) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10">
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-black mb-4 tracking-tighter italic">PHOTO GALLERY</h1>
        <input
          type="text"
          placeholder="Filter by author name..."
          className="w-full max-w-md p-4 rounded-full bg-zinc-800 border-none text-white focus:ring-2 focus:ring-red-500 transition-all outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {/* THE RESPONSIVE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {filteredPhotos.map((photo) => (
          <Card
            key={photo.id}
            photo={photo}
            toggleFav={toggleFav}
            favourites={favourites}
          />
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <p className="text-center text-zinc-500 mt-20">No photos found matching "{search}"</p>
      )}
    </div>
  );
}

export default App;