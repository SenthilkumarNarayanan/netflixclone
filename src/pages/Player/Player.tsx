import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

// Define TypeScript Interface for Video Data
interface VideoData {
  name: string;
  key: string;
  published_at: string;
  type: string;
}

const Player: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string
  const navigate = useNavigate();

  // Define state with default values
  const [apiData, setApiData] = useState<VideoData>({
    name: "N/A",
    key: "",
    published_at: "N/A",
    type: "N/A",
  });

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E4N2ZhNjI3ZjA2MjRhMzU5ODc2YjI0ZGI2MjE2MCIsIm5iZiI6MTc0MDkyMzMyNS44Miwic3ViIjoiNjdjNDYxYmQ4YmQ3ZWNiMTJiNGIxZTBhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BbZDM0HGZWIfgFba8fPDSFmkSkKm_BgWkOq9Vy4qAzI",
    },
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        const res: any = await response.json();
        console.log("API Response:", res); // Debugging log

        if (res.results && res.results.length > 0) {
          const video = res.results[0] as Partial<VideoData>;
          setApiData({
            name: video.name ?? "N/A",
            key: video.key ?? "",
            published_at: video.published_at?.slice(0, 10) ?? "N/A",
            type: video.type ?? "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate(-1)}
        style={{ cursor: "pointer" }}
      />
      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title={apiData.name || "Trailer"}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading trailer...</p>
      )}
      <div className="player-info">
        <p>Published At: {apiData.published_at}</p>
        <p>Title: {apiData.name}</p>
        <p>Type: {apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
