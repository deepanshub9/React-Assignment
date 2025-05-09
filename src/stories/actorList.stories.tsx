import type { Meta, StoryObj } from "@storybook/react";
import ActorList from "../components/actorList";
import { BaseActorProps } from "../types/interfaces";
import { FavouritesProvider } from "../contexts/FavouritesContext";

const sampleActors: BaseActorProps[] = [
  { id: 1, name: "Tom Hanks", popularity: 80, profile_path: "" },
  { id: 2, name: "Scarlett Johansson", popularity: 75, profile_path: "" },
];

const meta = {
  title: "Actor/ActorList",
  component: ActorList,
  args: {
    actors: sampleActors,
    action: () => null,
  },
  decorators: [
    (Story) => (
      <FavouritesProvider>
        <Story />
      </FavouritesProvider>
    ),
  ],
} satisfies Meta<typeof ActorList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};