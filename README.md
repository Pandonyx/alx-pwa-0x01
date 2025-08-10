# alx-project-0x14

## MoviesDatabase API — Overview

The **MoviesDatabase** API (hosted on RapidAPI) provides programmatic access to rich metadata for movies, TV series, episodes, and people (cast & crew). It aggregates title details (year, genres, runtime, plot/overview), credits, images/posters, trailers (YouTube URLs), awards, biographies, and more. The catalog is large (millions of titles and people) and is suitable for search, lookups by IMDb identifiers, and building content discovery features.

> Highlights

* Titles, series, and episode data
* People (actors, directors, writers, etc.) with bios and filmography
* Trailers, images/posters, awards where available
* Text search and ID-based lookups

## Version

The MoviesDatabase documentation on RapidAPI does not expose a versioned base path in the URL at the time of writing. Treat the current API as the **stable public version** and monitor the provider’s RapidAPI page for changes or release notes. If a versioned path (e.g., `/v1`) appears in future samples, prefer the latest stable version.

## Available Endpoints

> Exact endpoint names can vary slightly by update. Use the RapidAPI **Playground** for authoritative names/paths and parameter shapes. Below are the commonly used categories and representative endpoints you’ll find in the MoviesDatabase API:

* **Titles — Search & Details**

  * `GET /titles/search/title` — Full‑text search by title string (e.g., "Inception").
  * `GET /titles/{imdb_id}` — Fetch detailed information for a title by IMDb ID (e.g., `tt1375666`).
  * `GET /titles/{imdb_id}/photos` — Retrieve title images/posters.
  * `GET /titles/{imdb_id}/trailers` — Get trailer URLs when available.
  * `GET /titles/series/{imdb_id}/episodes` — List episodes for a series.

* **People — Search & Details**

  * `GET /people/search/name` — Search people by name.
  * `GET /people/{nconst}` — Get person details by IMDb person ID (e.g., `nm0000138`).
  * `GET /people/{nconst}/filmography` — Filmography for a person.

* **Lists & Discovery**

  * `GET /lists/popular` — Popular titles.
  * `GET /lists/top` — Top or trending charts when provided.
  * `GET /genres` — Available genres.

> Use the **Query Params** shown in the Playground (e.g., `page`, `limit`, `year`, `genre`, etc.) to refine results.

## Request and Response Format

All endpoints are **HTTP GET** (unless otherwise indicated) and return **JSON**.

### Base URL

```
https://moviesdatabase.p.rapidapi.com
```

### Required Headers (via RapidAPI)

```
x-rapidapi-key: <YOUR_RAPIDAPI_KEY>
x-rapidapi-host: moviesdatabase.p.rapidapi.com
```

### Example: Search titles by text

**Request**

```bash
curl --request GET \
  --url 'https://moviesdatabase.p.rapidapi.com/titles/search/title?query=Inception&page=1' \
  --header 'x-rapidapi-key: <YOUR_RAPIDAPI_KEY>' \
  --header 'x-rapidapi-host: moviesdatabase.p.rapidapi.com'
```

**Response (truncated)**

```json
{
  "results": [
    {
      "id": "tt1375666",
      "title": "Inception",
      "type": "movie",
      "year": 2010,
      "genres": ["Action", "Sci-Fi", "Thriller"],
      "runtime": 148,
      "rating": 8.8,
      "overview": "A thief who steals corporate secrets ...",
      "image": {
        "url": "https://.../poster.jpg"
      }
    }
  ],
  "page": 1,
  "total_results": 1,
  "total_pages": 1
}
```

### Example: Get details by IMDb ID

**Request**

```bash
curl --request GET \
  --url 'https://moviesdatabase.p.rapidapi.com/titles/tt1375666' \
  --header 'x-rapidapi-key: <YOUR_RAPIDAPI_KEY>' \
  --header 'x-rapidapi-host: moviesdatabase.p.rapidapi.com'
```

**Response (shape varies by title)**

```json
{
  "id": "tt1375666",
  "title": "Inception",
  "type": "movie",
  "year": 2010,
  "genres": ["Action", "Sci-Fi", "Thriller"],
  "runtime": 148,
  "countries": ["USA", "UK"],
  "languages": ["English", "Japanese", "French"],
  "rating": { "imdb": 8.8, "votes": 2300000 },
  "crew": {
    "directors": [{"id": "nm0634240", "name": "Christopher Nolan"}],
    "writers":   [{"id": "nm0634240", "name": "Christopher Nolan"}]
  },
  "cast": [{"id": "nm0000138", "name": "Leonardo DiCaprio", "as": "Cobb"}],
  "plot": "A thief who steals corporate secrets through dream-sharing technology ...",
  "images": [ {"type": "poster", "url": "https://..."} ],
  "trailers": [ {"site": "YouTube", "url": "https://youtu.be/YoHD9XEInc0"} ]
}
```

> **Note**: Property names can differ slightly per endpoint. Always verify the exact schema in the RapidAPI Playground response.

## Authentication

Requests are authenticated via your **RapidAPI key** passed as headers:

* `x-rapidapi-key`: your personal API key (keep it secret; do not commit to git)
* `x-rapidapi-host`: `moviesdatabase.p.rapidapi.com`

From code, include these headers with each request. Example in TypeScript using `fetch`:

```ts
async function searchTitles(query: string) {
  const url = new URL('https://moviesdatabase.p.rapidapi.com/titles/search/title');
  url.searchParams.set('query', query);
  url.searchParams.set('page', '1');

  const res = await fetch(url.toString(), {
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
      'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as {
    results: Array<{ id: string; title: string; type: string; year?: number }>;
    page: number; total_results: number; total_pages: number;
  };
}
```

## Error Handling

Common HTTP errors you may encounter and how to handle them:

* **400 Bad Request** — Missing/invalid params. Validate inputs and required query params before calling.
* **401 Unauthorized** — Missing or invalid `x-rapidapi-key`. Ensure the header is present and your subscription is active.
* **403 Forbidden** — You may lack access for the requested endpoint/plan.
* **404 Not Found** — Resource or ID does not exist.
* **429 Too Many Requests** — Rate limit exceeded. Implement retries with exponential backoff and/or queueing.
* **5xx Server Errors** — Temporary provider issues. Retry with backoff; surface a friendly message to users.

**TypeScript tip:** define a narrow type for error payloads you expect, and parse defensively (unknown → refine via runtime checks) before using fields.

## Usage Limits and Best Practices

* **Rate limits & quotas** are enforced per your RapidAPI subscription plan for MoviesDatabase. Check the API’s **Pricing** tab on RapidAPI for your exact limits.
* Implement **retry with exponential backoff** on `429` and `5xx` responses.
* Cache frequent lookups (e.g., title details) to reduce calls and latency.
* Debounce client‑side searches to avoid flooding the API.
* Keep your **API key secret**: use environment variables and server‑side proxies instead of exposing keys in front‑end code.
* Validate and narrow types from responses; avoid blindly trusting optional fields.
* Prefer **ID‑based** calls (IMDb IDs like `tt...` and `nm...`) for precision over name searches.
