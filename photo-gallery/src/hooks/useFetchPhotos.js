import { useEffect, useState } from "react";
import axios from "axios";


const useFetchPhotos = () => {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        "https://picsum.photos/v2/list?limit=30"
      );

      setPhotos(res.data);

    } catch (err) {

      setError("Failed to fetch photos");
    } finally {

      setLoading(false);
    }

  };

  useEffect(() => {

    fetchPhotos();

  }, []);

  return { photos, loading, error };

};

export default useFetchPhotos;