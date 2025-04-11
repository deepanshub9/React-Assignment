import type { Meta, StoryObj } from "@storybook/react";
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";

SampleMovie.production_countries = [
  { iso_3166_1: "US", name: "United States" },
  { iso_3166_1: "CA", name: "Canada" },
  { iso_3166_1: "GB", name: "United Kingdom" },
];

const meta = { title: "Movie Details Page/MovieDetails", component: MovieDetails } satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: SampleMovie };
Basic.storyName = "Default";
