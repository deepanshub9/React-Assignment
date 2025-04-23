import React from "react";
import ActorListPageTemplate from "../components/templateActorListPage";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import { BaseActorProps } from "../types/interfaces";

const ActorsPage: React.FC = () => {
  const { data: actors, isLoading, isError } = useQuery(["popularActors"], getPopularActors);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching actors.</p>;

  return (
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
  );
};

export default ActorsPage;