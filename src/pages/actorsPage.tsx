import React from "react";
import ActorListPageTemplate from "../components/templateActorListPage";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import { BaseActorProps } from "../types/interfaces";
import Pagination from "@mui/material/Pagination";

const ActorsPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const { data: actors, isLoading, isError } = useQuery(
    ["popularActors", page],
    () => getPopularActors(page)
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching actors.</p>;

  return (
    <>
      <ActorListPageTemplate
        actors={actors?.results || []}
        action={(actor: BaseActorProps) => (
          <button
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              border: "none",
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(actor.name)}`;
              window.open(wikipediaUrl, "_blank"); 
            }}
          >
            View Details
          </button>
        )}
      />
      <Pagination
        count={actors ? actors.total_pages : 1}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default ActorsPage;