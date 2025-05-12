# NowFlix - Movie, TV Series & Actor Explorer

NowFlix is a feature-rich React + TypeScript + Vite application for discovering movies, TV series, and actors using the TMDB API. It supports advanced filtering, favourites, themed playlists, fantasy movie creation, reviews, Storybook, and AWS deployment.

Application URL: https://dze2090e9c7gs.cloudfront.net/

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
  - [Building for Production](#building-for-production)
- [Core Functionality](#core-functionality)
  - [Movies, TV Series, and Actors](#movies-tv-series-and-actors)
  - [Filtering and Search](#filtering-and-search)
  - [Favourites](#favourites)
  - [Playlists](#playlists)
  - [Fantasy Movie](#fantasy-movie)
  - [Reviews](#reviews)
  - [Storybook](#storybook)
  - [AWS Deployment](#aws-deployment)
- [Code Examples](#code-examples)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Browse**: Discover movies, TV series, and actors from TMDB.
- **Movie/TV/Actor Details**: View detailed info, similar items, and images.
- **Favourites**: Add/remove favourite movies, TV series, and actors.
- **Reviews**: Write and view reviews for movies and persist in DynamoDB.
- **Fantasy Movie**: Create your own movie with cast, poster, and rich description.
- **Playlists**: Create themed playlists of movies.
- **Extensive Data Hyperlinking**: Navigate between related data.
- **Pagination**: Paginated lists for movies, TV series, and actors.
- **Filter & Sorting, Multi-Criteria Search , Fantasy Movie**
- **Routing**: Public and private routes.
- **Storybook**: Visual test and develop UI components in isolation.
- **AWS Deployment**: Deploy to S3 + CloudFront for global static hosting.

---

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Material UI (MUI)](https://mui.com/) (UI components)
- [React Router v6](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest) (data fetching/caching)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) (drag-and-drop)
- [react-quill](https://github.com/zenoamaro/react-quill) (rich text editor)
- [Storybook](https://storybook.js.org/) (UI component explorer)
- [AWS S3 & CloudFront](https://aws.amazon.com/) (deployment)

---

## Project Structure

```
.
├── public/                # Static assets (logos, images)
├── src/
│   ├── api/               # TMDB API functions
│   ├── assets/            # App images
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React Context providers (favourites, playlists, movies)
│   ├── hooks/             # Custom React hooks
│   ├── images/            # Placeholder images
│   ├── pages/             # Page components (routes)
│   ├── stories/           # Storybook stories
│   ├── types/             # TypeScript interfaces/types
│   ├── index.tsx          # App entry point
│   └── util.ts            # Utility functions
├── .storybook/            # Storybook config
├── .env                   # Environment variables (API keys)
├── package.json           # NPM scripts and dependencies
├── tsconfig.json          # TypeScript config
└── vite.config.ts         # Vite config
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- NPM

### Installation

```sh
git clone https://github.com/yourusername/nowflix.git
cd nowflix
npm install
```

### Environment Variables

Create a `.env` file in the root:

```
VITE_TMDB_KEY=your_tmdb_api_key_here
```

Get your TMDB API key from [TMDB](https://www.themoviedb.org/documentation/api).

### Running the App

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Building for Production

```sh
npm run build
npm run preview
```

---

![Image](https://github.com/user-attachments/assets/04803ef2-0ab2-4d3e-abc4-c52cf0e4a4ca)

![Image](https://github.com/user-attachments/assets/f617eb77-7312-4ecd-b3cb-61187a31e28f)

![Image](https://github.com/user-attachments/assets/8c6e00f7-6ee4-4c8e-b864-2ca1c818650d)

![Image](https://github.com/user-attachments/assets/a044335a-9e58-4615-96b3-3270dfc5fcd8)

![Image](https://github.com/user-attachments/assets/a4b765d5-f3a9-4aef-acb2-09d191f44b8b)

![Image](https://github.com/user-attachments/assets/8fc95e87-1c42-43c4-87c4-4c13cc1d35d5)

![Image](https://github.com/user-attachments/assets/e428fb77-37b4-4ee9-a603-ea85933b2eb7)

![Image](https://github.com/user-attachments/assets/22f51245-2c31-42e0-adbb-4a2f142acda6)

![Image](https://github.com/user-attachments/assets/56839945-b879-46b0-81dd-22f9d81a77b9)

![Image](https://github.com/user-attachments/assets/ef500d50-c169-4d1a-8a5d-73cf651a5dea)

## Core Functionality

### Movies, TV Series, and Actors

- Browse lists of movies, TV series, and actors.
- View details, images, and similar items.
- Example:  
  ![Movie Card Example](public/now-logo1.png)

### Filtering and Search

- Filter movies/TV series by title, genre, and popularity.
- Filter actors by name and popularity.
- Example filter UI usage:
  ```tsx
  <MovieFilterUI
    onFilterValuesChange={changeFilterValues}
    titleFilter={filterValues[0].value}
    genreFilter={filterValues[1].value}
  />
  ```

### Favourites

- Add/remove movies, TV series, and actors to/from favourites.
- Reorder favourite movies with drag-and-drop (`react-beautiful-dnd`).

### Playlists

- Create custom playlists with a title, theme, and selected movies.
- View and delete playlists.
- Example:
  ```tsx
  const { playlists, addPlaylist, removePlaylist } = usePlaylists();
  addPlaylist({
    title: "My Sci-Fi",
    theme: "Sci-Fi",
    movies: [movie1, movie2],
  });
  ```

### Fantasy Movie

- Create your own movie with:
  - Title, genres, release date, runtime, production companies
  - Rich text overview (`react-quill`)
  - Upload a poster (local preview)
  - Add cast members (name, role, description)
- View your fantasy movie on a dedicated page.

### Reviews

- Write reviews for movies.
- View reviews on movie detail pages.

### Storybook

- Develop and test UI components in isolation.
- Run Storybook:
  ```sh
  npm run storybook
  ```
- Access at [http://localhost:6006](http://localhost:6006).

### AWS Deployment

#### Build and Deploy

1. **Build the app:**
   ```sh
   npm run build
   ```
2. **Upload `dist/` to S3:**
   - Create an S3 bucket.
   - Enable static website hosting.
   - Upload contents of `dist/`.
3. **Set up CloudFront:**
   - Create a CloudFront distribution with your S3 bucket as the origin.
   - Set default root object to `index.html`.

---

## Code Examples

### Add a Movie to Favourites

```tsx
import { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";

const { addToFavourites } = useContext(MoviesContext);
addToFavourites(movie);
```

### Create a Playlist

```tsx
import { usePlaylists } from "../contexts/playlistsContext";

const { addPlaylist } = usePlaylists();
addPlaylist({
  title: "Oscar Winners",
  theme: "Drama",
  movies: [movie1, movie2],
});
```

### Fantasy Movie Cast Section

```tsx
{
  fantasyMovie.cast.map((member, idx) => (
    <Box key={idx}>
      <TextField
        label="Name"
        value={member.name}
        onChange={(e) => handleCastChange(idx, "name", e.target.value)}
      />
      {/* ... */}
    </Box>
  ));
}
```

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

---

## License

MIT

---

## Acknowledgements

- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Material UI](https://mui.com/)
- [React Query](https://tanstack.com/query/latest)
- [Storybook](https://storybook.js.org/)
- [AWS S3 & CloudFront](https://aws.amazon.com/)

---

## Contact

For questions, open an issue or contact [yourname@domain.com](mailto:deepanshub096@gmail.com).
