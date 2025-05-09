import type { Meta, StoryObj } from "@storybook/react";
import TVSeriesCard from "../components/TVSeriesCard";
import { BaseTvSeriesProps } from "../types/interfaces";
import { FavouritesProvider } from "../contexts/FavouritesContext";
import { MemoryRouter } from "react-router-dom";

const sampleSeries: BaseTvSeriesProps = {
  id: 1,
  name: "Sample Series",
  overview: "A sample TV series.",
  popularity: 50,
  poster_path: "",
  first_air_date: "2020-01-01",
  genre_ids: [],
};

const meta = {
  title: "TVSeries/TVSeriesCard",
  component: TVSeriesCard,
  args: {
    series: { ...sampleSeries, poster_path: "" },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <FavouritesProvider>
          <Story />
        </FavouritesProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof TVSeriesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};