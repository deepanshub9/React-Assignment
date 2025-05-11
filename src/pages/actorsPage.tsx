import React, { useState } from "react";
import ActorListPageTemplate from "../components/templateActorListPage";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import { BaseActorProps } from "../types/interfaces";
import Pagination from "@mui/material/Pagination";
import ActorFilterUI from "../components/actorFilterUI"; // <-- Import the filter UI

const ActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ name: "", popularity: "" });

  const { data: actors, isLoading, isError } = useQuery(
    ["popularActors", page],
    () => getPopularActors(page)
  );

  // Filtering logic
  let filteredActors: BaseActorProps[] = actors?.results || [];
  if (filters.name) {
    filteredActors = filteredActors.filter((actor) =>
      actor.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }
  if (filters.popularity) {
    filteredActors = filteredActors.filter(
      (actor) => actor.popularity >= Number(filters.popularity)
    );
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching actors.</p>;

return (
  <div style={{ display: "flex", alignItems: "flex-start", minHeight: "100vh", background: "#f5f5f5" }}>
    <div style={{ width: 300, minWidth: 250, marginRight: 24, marginTop: 32 }}>
      <ActorFilterUI
        onFilterValuesChange={setFilters}
        filterValues={filters}
      />
    </div>
    <div style={{ flex: 1, marginTop: 32 }}>
      <ActorListPageTemplate
        actors={filteredActors}
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
    </div>
  </div>
);
};

export default ActorsPage;