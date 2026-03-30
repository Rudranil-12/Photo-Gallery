const Card = ({ photo, toggleFav, favourites }) => {
  const isFav = favourites.some((p) => p.id === photo.id);

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 transition-transform hover:scale-[1.03]">
      <img
        src={photo.download_url}
        alt={photo.author}
        className="h-56 w-full object-cover"
      />
      <div className="flex justify-between items-center p-4">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Author</p>
          <p className="text-sm font-semibold truncate w-40">{photo.author}</p>
        </div>
        <button
          onClick={() => toggleFav(photo)}
          className="text-2xl hover:scale-110 transition-transform p-1"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default Card;