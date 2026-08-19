// src/vercel-handler.ts
import { handle } from "@hono/node-server/vercel";

// src/modules/albums/controllers/album.controller.ts
import { createRoute, OpenAPIHono, z as z5 } from "@hono/zod-openapi";

// src/common/models/download.model.ts
import { z } from "zod";
var DownloadLinkModel = z.object({
  quality: z.string(),
  url: z.string()
});

// src/modules/artists/models/artist-map.model.ts
import { z as z2 } from "zod";
var ArtistMapAPIResponseModel = z2.object({
  id: z2.string(),
  name: z2.string(),
  role: z2.string(),
  type: z2.string(),
  image: z2.string(),
  perma_url: z2.string()
});
var ArtistMapModel = z2.object({
  id: z2.string(),
  name: z2.string(),
  role: z2.string(),
  type: z2.string(),
  image: z2.array(DownloadLinkModel),
  url: z2.string()
});

// src/modules/songs/models/song.model.ts
import { z as z3 } from "zod";
var SongAPIResponseModel = z3.object({
  id: z3.string(),
  title: z3.string(),
  subtitle: z3.string(),
  header_desc: z3.string(),
  type: z3.string(),
  perma_url: z3.string(),
  image: z3.string(),
  language: z3.string(),
  year: z3.string(),
  play_count: z3.string(),
  explicit_content: z3.string(),
  list_count: z3.string(),
  list_type: z3.string(),
  list: z3.string(),
  more_info: z3.object({
    music: z3.string(),
    album_id: z3.string(),
    album: z3.string(),
    label: z3.string(),
    origin: z3.string(),
    is_dolby_content: z3.boolean(),
    "320kbps": z3.string(),
    encrypted_media_url: z3.string(),
    encrypted_cache_url: z3.string(),
    album_url: z3.string(),
    duration: z3.string(),
    rights: z3.object({
      code: z3.string(),
      cacheable: z3.string(),
      delete_cached_object: z3.string(),
      reason: z3.string()
    }),
    cache_state: z3.string(),
    has_lyrics: z3.string(),
    lyrics_snippet: z3.string(),
    starred: z3.string(),
    copyright_text: z3.string(),
    artistMap: z3.object({
      primary_artists: z3.array(ArtistMapAPIResponseModel),
      featured_artists: z3.array(ArtistMapAPIResponseModel),
      artists: z3.array(ArtistMapAPIResponseModel)
    }),
    release_date: z3.string(),
    label_url: z3.string(),
    vcode: z3.string(),
    vlink: z3.string(),
    triller_available: z3.boolean(),
    request_jiotune_flag: z3.boolean(),
    webp: z3.string(),
    lyrics_id: z3.string()
  })
});
var SongModel = z3.object({
  id: z3.string(),
  name: z3.string(),
  type: z3.string(),
  year: z3.string().nullable(),
  releaseDate: z3.string().nullable(),
  duration: z3.number().nullable(),
  label: z3.string().nullable(),
  explicitContent: z3.boolean(),
  playCount: z3.number().nullable(),
  language: z3.string(),
  hasLyrics: z3.boolean(),
  lyricsId: z3.string().nullable(),
  url: z3.string(),
  copyright: z3.string().nullable(),
  album: z3.object({
    id: z3.string().nullable(),
    name: z3.string().nullable(),
    url: z3.string().nullable()
  }),
  artists: z3.object({
    primary: z3.array(ArtistMapModel),
    featured: z3.array(ArtistMapModel),
    all: z3.array(ArtistMapModel)
  }),
  image: z3.array(DownloadLinkModel),
  downloadUrl: z3.array(DownloadLinkModel)
});

// src/modules/albums/models/album.model.ts
import { z as z4 } from "zod";
var AlbumAPIResponseModel = z4.object({
  id: z4.string(),
  title: z4.string(),
  subtitle: z4.string(),
  header_desc: z4.string(),
  type: z4.string(),
  perma_url: z4.string(),
  image: z4.string(),
  language: z4.string(),
  year: z4.string(),
  play_count: z4.string(),
  explicit_content: z4.string(),
  list_count: z4.string(),
  list_type: z4.string(),
  list: z4.array(SongAPIResponseModel),
  more_info: z4.object({
    artistMap: SongAPIResponseModel.shape.more_info.shape.artistMap,
    song_count: z4.string(),
    copyright_text: z4.string(),
    is_dolby_content: z4.boolean(),
    label_url: z4.string()
  })
});
var AlbumModel = z4.object({
  id: z4.string(),
  name: z4.string(),
  description: z4.string(),
  year: z4.number().nullable(),
  type: z4.string(),
  playCount: z4.number().nullable(),
  language: z4.string(),
  explicitContent: z4.boolean(),
  artists: z4.object(SongModel.shape.artists.shape),
  songCount: z4.number().nullable(),
  url: z4.string(),
  image: z4.array(DownloadLinkModel),
  songs: z4.array(SongModel).nullable()
});

// src/common/constants/endpoint.constant.ts
var Endpoints = {
  search: {
    all: "autocomplete.get",
    songs: "search.getResults",
    albums: "search.getAlbumResults",
    artists: "search.getArtistResults",
    playlists: "search.getPlaylistResults"
  },
  songs: {
    id: "song.getDetails",
    link: "webapi.get",
    suggestions: "webradio.getSong",
    lyrics: "lyrics.getLyrics",
    station: "webradio.createEntityStation"
  },
  albums: {
    id: "content.getAlbumDetails",
    link: "webapi.get"
  },
  artists: {
    id: "artist.getArtistPageDetails",
    link: "webapi.get",
    songs: "artist.getArtistMoreSong",
    albums: "artist.getArtistMoreAlbum"
  },
  playlists: {
    id: "playlist.getDetails",
    link: "webapi.get"
  },
  modules: "content.getBrowseModules",
  trending: "content.getTrending"
};

// src/common/constants/user-agents.constant.ts
var userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/1.8.4 Chrome/130.0.6723.191 Electron/33.3.2 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:136.0) Gecko/20100101 Firefox/136.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3.1 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/1.8.3 Chrome/130.0.6723.191 Electron/33.3.2 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 YaBrowser/25.2.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/27.0 Chrome/125.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/1.8.9 Chrome/132.0.6834.210 Electron/34.3.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64; rv:136.0) Gecko/20100101 Firefox/136.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36",
  "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.58 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/134.0.6998.99 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:136.0) Gecko/20100101 Firefox/136.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/1.7.7 Chrome/128.0.6613.186 Electron/32.2.5 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.132 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  "Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/1.8.9 Chrome/132.0.6834.210 Electron/34.3.2 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/1.8.9 Chrome/132.0.6834.210 Electron/34.3.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/1.6.5 Chrome/124.0.6367.243 Electron/30.1.2 Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:135.0) Gecko/20100101 Firefox/135.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.92 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64; rv:135.0) Gecko/20100101 Firefox/135.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/1.8.4 Chrome/130.0.6723.191 Electron/33.3.2 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
];

// src/common/helpers/fetch.helper.ts
var useFetch = async ({ endpoint, params, context }) => {
  const url = new URL("https://www.jiosaavn.com/api.php");
  url.searchParams.append("__call", endpoint.toString());
  url.searchParams.append("_format", "json");
  url.searchParams.append("_marker", "0");
  url.searchParams.append("api_version", "4");
  url.searchParams.append("ctx", context || "web6dot0");
  Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));
  const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  const response = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json", "User-Agent": randomUserAgent }
  });
  const data = await response.json();
  return { data, ok: response.ok };
};

// src/common/helpers/link.helper.ts
import crypto from "node-forge";
var createDownloadLinks = (encryptedMediaUrl) => {
  if (!encryptedMediaUrl) return [];
  const qualities = [
    { id: "_12", bitrate: "12kbps" },
    { id: "_48", bitrate: "48kbps" },
    { id: "_96", bitrate: "96kbps" },
    { id: "_160", bitrate: "160kbps" },
    { id: "_320", bitrate: "320kbps" }
  ];
  const key = "38346591";
  const iv = "00000000";
  const encrypted = crypto.util.decode64(encryptedMediaUrl);
  const decipher = crypto.cipher.createDecipher("DES-ECB", crypto.util.createBuffer(key));
  decipher.start({ iv: crypto.util.createBuffer(iv) });
  decipher.update(crypto.util.createBuffer(encrypted));
  decipher.finish();
  const decryptedLink = decipher.output.getBytes();
  return qualities.map((quality) => ({
    quality: quality.bitrate,
    url: decryptedLink.replace("_96", quality.id)
  }));
};
var createImageLinks = (link) => {
  if (!link) return [];
  const qualities = ["50x50", "150x150", "500x500"];
  const qualityRegex = /150x150|50x50/;
  const protocolRegex = /^http:\/\//;
  return qualities.map((quality) => ({
    quality,
    url: link.replace(qualityRegex, quality).replace(protocolRegex, "https://")
  }));
};

// src/modules/songs/helpers/song.helper.ts
var createSongPayload = (song) => ({
  id: song.id,
  name: song.title,
  type: song.type,
  year: song.year || null,
  releaseDate: song.more_info?.release_date || null,
  duration: song.more_info?.duration ? Number(song.more_info?.duration) : null,
  label: song.more_info?.label || null,
  explicitContent: song.explicit_content === "1",
  playCount: song.play_count ? Number(song.play_count) : null,
  language: song.language,
  hasLyrics: song.more_info?.has_lyrics === "true",
  lyricsId: song.more_info?.lyrics_id || null,
  url: song.perma_url,
  copyright: song.more_info?.copyright_text || null,
  album: {
    id: song.more_info?.album_id || null,
    name: song.more_info?.album || null,
    url: song.more_info?.album_url || null
  },
  artists: {
    primary: song.more_info?.artistMap?.primary_artists?.map(createArtistMapPayload),
    featured: song.more_info?.artistMap?.featured_artists?.map(createArtistMapPayload),
    all: song.more_info?.artistMap?.artists?.map(createArtistMapPayload)
  },
  image: createImageLinks(song.image),
  downloadUrl: createDownloadLinks(song.more_info?.encrypted_media_url)
});

// src/modules/artists/helpers/artist.helper.ts
var createArtistPayload = (artist) => ({
  id: artist.artistId || artist.id,
  name: artist.name,
  url: artist.urls?.overview || artist.perma_url,
  type: artist.type,
  followerCount: artist.follower_count ? Number(artist.follower_count) : null,
  fanCount: artist.fan_count || null,
  isVerified: artist.isVerified || null,
  dominantLanguage: artist.dominantLanguage || null,
  dominantType: artist.dominantType || null,
  bio: artist.bio ? JSON.parse(artist.bio) : null,
  dob: artist.dob || null,
  fb: artist.fb || null,
  twitter: artist.twitter || null,
  wiki: artist.wiki || null,
  availableLanguages: artist.availableLanguages || null,
  isRadioPresent: artist.isRadioPresent || null,
  image: createImageLinks(artist.image),
  topSongs: artist.topSongs?.map(createSongPayload) || null,
  topAlbums: artist.topAlbums?.map(createAlbumPayload) || null,
  singles: artist.singles?.map(createSongPayload) || null,
  similarArtists: artist.similarArtists?.map((similarArtist) => ({
    id: similarArtist.id,
    name: similarArtist.name,
    url: similarArtist.perma_url,
    image: createImageLinks(similarArtist.image_url),
    languages: similarArtist.languages ? JSON.parse(similarArtist.languages) : null,
    wiki: similarArtist.wiki,
    dob: similarArtist.dob,
    fb: similarArtist.fb,
    twitter: similarArtist.twitter,
    isRadioPresent: similarArtist.isRadioPresent,
    type: similarArtist.type,
    dominantType: similarArtist.dominantType,
    aka: similarArtist.aka,
    bio: similarArtist.bio ? JSON.parse(similarArtist.bio) : null,
    similarArtists: similarArtist.similar ? JSON.parse(similarArtist.similar) : null
  })) || null
});
var createArtistMapPayload = (artist) => ({
  id: artist.id,
  name: artist.name,
  role: artist.role,
  image: createImageLinks(artist.image),
  type: artist.type,
  url: artist.perma_url
});

// src/modules/albums/helpers/album.helper.ts
var createAlbumPayload = (album) => ({
  id: album.id,
  name: album.title,
  description: album.header_desc,
  type: album.type,
  year: album.year ? Number(album.year) : null,
  playCount: album.play_count ? Number(album.play_count) : null,
  language: album.language,
  explicitContent: album.explicit_content === "1",
  url: album.perma_url,
  songCount: album.more_info.song_count ? Number(album.more_info.song_count) : null,
  artists: {
    primary: album.more_info?.artistMap?.primary_artists?.map(createArtistMapPayload),
    featured: album.more_info?.artistMap?.featured_artists?.map(createArtistMapPayload),
    all: album.more_info?.artistMap?.artists?.map(createArtistMapPayload)
  },
  image: createImageLinks(album.image),
  songs: album.list && album.list?.map(createSongPayload) || null
});

// src/modules/albums/use-cases/get-album-by-id/get-album-by-id.use-case.ts
import { HTTPException } from "hono/http-exception";
var GetAlbumByIdUseCase = class {
  constructor() {
  }
  async execute(id) {
    const { data } = await useFetch({
      endpoint: Endpoints.albums.id,
      params: { albumid: id }
    });
    if (!data) throw new HTTPException(404, { message: "album not found" });
    return createAlbumPayload(data);
  }
};

// src/modules/albums/use-cases/get-album-by-link/get-album-by-link.use-case.ts
import { HTTPException as HTTPException2 } from "hono/http-exception";
var GetAlbumByLinkUseCase = class {
  constructor() {
  }
  async execute(token) {
    const { data } = await useFetch({
      endpoint: Endpoints.albums.link,
      params: {
        token,
        type: "album"
      }
    });
    if (!data) throw new HTTPException2(404, { message: "album not found" });
    return createAlbumPayload(data);
  }
};

// src/modules/albums/services/album.service.ts
var AlbumService = class {
  getAlbumByIdUseCase;
  getAlbumByLinkUseCase;
  constructor() {
    this.getAlbumByIdUseCase = new GetAlbumByIdUseCase();
    this.getAlbumByLinkUseCase = new GetAlbumByLinkUseCase();
  }
  getAlbumById = (albumId) => {
    return this.getAlbumByIdUseCase.execute(albumId);
  };
  getAlbumByLink = (albumLink) => {
    return this.getAlbumByLinkUseCase.execute(albumLink);
  };
};

// src/modules/albums/controllers/album.controller.ts
var AlbumController = class {
  controller;
  albumService;
  constructor() {
    this.controller = new OpenAPIHono();
    this.albumService = new AlbumService();
  }
  initRoutes() {
    this.controller.openapi(
      createRoute({
        method: "get",
        path: "/albums",
        tags: ["Album"],
        summary: "Retrieve an album by ID or link",
        description: "Retrieve an album by providing either an ID or a direct link to the album on JioSaavn.",
        operationId: "getAlbumByIdOrLink",
        request: {
          query: z5.object({
            id: z5.string().optional().openapi({
              title: "Album ID",
              description: "The unique ID of the album",
              type: "string",
              example: "23241654",
              default: "23241654"
            }),
            link: z5.string().url().optional().transform((value) => value?.match(/jiosaavn\.com\/album\/[^/]+\/([^/]+)$/)?.[1]).openapi({
              title: "Album Link",
              description: "A direct link to the album on JioSaavn",
              type: "string",
              example: "https://www.jiosaavn.com/album/future-nostalgia/ITIyo-GDr7A_",
              default: "https://www.jiosaavn.com/album/future-nostalgia/ITIyo-GDr7A_"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with album details",
            content: {
              "application/json": {
                schema: z5.object({
                  success: z5.boolean().openapi({
                    description: "Indicates the success status of the request.",
                    type: "boolean",
                    example: true
                  }),
                  data: AlbumModel.openapi({
                    title: "Album Details",
                    description: "The detailed information of the album."
                  })
                })
              }
            }
          },
          400: { description: "Bad request due to missing or invalid query parameters." },
          404: { description: "The album could not be found with the provided ID or link." }
        }
      }),
      async (ctx) => {
        const { id, link } = ctx.req.valid("query");
        const response = link ? await this.albumService.getAlbumByLink(link) : await this.albumService.getAlbumById(id);
        return ctx.json({ success: true, data: response });
      }
    );
  }
};

// src/modules/search/controllers/search.controller.ts
import { createRoute as createRoute2, OpenAPIHono as OpenAPIHono2, z as z11 } from "@hono/zod-openapi";

// src/modules/search/models/search.model.ts
import { z as z6 } from "zod";
var SearchAPIResponseModel = z6.object({
  albums: z6.object({
    data: z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        subtitle: z6.string(),
        type: z6.string(),
        image: z6.string(),
        perma_url: z6.string(),
        more_info: z6.object({
          music: z6.string(),
          ctr: z6.number(),
          year: z6.string(),
          is_movie: z6.string(),
          language: z6.string(),
          song_pids: z6.string()
        }),
        explicit_content: z6.string(),
        mini_obj: z6.boolean(),
        description: z6.string()
      })
    ),
    position: z6.number()
  }),
  songs: z6.object({
    data: z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        subtitle: z6.string(),
        type: z6.string(),
        image: z6.string(),
        perma_url: z6.string(),
        more_info: z6.object({
          album: z6.string(),
          ctr: z6.number(),
          score: z6.string().optional(),
          vcode: z6.string(),
          vlink: z6.string().optional(),
          primary_artists: z6.string(),
          singers: z6.string(),
          video_available: z6.boolean(),
          triller_available: z6.boolean(),
          language: z6.string()
        }),
        explicit_content: z6.string(),
        mini_obj: z6.boolean(),
        description: z6.string()
      })
    ),
    position: z6.number()
  }),
  playlists: z6.object({
    data: z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        subtitle: z6.string(),
        type: z6.string(),
        image: z6.string(),
        perma_url: z6.string(),
        more_info: z6.object({
          firstname: z6.string(),
          artist_name: z6.array(z6.string()),
          entity_type: z6.string(),
          entity_sub_type: z6.string(),
          video_available: z6.boolean(),
          is_dolby_content: z6.boolean(),
          sub_types: z6.any(),
          images: z6.any(),
          lastname: z6.string(),
          language: z6.string()
        }),
        explicit_content: z6.string(),
        mini_obj: z6.boolean(),
        description: z6.string()
      })
    ),
    position: z6.number()
  }),
  artists: z6.object({
    data: z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        image: z6.string(),
        extra: z6.string(),
        type: z6.string(),
        mini_obj: z6.boolean(),
        isRadioPresent: z6.boolean(),
        ctr: z6.number(),
        entity: z6.number(),
        description: z6.string(),
        position: z6.number()
      })
    ),
    position: z6.number()
  }),
  topquery: z6.object({
    data: z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        subtitle: z6.string(),
        type: z6.string(),
        image: z6.string(),
        perma_url: z6.string(),
        more_info: z6.object({
          album: z6.string(),
          ctr: z6.number(),
          score: z6.string().optional(),
          vcode: z6.string(),
          vlink: z6.string(),
          primary_artists: z6.string(),
          singers: z6.string(),
          video_available: z6.boolean(),
          triller_available: z6.boolean(),
          language: z6.string()
        }),
        explicit_content: z6.string().optional(),
        mini_obj: z6.boolean(),
        description: z6.string()
      })
    ),
    position: z6.number()
  })
});
var SearchResponseModel = (model) => z6.object({
  results: model,
  position: z6.number()
});
var SearchModel = z6.object({
  albums: SearchResponseModel(
    z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        image: z6.array(DownloadLinkModel),
        artist: z6.string(),
        url: z6.string(),
        type: z6.string(),
        description: z6.string(),
        year: z6.string(),
        language: z6.string(),
        songIds: z6.string()
      })
    )
  ),
  songs: SearchResponseModel(
    z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        image: z6.array(DownloadLinkModel),
        album: z6.string(),
        url: z6.string(),
        type: z6.string(),
        description: z6.string(),
        primaryArtists: z6.string(),
        singers: z6.string(),
        language: z6.string()
      })
    )
  ),
  artists: SearchResponseModel(
    z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        image: z6.array(DownloadLinkModel),
        type: z6.string(),
        description: z6.string(),
        position: z6.number()
      })
    )
  ),
  playlists: SearchResponseModel(
    z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        image: z6.array(DownloadLinkModel),
        url: z6.string(),
        language: z6.string(),
        type: z6.string(),
        description: z6.string()
      })
    )
  ),
  topQuery: SearchResponseModel(
    z6.array(
      z6.object({
        id: z6.string(),
        title: z6.string(),
        image: z6.array(DownloadLinkModel),
        album: z6.string(),
        url: z6.string(),
        type: z6.string(),
        description: z6.string(),
        primaryArtists: z6.string(),
        singers: z6.string(),
        language: z6.string()
      })
    )
  )
});

// src/modules/search/models/search-artist.model.ts
import { z as z7 } from "zod";
var SearchArtistAPIResponseModel = z7.object({
  total: z7.number(),
  start: z7.number(),
  results: z7.array(
    z7.object({
      name: z7.string(),
      id: z7.string(),
      ctr: z7.number(),
      entity: z7.number(),
      image: z7.string().url(),
      role: z7.string(),
      perma_url: z7.string().url(),
      type: z7.string(),
      mini_obj: z7.boolean(),
      isRadioPresent: z7.boolean(),
      is_followed: z7.boolean()
    })
  )
});
var SearchArtistModel = z7.object({
  total: z7.number(),
  start: z7.number(),
  results: z7.array(
    z7.object({
      id: z7.string(),
      name: z7.string(),
      role: z7.string(),
      type: z7.string(),
      image: z7.array(DownloadLinkModel),
      url: z7.string()
    })
  )
});

// src/modules/search/models/search-song.model.ts
import { z as z8 } from "zod";
var SearchSongAPIResponseModel = z8.object({
  total: z8.number(),
  start: z8.number(),
  results: z8.array(SongAPIResponseModel)
});
var SearchSongModel = z8.object({
  total: z8.number(),
  start: z8.number(),
  results: z8.array(SongModel)
});

// src/modules/search/models/search-album.model.ts
import { z as z9 } from "zod";
var SearchAlbumAPIResponseModel = z9.object({
  total: z9.number(),
  start: z9.number(),
  results: z9.array(
    z9.object({
      id: z9.string(),
      title: z9.string(),
      subtitle: z9.string(),
      header_desc: z9.string(),
      type: z9.string(),
      perma_url: z9.string(),
      image: z9.string(),
      language: z9.string(),
      year: z9.string(),
      play_count: z9.string(),
      explicit_content: z9.string(),
      list_count: z9.string(),
      list_type: z9.string(),
      list: z9.array(SongAPIResponseModel),
      more_info: z9.object({
        query: z9.string(),
        text: z9.string(),
        music: z9.string(),
        song_count: z9.string(),
        artistMap: SongAPIResponseModel.shape.more_info.shape.artistMap
      })
    })
  )
});
var SearchAlbumModel = z9.object({
  total: z9.number(),
  start: z9.number(),
  results: z9.array(
    z9.object({
      id: z9.string(),
      name: z9.string(),
      description: z9.string(),
      year: z9.number().nullable(),
      type: z9.string(),
      playCount: z9.number().nullable(),
      language: z9.string(),
      explicitContent: z9.boolean(),
      artists: z9.object(SongModel.shape.artists.shape),
      url: z9.string(),
      image: z9.array(DownloadLinkModel)
    })
  )
});

// src/modules/search/models/search-playlist.model.ts
import { z as z10 } from "zod";
var SearchPlaylistAPIResponseModel = z10.object({
  total: z10.number(),
  start: z10.number(),
  results: z10.array(
    z10.object({
      id: z10.string(),
      title: z10.string(),
      subtitle: z10.string(),
      type: z10.string(),
      image: z10.string(),
      perma_url: z10.string(),
      more_info: z10.object({
        uid: z10.string(),
        firstname: z10.string(),
        artist_name: z10.any(),
        entity_type: z10.string(),
        entity_sub_type: z10.string(),
        video_available: z10.boolean(),
        is_dolby_content: z10.any(),
        sub_types: z10.any(),
        images: z10.any(),
        lastname: z10.string(),
        song_count: z10.string(),
        language: z10.string()
      }),
      explicit_content: z10.string(),
      mini_obj: z10.boolean(),
      numsongs: z10.any()
    })
  )
});
var SearchPlaylistModel = z10.object({
  total: z10.number(),
  start: z10.number(),
  results: z10.array(
    // TODO: Do this for all search models
    z10.object({
      id: z10.string(),
      name: z10.string(),
      type: z10.string(),
      image: z10.array(DownloadLinkModel),
      url: z10.string(),
      songCount: z10.number().nullable(),
      language: z10.string(),
      explicitContent: z10.boolean()
    })
  )
});

// src/modules/search/helpers/search.helper.ts
var createSearchPayload = (search) => ({
  topQuery: {
    results: search?.topquery?.data.map((item) => {
      return {
        id: item?.id,
        title: item?.title,
        image: createImageLinks(item?.image),
        album: item?.more_info?.album,
        url: item?.perma_url,
        type: item?.type,
        language: item?.more_info?.language,
        description: item?.description,
        primaryArtists: item?.more_info?.primary_artists,
        singers: item?.more_info?.singers
      };
    }),
    position: search?.topquery?.position
  },
  songs: {
    results: search?.songs?.data.map((song) => {
      return {
        id: song?.id,
        title: song?.title,
        image: createImageLinks(song?.image),
        album: song?.more_info.album,
        url: song?.perma_url,
        type: song?.type,
        description: song?.description,
        primaryArtists: song?.more_info?.primary_artists,
        singers: song?.more_info?.singers,
        language: song?.more_info?.language
      };
    }),
    position: search.songs.position
  },
  albums: {
    results: search?.albums?.data.map((album) => {
      return {
        id: album?.id,
        title: album?.title,
        image: createImageLinks(album.image),
        artist: album?.more_info.music,
        url: album?.perma_url,
        type: album?.type,
        description: album?.description,
        year: album?.more_info?.year,
        songIds: album?.more_info?.song_pids,
        language: album?.more_info?.language
      };
    }),
    position: search?.albums?.position
  },
  artists: {
    results: search?.artists?.data.map((artist) => {
      return {
        id: artist?.id,
        title: artist?.title,
        image: createImageLinks(artist?.image),
        type: artist?.type,
        description: artist?.description,
        position: artist?.position
      };
    }),
    position: search?.artists?.position
  },
  playlists: {
    results: search?.playlists?.data.map((playlist) => {
      return {
        id: playlist?.id,
        title: playlist?.title,
        image: createImageLinks(playlist.image),
        url: playlist?.perma_url,
        type: playlist?.type,
        language: playlist?.more_info?.language,
        description: playlist?.description
      };
    }),
    position: search?.playlists?.position
  }
});
var createSearchPlaylistPayload = (playlist) => ({
  total: Number(playlist.total),
  start: Number(playlist.start),
  results: playlist.results.map((item) => ({
    id: item.id,
    name: item.title,
    type: item.type,
    image: createImageLinks(item.image),
    url: item.perma_url,
    songCount: item.more_info.song_count ? Number(item.more_info.song_count) : null,
    language: item.more_info.language,
    explicitContent: item.explicit_content === "1"
  }))
});
var createSearchAlbumPayload = (album) => ({
  total: Number(album.total),
  start: Number(album.start),
  results: album.results.map((item) => ({
    id: item.id,
    name: item.title,
    description: item.header_desc,
    url: item.perma_url,
    year: item.year ? Number(item.year) : null,
    type: item.type,
    playCount: item.play_count ? Number(item.play_count) : null,
    language: item.language,
    explicitContent: item.explicit_content === "1",
    artists: {
      primary: item.more_info?.artistMap?.primary_artists?.map(createArtistMapPayload),
      featured: item.more_info?.artistMap?.featured_artists?.map(createArtistMapPayload),
      all: item.more_info?.artistMap?.artists?.map(createArtistMapPayload)
    },
    image: createImageLinks(item.image)
  }))
});

// src/modules/search/use-cases/search-all/search-all.use-case.ts
import { HTTPException as HTTPException3 } from "hono/http-exception";
var SearchAllUseCase = class {
  async execute(query) {
    const { data } = await useFetch({
      endpoint: Endpoints.search.all,
      params: { query }
    });
    if (!data) throw new HTTPException3(404, { message: `no results found for ${query}` });
    return createSearchPayload(data);
  }
};

// src/modules/search/use-cases/search-albums/search-albums.use-case.ts
var SearchAlbumsUseCase = class {
  constructor() {
  }
  async execute({ query, limit, page }) {
    const { data } = await useFetch({
      endpoint: Endpoints.search.albums,
      params: {
        q: query,
        p: page,
        n: limit
      }
    });
    return createSearchAlbumPayload(data);
  }
};

// src/modules/search/use-cases/search-songs/search-songs.use-case.ts
var SearchSongsUseCase = class {
  constructor() {
  }
  async execute({ query, limit, page }) {
    const { data } = await useFetch({
      endpoint: Endpoints.search.songs,
      params: {
        q: query,
        p: page,
        n: limit
      }
    });
    return {
      total: data.total,
      start: data.start,
      results: data.results?.map(createSongPayload).slice(0, limit) || []
    };
  }
};

// src/modules/search/use-cases/search-artists/search-artists.use-case.ts
import { HTTPException as HTTPException4 } from "hono/http-exception";
var SearchArtistsUseCase = class {
  constructor() {
  }
  async execute({ query, limit, page }) {
    const { data } = await useFetch({
      endpoint: Endpoints.search.artists,
      params: {
        q: query,
        p: page,
        n: limit
      }
    });
    if (!data) throw new HTTPException4(404, { message: "artist not found" });
    return {
      total: data.total,
      start: data.start,
      results: data.results?.map(createArtistMapPayload).slice(0, limit) || []
    };
  }
};

// src/modules/search/use-cases/search-playlists/search-playlists.use-case.ts
import { HTTPException as HTTPException5 } from "hono/http-exception";
var SearchPlaylistsUseCase = class {
  constructor() {
  }
  async execute({ query, limit, page }) {
    const { data } = await useFetch({
      endpoint: Endpoints.search.playlists,
      params: {
        q: query,
        p: page,
        n: limit
      }
    });
    if (!data) throw new HTTPException5(404, { message: "playlist not found" });
    return createSearchPlaylistPayload(data);
  }
};

// src/modules/search/services/search.service.ts
var SearchService = class {
  searchAllUseCase;
  searchSongsUseCase;
  searchAlbumsUseCase;
  searchArtistsUseCase;
  searchPlaylistsUseCase;
  constructor() {
    this.searchAllUseCase = new SearchAllUseCase();
    this.searchSongsUseCase = new SearchSongsUseCase();
    this.searchAlbumsUseCase = new SearchAlbumsUseCase();
    this.searchArtistsUseCase = new SearchArtistsUseCase();
    this.searchPlaylistsUseCase = new SearchPlaylistsUseCase();
  }
  searchAll = (query) => {
    return this.searchAllUseCase.execute(query);
  };
  searchSongs = (args) => {
    return this.searchSongsUseCase.execute(args);
  };
  searchAlbums = (args) => {
    return this.searchAlbumsUseCase.execute(args);
  };
  searchArtists = (args) => {
    return this.searchArtistsUseCase.execute(args);
  };
  searchPlaylists = (args) => {
    return this.searchPlaylistsUseCase.execute(args);
  };
};

// src/modules/search/controllers/search.controller.ts
var SearchController = class {
  controller;
  searchService;
  constructor() {
    this.controller = new OpenAPIHono2();
    this.searchService = new SearchService();
  }
  initRoutes() {
    this.controller.openapi(
      createRoute2({
        method: "get",
        path: "/search",
        tags: ["Search"],
        summary: "Global search",
        description: "Search for songs, albums, artists, and playlists based on the provided query string.",
        operationId: "globalSearch",
        request: {
          query: z11.object({
            query: z11.string().openapi({
              title: "Search query",
              description: "Search query",
              type: "string",
              example: "Imagine Dragons"
            })
          })
        },
        responses: {
          200: {
            description: "Successful global search",
            content: {
              "application/json": {
                schema: z11.object({
                  success: z11.boolean().openapi({
                    description: "Indicates whether the search was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: SearchModel.openapi({
                    description: "Search results including songs, albums, artists, and playlists"
                  })
                })
              }
            }
          }
        }
      }),
      async (ctx) => {
        const { query } = ctx.req.valid("query");
        const result = await this.searchService.searchAll(query);
        return ctx.json({ success: true, data: result });
      }
    );
    this.controller.openapi(
      createRoute2({
        method: "get",
        path: "/search/songs",
        tags: ["Search"],
        summary: "Search for songs",
        description: "Search for songs based on the provided query",
        operationId: "searchSongs",
        request: {
          query: z11.object({
            query: z11.string().openapi({
              title: "Search query",
              description: "Search query for songs",
              type: "string",
              example: "Believer"
            }),
            page: z11.string().pipe(z11.coerce.number()).optional().openapi({
              title: "Page Number",
              description: "The page number of the search results to retrieve",
              type: "integer",
              example: "0",
              default: "0"
            }),
            limit: z11.string().pipe(z11.coerce.number()).optional().openapi({
              title: "Limit",
              description: "Number of search results per page",
              type: "integer",
              example: "10",
              default: "10"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with song search results",
            content: {
              "application/json": {
                schema: z11.object({
                  success: z11.boolean().openapi({
                    description: "Indicates whether the song search was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: SearchSongModel.openapi({
                    description: "Search results for songs"
                  })
                })
              }
            }
          }
        }
      }),
      async (ctx) => {
        const { query, page, limit } = ctx.req.valid("query");
        const result = await this.searchService.searchSongs({ query, page: page || 0, limit: limit || 10 });
        return ctx.json({ success: true, data: result });
      }
    );
    this.controller.openapi(
      createRoute2({
        method: "get",
        path: "/search/albums",
        tags: ["Search"],
        summary: "Search for albums",
        description: "Search for albums based on the provided query",
        operationId: "searchAlbums",
        request: {
          query: z11.object({
            query: z11.string().openapi({
              description: "Search query for albums",
              type: "string",
              example: "Evolve"
            }),
            page: z11.string().pipe(z11.coerce.number()).optional().openapi({
              description: "The page number of the search results to retrieve",
              type: "integer",
              example: "0",
              default: "0"
            }),
            limit: z11.string().pipe(z11.coerce.number()).optional().openapi({
              description: "The number of search results per page",
              type: "integer",
              example: "10",
              default: "10"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with album search results",
            content: {
              "application/json": {
                schema: z11.object({
                  success: z11.boolean().openapi({
                    description: "Indicates whether the album search was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: SearchAlbumModel.openapi({
                    description: "Search results for albums"
                  })
                })
              }
            }
          }
        }
      }),
      async (ctx) => {
        const { query, page, limit } = ctx.req.valid("query");
        const result = await this.searchService.searchAlbums({ query, page: page || 0, limit: limit || 10 });
        return ctx.json({ success: true, data: result });
      }
    );
    this.controller.openapi(
      createRoute2({
        method: "get",
        path: "/search/artists",
        tags: ["Search"],
        summary: "Search for artists",
        description: "Search for artists based on the provided query",
        operationId: "searchArtists",
        request: {
          query: z11.object({
            query: z11.string().openapi({
              title: "Search query",
              description: "Search query for artists",
              type: "string",
              example: "Adele"
            }),
            page: z11.string().pipe(z11.coerce.number()).optional().openapi({
              title: "Page Number",
              description: "The page number of the search results to retrieve",
              type: "integer",
              example: "0",
              default: "0"
            }),
            limit: z11.string().pipe(z11.coerce.number()).optional().openapi({
              title: "Limit",
              description: "Number of search results per page",
              type: "integer",
              example: "10",
              default: "10"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with artist search results",
            content: {
              "application/json": {
                schema: z11.object({
                  success: z11.boolean().openapi({
                    description: "Indicates whether the artist search was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: SearchArtistModel.openapi({
                    description: "Search results for artists"
                  })
                })
              }
            }
          }
        }
      }),
      async (ctx) => {
        const { query, page, limit } = ctx.req.valid("query");
        const result = await this.searchService.searchArtists({ query, page: page || 0, limit: limit || 10 });
        return ctx.json({ success: true, data: result });
      }
    );
    this.controller.openapi(
      createRoute2({
        method: "get",
        path: "/search/playlists",
        tags: ["Search"],
        summary: "Search for playlists",
        description: "Search for playlists based on the provided query",
        operationId: "searchPlaylists",
        request: {
          query: z11.object({
            query: z11.string().openapi({
              title: "Search query",
              description: "Search query for playlists",
              type: "string",
              example: "Indie"
            }),
            page: z11.string().pipe(z11.coerce.number()).optional().openapi({
              title: "Page Number",
              description: "The page number of the search results to retrieve",
              type: "integer",
              example: "0",
              default: "0"
            }),
            limit: z11.string().pipe(z11.coerce.number()).optional().openapi({
              title: "Limit",
              description: "Number of search results per page",
              type: "integer",
              example: "10",
              default: "10"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with playlist search results",
            content: {
              "application/json": {
                schema: z11.object({
                  success: z11.boolean().openapi({
                    description: "Indicates whether the playlist search was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: SearchPlaylistModel.openapi({
                    description: "Search results for playlist"
                  })
                })
              }
            }
          }
        }
      }),
      async (ctx) => {
        const { query, page, limit } = ctx.req.valid("query");
        const result = await this.searchService.searchPlaylists({ query, page: page || 0, limit: limit || 10 });
        return ctx.json({ success: true, data: result });
      }
    );
  }
};

// src/modules/songs/controllers/song.controller.ts
import { createRoute as createRoute3, OpenAPIHono as OpenAPIHono3 } from "@hono/zod-openapi";

// src/modules/songs/use-cases/get-song-by-id/get-song-by-id.use-case.ts
import { HTTPException as HTTPException6 } from "hono/http-exception";
var GetSongByIdUseCase = class {
  constructor() {
  }
  async execute({ songIds }) {
    const { data } = await useFetch({
      endpoint: Endpoints.songs.id,
      params: {
        pids: songIds
      }
    });
    if (!data.songs?.length) throw new HTTPException6(404, { message: "song not found" });
    const songs = data.songs.map((song) => createSongPayload(song));
    return songs;
  }
};

// src/modules/songs/use-cases/get-song-by-link/get-song-by-link.use-case.ts
import { HTTPException as HTTPException7 } from "hono/http-exception";
var GetSongByLinkUseCase = class {
  constructor() {
  }
  async execute(token) {
    const { data } = await useFetch({
      endpoint: Endpoints.songs.link,
      params: { token, type: "song" }
    });
    if (!data.songs?.length) throw new HTTPException7(404, { message: "song not found" });
    return data.songs.map((song) => createSongPayload(song));
  }
};

// src/modules/songs/use-cases/create-song-station/create-song-station.use-case.ts
import { HTTPException as HTTPException8 } from "hono/http-exception";
var CreateSongStationUseCase = class {
  constructor() {
  }
  async execute(songId) {
    const encodedSongId = JSON.stringify([encodeURIComponent(songId)]);
    const { data, ok } = await useFetch({
      endpoint: Endpoints.songs.station,
      params: {
        entity_id: encodedSongId,
        entity_type: "queue"
      },
      context: "android" /* ANDROID */
    });
    if (!data || !ok || !data.stationid) throw new HTTPException8(500, { message: "could not create station" });
    return data.stationid;
  }
};

// src/modules/songs/use-cases/get-song-suggestions/get-song-suggestions.use-case.ts
import { HTTPException as HTTPException9 } from "hono/http-exception";
var GetSongSuggestionsUseCase = class {
  createSongStation;
  constructor() {
    this.createSongStation = new CreateSongStationUseCase();
  }
  async execute({ songId, limit }) {
    const stationId = await this.createSongStation.execute(songId);
    const { data, ok } = await useFetch({
      endpoint: Endpoints.songs.suggestions,
      params: {
        stationid: stationId,
        k: limit
      },
      context: "android" /* ANDROID */
    });
    if (!data || !ok) {
      throw new HTTPException9(404, { message: `no suggestions found for the given song` });
    }
    const { stationid, ...suggestions } = data;
    return Object.values(suggestions).map((element) => element && createSongPayload(element.song)).filter(Boolean).slice(0, limit) || [];
  }
};

// src/modules/songs/services/song.service.ts
var SongService = class {
  getSongByIdUseCase;
  getSongByLinkUseCase;
  createSongStationUseCase;
  getSongSuggestionsUseCase;
  constructor() {
    this.getSongByIdUseCase = new GetSongByIdUseCase();
    this.getSongByLinkUseCase = new GetSongByLinkUseCase();
    this.createSongStationUseCase = new CreateSongStationUseCase();
    this.getSongSuggestionsUseCase = new GetSongSuggestionsUseCase();
  }
  getSongByIds = (args) => {
    return this.getSongByIdUseCase.execute(args);
  };
  getSongByLink = (token) => {
    return this.getSongByLinkUseCase.execute(token);
  };
  createSongStation = (songIds) => {
    return this.createSongStationUseCase.execute(songIds);
  };
  getSongSuggestions = (args) => {
    return this.getSongSuggestionsUseCase.execute(args);
  };
};

// src/modules/songs/controllers/song.controller.ts
import { z as z12 } from "zod";
var SongController = class {
  controller;
  static songClient;
  songService;
  constructor() {
    this.controller = new OpenAPIHono3();
    this.songService = new SongService();
  }
  initRoutes() {
    this.controller.openapi(
      createRoute3({
        method: "get",
        path: "/songs",
        tags: ["Songs"],
        summary: "Retrieve songs by ID or link",
        description: "Retrieve songs by a comma-separated list of IDs or by a direct link to the song on JioSaavn.",
        operationId: "getSongByIdsOrLink",
        request: {
          query: z12.object({
            ids: z12.string().optional().openapi({
              title: "Song IDs",
              description: "Comma-separated list of song IDs",
              type: "string",
              example: "3IoDK8qI,4IoDK8qI,5IoDK8qI"
            }),
            link: z12.string().url().optional().transform((value) => value?.match(/jiosaavn\.com\/song\/[^/]+\/([^/]+)$/)?.[1]).openapi({
              title: "Song Link",
              description: "A direct link to the song on JioSaavn",
              type: "string",
              example: "https://www.jiosaavn.com/song/houdini/OgwhbhtDRwM"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with song details",
            content: {
              "application/json": {
                schema: z12.object({
                  success: z12.boolean().openapi({
                    description: "Indicates whether the request was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: z12.array(SongModel).openapi({
                    title: "Song Details",
                    description: "Array of song details"
                  })
                })
              }
            }
          },
          400: { description: "Bad request when query parameters are missing or invalid" },
          404: { description: "Song not found with the given ID or link" }
        }
      }),
      async (ctx) => {
        const { link, ids } = ctx.req.valid("query");
        if (!link && !ids) {
          return ctx.json({ success: false, message: "Either song IDs or link is required" }, 400);
        }
        const response = link ? await this.songService.getSongByLink(link) : await this.songService.getSongByIds({ songIds: ids });
        return ctx.json({ success: true, data: response });
      }
    );
    this.controller.openapi(
      createRoute3({
        method: "get",
        path: "/songs/{id}",
        tags: ["Songs"],
        summary: "Retrieve song by ID",
        description: "Retrieve a song by its ID. Optionally, include lyrics in the response.",
        operationId: "getSongById",
        request: {
          params: z12.object({
            id: z12.string().openapi({
              title: "Song ID",
              description: "ID of the song to retrieve",
              type: "string",
              example: "3IoDK8qI"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with song details",
            content: {
              "application/json": {
                schema: z12.object({
                  success: z12.boolean().openapi({
                    description: "Indicates whether the request was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: z12.array(SongModel).openapi({
                    description: "Array of songs"
                  })
                })
              }
            }
          },
          400: { description: "Bad request when query parameters are missing or invalid" },
          404: { description: "Song not found for the given ID" }
        }
      }),
      async (ctx) => {
        const songId = ctx.req.param("id");
        const response = await this.songService.getSongByIds({ songIds: songId });
        return ctx.json({ success: true, data: response });
      }
    );
    this.controller.openapi(
      createRoute3({
        method: "get",
        path: "/songs/{id}/suggestions",
        tags: ["Songs"],
        summary: "Retrieve song suggestions",
        description: "Retrieve song suggestions based on the given song ID. This can be used to get similar songs to the one provided for infinite playback.",
        operationId: "getSongSuggestions",
        request: {
          params: z12.object({
            id: z12.string().openapi({
              description: "ID of the song to retrieve suggestions for",
              type: "string",
              example: "yDeAS8Eh"
            })
          }),
          query: z12.object({
            limit: z12.string().pipe(z12.coerce.number()).optional().openapi({
              description: "Limit the number of suggestions to retrieve",
              type: "number",
              title: "Limit",
              example: "10",
              default: "10"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with song suggestions",
            content: {
              "application/json": {
                schema: z12.object({
                  success: z12.boolean().openapi({
                    description: "Indicates whether the request was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: z12.array(SongModel).openapi({
                    description: "Array of song suggestions"
                  })
                })
              }
            }
          }
        }
      }),
      async (ctx) => {
        const songId = ctx.req.param("id");
        const { limit } = ctx.req.valid("query");
        const suggestions = await this.songService.getSongSuggestions({ songId, limit: limit || 10 });
        return ctx.json({ success: true, data: suggestions });
      }
    );
  }
};

// src/modules/artists/controllers/artist.controller.ts
import { createRoute as createRoute4, OpenAPIHono as OpenAPIHono4 } from "@hono/zod-openapi";

// src/modules/artists/models/artist-album.model.ts
import { z as z13 } from "zod";
var ArtistAlbumAPIResponseModel = z13.object({
  artistId: z13.string(),
  name: z13.string(),
  subtitle: z13.string(),
  image: z13.string(),
  follower_count: z13.string(),
  type: z13.string(),
  isVerified: z13.boolean(),
  dominantLanguage: z13.string(),
  dominantType: z13.string(),
  topAlbums: z13.object({
    albums: z13.array(AlbumAPIResponseModel),
    total: z13.number()
  })
});
var ArtistAlbumModel = z13.object({
  total: z13.number(),
  albums: z13.array(AlbumModel)
});

// src/modules/artists/models/artist-song.model.ts
import { z as z14 } from "zod";
var ArtistSongAPIResponseModel = z14.object({
  artistId: z14.string(),
  name: z14.string(),
  subtitle: z14.string(),
  image: z14.string(),
  follower_count: z14.string(),
  type: z14.string(),
  isVerified: z14.boolean(),
  dominantLanguage: z14.string(),
  dominantType: z14.string(),
  topSongs: z14.object({
    songs: z14.array(SongAPIResponseModel),
    total: z14.number()
  })
});
var ArtistSongModel = z14.object({
  total: z14.number(),
  songs: z14.array(SongModel)
});

// src/modules/artists/models/artist.model.ts
import { z as z15 } from "zod";
var ArtistAPIResponseModel = z15.object({
  artistId: z15.string(),
  name: z15.string(),
  subtitle: z15.string(),
  image: z15.string(),
  follower_count: z15.string(),
  type: z15.string(),
  isVerified: z15.boolean(),
  dominantLanguage: z15.string(),
  dominantType: z15.string(),
  topSongs: z15.array(SongAPIResponseModel),
  topAlbums: z15.array(AlbumAPIResponseModel),
  singles: z15.array(SongAPIResponseModel),
  dedicated_artist_playlist: z15.array(
    z15.object({
      id: z15.string(),
      title: z15.string(),
      subtitle: z15.string(),
      type: z15.string(),
      image: z15.string(),
      perma_url: z15.string(),
      more_info: z15.object({
        uid: z15.string(),
        firstname: z15.string(),
        artist_name: z15.array(z15.string()),
        entity_type: z15.string(),
        entity_sub_type: z15.string(),
        video_available: z15.boolean(),
        is_dolby_content: z15.any(),
        sub_types: z15.any(),
        images: z15.any(),
        lastname: z15.string(),
        song_count: z15.string(),
        language: z15.string()
      }),
      explicit_content: z15.string(),
      mini_obj: z15.boolean(),
      numsongs: z15.number()
    })
  ),
  featured_artist_playlist: z15.array(
    z15.object({
      id: z15.string(),
      title: z15.string(),
      subtitle: z15.string(),
      type: z15.string(),
      image: z15.string(),
      perma_url: z15.string(),
      more_info: z15.object({
        uid: z15.string(),
        firstname: z15.string(),
        artist_name: z15.any(),
        entity_type: z15.string(),
        entity_sub_type: z15.string(),
        video_available: z15.boolean(),
        is_dolby_content: z15.any(),
        sub_types: z15.any(),
        images: z15.any(),
        lastname: z15.string(),
        song_count: z15.string(),
        language: z15.string()
      }),
      explicit_content: z15.string(),
      mini_obj: z15.boolean(),
      numsongs: z15.number()
    })
  ),
  similarArtists: z15.array(
    z15.object({
      _id: z15.string(),
      similar: z15.string(),
      languages: z15.string(),
      isVerified: z15.string(),
      image_url: z15.string(),
      wiki: z15.string(),
      roles: z15.string(),
      combine_artist_pages: z15.number(),
      webp: z15.boolean(),
      search_keywords: z15.string(),
      replace_with_primary_artists: z15.number(),
      twitter: z15.string(),
      dob: z15.string(),
      aka: z15.string(),
      name: z15.string(),
      primary_artist_id: z15.string(),
      id: z15.string(),
      fb: z15.string(),
      bio: z15.string(),
      perma_url: z15.string(),
      type: z15.string(),
      mini_obj: z15.boolean(),
      isRadioPresent: z15.boolean(),
      dominantType: z15.string()
    })
  ),
  isRadioPresent: z15.boolean(),
  bio: z15.string(),
  dob: z15.string(),
  fb: z15.string(),
  twitter: z15.string(),
  wiki: z15.string(),
  urls: z15.object({
    albums: z15.string(),
    bio: z15.string(),
    comments: z15.string(),
    songs: z15.string(),
    overview: z15.string()
  }),
  availableLanguages: z15.array(z15.string()),
  fan_count: z15.string(),
  topEpisodes: z15.array(z15.any()),
  is_followed: z15.boolean()
}).extend({
  id: z15.string(),
  perma_url: z15.string()
});
var ArtistModel = z15.object({
  id: z15.string(),
  name: z15.string(),
  url: z15.string(),
  type: z15.string(),
  image: z15.array(DownloadLinkModel),
  followerCount: z15.number().nullable(),
  fanCount: z15.string().nullable(),
  isVerified: z15.boolean().nullable(),
  dominantLanguage: z15.string().nullable(),
  dominantType: z15.string().nullable(),
  bio: z15.array(
    z15.object({
      text: z15.string().nullable(),
      title: z15.string().nullable(),
      sequence: z15.number().nullable()
    })
  ).nullable(),
  dob: z15.string().nullable(),
  fb: z15.string().nullable(),
  twitter: z15.string().nullable(),
  wiki: z15.string().nullable(),
  availableLanguages: z15.array(z15.string()),
  isRadioPresent: z15.boolean().nullable(),
  topSongs: z15.array(SongModel).nullable(),
  topAlbums: z15.array(AlbumModel).nullable(),
  singles: z15.array(SongModel).nullable(),
  similarArtists: z15.array(
    z15.object({
      id: z15.string(),
      name: z15.string(),
      url: z15.string(),
      image: z15.array(DownloadLinkModel),
      languages: z15.record(z15.string(), z15.string()).nullable(),
      wiki: z15.string(),
      dob: z15.string(),
      fb: z15.string(),
      twitter: z15.string(),
      isRadioPresent: z15.boolean(),
      type: z15.string(),
      dominantType: z15.string(),
      aka: z15.string(),
      bio: z15.string().nullable(),
      similarArtists: z15.array(
        z15.object({
          id: z15.string(),
          name: z15.string()
        })
      ).nullable()
    })
  ).nullable()
});

// src/modules/artists/use-cases/get-artist-by-id/get-artist-by-id.use-case.ts
import { HTTPException as HTTPException10 } from "hono/http-exception";
var GetArtistByIdUseCase = class {
  constructor() {
  }
  async execute({ artistId, page, songCount, albumCount, sortBy, sortOrder }) {
    const { data } = await useFetch({
      endpoint: Endpoints.artists.id,
      params: {
        artistId,
        n_song: songCount,
        n_album: albumCount,
        page,
        sort_order: sortOrder,
        category: sortBy
      }
    });
    if (!data) throw new HTTPException10(404, { message: "artist not found" });
    return createArtistPayload(data);
  }
};

// src/modules/artists/use-cases/get-artist-by-link/get-artist-by-link.use-case.ts
import { HTTPException as HTTPException11 } from "hono/http-exception";
var GetArtistByLinkUseCase = class {
  constructor() {
  }
  async execute({ token, page, songCount, albumCount, sortBy, sortOrder }) {
    const { data } = await useFetch({
      endpoint: Endpoints.artists.link,
      params: {
        token,
        n_song: songCount,
        n_album: albumCount,
        page,
        sort_order: sortOrder,
        category: sortBy,
        type: "artist"
      }
    });
    if (!data) throw new HTTPException11(404, { message: "artist not found" });
    return createArtistPayload(data);
  }
};

// src/modules/artists/use-cases/get-artist-songs/get-artist-songs.use-case.ts
import { HTTPException as HTTPException12 } from "hono/http-exception";
var GetArtistSongsUseCase = class {
  constructor() {
  }
  async execute({ artistId, page, sortOrder, sortBy }) {
    const { data } = await useFetch({
      endpoint: Endpoints.artists.songs,
      params: {
        artistId,
        page,
        sort_order: sortOrder,
        category: sortBy
      }
    });
    if (!data) throw new HTTPException12(404, { message: "artist songs not found" });
    return {
      total: data.topSongs.total,
      songs: data.topSongs.songs.map((song) => createSongPayload(song))
    };
  }
};

// src/modules/artists/use-cases/get-artist-albums/get-artist-albums.use-case.ts
import { HTTPException as HTTPException13 } from "hono/http-exception";
var GetArtistAlbumsUseCase = class {
  constructor() {
  }
  async execute({ artistId, page, sortOrder, sortBy }) {
    const { data } = await useFetch({
      endpoint: Endpoints.artists.albums,
      params: {
        artistId,
        page,
        sort_order: sortOrder,
        category: sortBy
      }
    });
    if (!data) throw new HTTPException13(404, { message: "artist albums not found" });
    return {
      total: data.topAlbums.total,
      albums: data.topAlbums.albums.map((album) => createAlbumPayload(album))
    };
  }
};

// src/modules/artists/services/artist.service.ts
var ArtistService = class {
  getArtistByIdUseCase;
  getArtistByLinkUseCase;
  getArtistSongsUseCase;
  getArtistAlbumsUseCase;
  constructor() {
    this.getArtistByIdUseCase = new GetArtistByIdUseCase();
    this.getArtistByLinkUseCase = new GetArtistByLinkUseCase();
    this.getArtistSongsUseCase = new GetArtistSongsUseCase();
    this.getArtistAlbumsUseCase = new GetArtistAlbumsUseCase();
  }
  getArtistById = (args) => {
    return this.getArtistByIdUseCase.execute(args);
  };
  getArtistByLink = (args) => {
    return this.getArtistByLinkUseCase.execute(args);
  };
  getArtistSongs = (args) => {
    return this.getArtistSongsUseCase.execute(args);
  };
  getArtistAlbums = (args) => {
    return this.getArtistAlbumsUseCase.execute(args);
  };
};

// src/modules/artists/controllers/artist.controller.ts
import { z as z16 } from "zod";
var ArtistController = class {
  controller;
  artistService;
  constructor() {
    this.controller = new OpenAPIHono4();
    this.artistService = new ArtistService();
  }
  initRoutes() {
    this.controller.openapi(
      createRoute4({
        method: "get",
        path: "/artists",
        tags: ["Artists"],
        summary: "Retrieve artists by ID or link",
        description: `Retrieve artists by ID or by a direct artist link.`,
        operationId: "getArtistByIdOrLink",
        request: {
          query: z16.object({
            id: z16.string().optional().openapi({
              title: "Artist ID",
              description: "Artist ID",
              type: "string",
              example: "1274170"
            }),
            link: z16.string().url().optional().transform((value) => value?.match(/jiosaavn\.com\/artist\/[^/]+\/([^/]+)$/)?.[1]).openapi({
              title: "Artist Link",
              description: "A direct link to the artist on JioSaavn",
              type: "string",
              example: "https://www.jiosaavn.com/artist/dua-lipa-songs/r-OWIKgpX2I_"
            }),
            page: z16.string().pipe(z16.coerce.number()).optional().openapi({
              title: "Page number",
              description: "page number",
              type: "number",
              example: "1"
            }),
            songCount: z16.string().pipe(z16.coerce.number()).optional().openapi({
              title: "Song count",
              description: "Number of songs to fetch",
              type: "number",
              example: "10"
            }),
            albumCount: z16.string().pipe(z16.coerce.number()).optional().openapi({
              title: "Album count",
              description: "Number of albums to fetch",
              type: "number",
              example: "10"
            }),
            sortBy: z16.enum(["popularity", "latest", "alphabetical"]).optional().openapi({
              title: "Sort by",
              description: "sort by",
              type: "string",
              example: "popularity"
            }),
            sortOrder: z16.enum(["asc", "desc"]).optional().openapi({
              title: "Sort order",
              description: "sort order",
              type: "string",
              example: "desc",
              default: "desc"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with artist details",
            content: {
              "application/json": {
                schema: z16.object({
                  success: z16.boolean().openapi({
                    description: "Indicates whether the request was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: ArtistModel.openapi({
                    description: "Artist details"
                  })
                })
              }
            }
          }
        }
      }),
      async (ctx) => {
        const {
          link,
          id,
          page = 0,
          sortBy = "popularity",
          sortOrder = "asc",
          songCount = 10,
          albumCount = 10
        } = ctx.req.valid("query");
        const response = link ? await this.artistService.getArtistByLink({ token: link, page, songCount, albumCount, sortBy, sortOrder }) : await this.artistService.getArtistById({ artistId: id, page, songCount, albumCount, sortBy, sortOrder });
        return ctx.json({ success: true, data: response });
      }
    );
    this.controller.openapi(
      createRoute4({
        method: "get",
        path: "/artists/{id}",
        tags: ["Artists"],
        summary: "Retrieve artist by ID",
        description: "Retrieve artist by ID",
        operationId: "getArtistById",
        request: {
          params: z16.object({
            id: z16.string().openapi({
              title: "Artist ID",
              description: "ID of the artist to retrieve",
              type: "string",
              example: "1274170"
            })
          }),
          query: z16.object({
            page: z16.string().pipe(z16.coerce.number()).optional().openapi({
              title: "Page number",
              description: "The page number of the results to retrieve",
              type: "integer",
              example: "0"
            }),
            songCount: z16.string().pipe(z16.coerce.number()).optional().openapi({
              title: "Song count",
              description: "The number of songs to retrieve for the artist",
              type: "integer",
              example: "10"
            }),
            albumCount: z16.string().pipe(z16.coerce.number()).optional().openapi({
              title: "Album count",
              description: "The number of albums to retrieve for the artist",
              type: "integer",
              example: "10"
            }),
            sortBy: z16.enum(["popularity", "latest", "alphabetical"]).optional().openapi({
              title: "Sort by",
              description: "The field to sort the results by",
              type: "string",
              example: "popularity",
              enum: ["popularity", "latest", "alphabetical"]
            }),
            sortOrder: z16.enum(["asc", "desc"]).optional().openapi({
              title: "Sort order",
              description: "The order to sort the results by",
              type: "string",
              example: "desc",
              enum: ["asc", "desc"]
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with artist details",
            content: {
              "application/json": {
                schema: z16.object({
                  success: z16.boolean().openapi({
                    description: "Indicates whether the request was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: ArtistModel
                })
              }
            }
          },
          404: {
            description: "Artist not found for the given ID"
          }
        }
      }),
      async (ctx) => {
        const artistId = ctx.req.param("id");
        const { page, sortBy, sortOrder, songCount, albumCount } = ctx.req.valid("query");
        const response = await this.artistService.getArtistById({
          artistId,
          page: page || 0,
          songCount: songCount || 10,
          albumCount: albumCount || 10,
          sortBy: sortBy || "popularity",
          sortOrder: sortOrder || "asc"
        });
        return ctx.json({ success: true, data: response });
      }
    );
    this.controller.openapi(
      createRoute4({
        method: "get",
        path: "/artists/{id}/songs",
        tags: ["Artists"],
        summary: `Retrieve artist's songs`,
        description: "Retrieve a list of songs for a given artist by their ID, with optional sorting and pagination.",
        operationId: "getArtistSongs",
        request: {
          params: z16.object({
            id: z16.string().openapi({
              description: "ID of the artist to retrieve the songs for",
              type: "string",
              example: "1274170",
              default: "1274170"
            })
          }),
          query: z16.object({
            page: z16.string().pipe(z16.coerce.number()).optional().openapi({
              description: "The page number of the results to retrieve",
              type: "number",
              example: "0",
              default: "0"
            }),
            sortBy: z16.enum(["popularity", "latest", "alphabetical"]).optional().openapi({
              description: "The criterion to sort the songs by",
              type: "string",
              example: "popularity",
              enum: ["popularity", "latest", "alphabetical"],
              default: "popularity"
            }),
            sortOrder: z16.enum(["asc", "desc"]).optional().openapi({
              description: "The order to sort the songs",
              type: "string",
              example: "desc",
              enum: ["asc", "desc"],
              default: "desc"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with a list of songs for the artist",
            content: {
              "application/json": {
                schema: z16.object({
                  success: z16.boolean().openapi({
                    description: "Indicates whether the request was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: ArtistSongModel.openapi({
                    description: "An array of songs associated with the artist"
                  })
                })
              }
            }
          },
          404: {
            description: "Artist not found for the given ID"
          }
        }
      }),
      async (ctx) => {
        const artistId = ctx.req.param("id");
        const { page, sortBy, sortOrder } = ctx.req.valid("query");
        const response = await this.artistService.getArtistSongs({
          artistId,
          page: page || 0,
          sortBy: sortBy || "popularity",
          sortOrder: sortOrder || "desc"
        });
        return ctx.json({ success: true, data: response });
      }
    );
    this.controller.openapi(
      createRoute4({
        method: "get",
        path: "/artists/{id}/albums",
        tags: ["Artists"],
        summary: `Retrieve artist's albums`,
        description: "Retrieve a list of albums for a given artist by their ID, with optional sorting and pagination.",
        operationId: "getArtistAlbums",
        request: {
          params: z16.object({
            id: z16.string().openapi({
              description: "ID of the artist to retrieve the albums for",
              type: "string",
              example: "1274170",
              default: "1274170"
            })
          }),
          query: z16.object({
            page: z16.string().pipe(z16.coerce.number()).optional().openapi({
              description: "The page number of the results to retrieve",
              type: "number",
              example: "0",
              default: "0"
            }),
            sortBy: z16.enum(["popularity", "latest", "alphabetical"]).optional().openapi({
              description: "The criterion to sort the albums by",
              type: "string",
              example: "popularity",
              enum: ["popularity", "latest", "alphabetical"],
              default: "popularity"
            }),
            sortOrder: z16.enum(["asc", "desc"]).optional().openapi({
              description: "The order to sort the albums",
              type: "string",
              example: "desc",
              enum: ["asc", "desc"],
              default: "desc"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with a list of albums for the artist",
            content: {
              "application/json": {
                schema: z16.object({
                  success: z16.boolean().openapi({
                    description: "Indicates whether the request was successful",
                    type: "boolean",
                    example: true
                  }),
                  data: ArtistAlbumModel.openapi({
                    description: "An array of albums associated with the artist"
                  })
                })
              }
            }
          },
          404: {
            description: "Artist not found for the given ID"
          }
        }
      }),
      async (ctx) => {
        const artistId = ctx.req.param("id");
        const { page, sortBy, sortOrder } = ctx.req.valid("query");
        const response = await this.artistService.getArtistAlbums({
          artistId,
          page: page || 0,
          sortBy: sortBy || "popularity",
          sortOrder: sortOrder || "desc"
        });
        return ctx.json({ success: true, data: response });
      }
    );
  }
};

// src/modules/playlists/controllers/playlist.controller.ts
import { createRoute as createRoute5, OpenAPIHono as OpenAPIHono5, z as z18 } from "@hono/zod-openapi";

// src/modules/playlists/models/playlist.model.ts
import { z as z17 } from "zod";
var PlaylistAPIResponseModel = z17.object({
  id: z17.string(),
  title: z17.string(),
  subtitle: z17.string(),
  header_desc: z17.string(),
  type: z17.string(),
  perma_url: z17.string(),
  image: z17.string(),
  language: z17.string(),
  year: z17.string(),
  play_count: z17.string(),
  explicit_content: z17.string(),
  list_count: z17.string(),
  list_type: z17.string(),
  list: z17.array(SongAPIResponseModel),
  more_info: z17.object({
    uid: z17.string(),
    is_dolby_content: z17.boolean(),
    subtype: z17.array(z17.string()).default([]),
    last_updated: z17.string(),
    username: z17.string(),
    firstname: z17.string(),
    lastname: z17.string(),
    is_followed: z17.string(),
    isFY: z17.boolean(),
    follower_count: z17.string(),
    fan_count: z17.string(),
    playlist_type: z17.string(),
    share: z17.string(),
    sub_types: z17.array(z17.string()),
    images: z17.array(z17.string()),
    H2: z17.string().nullable(),
    subheading: z17.string(),
    video_count: z17.string(),
    artists: z17.array(
      z17.object({
        id: z17.string(),
        name: z17.string(),
        role: z17.string(),
        image: z17.string(),
        type: z17.string(),
        perma_url: z17.string()
      })
    )
  })
}).extend({
  description: z17.string()
});
var PlaylistModel = z17.object({
  id: z17.string(),
  name: z17.string(),
  description: z17.string().nullable(),
  year: z17.number().nullable(),
  type: z17.string(),
  playCount: z17.number().nullable(),
  language: z17.string(),
  explicitContent: z17.boolean(),
  songCount: z17.number().nullable(),
  url: z17.string(),
  image: z17.array(DownloadLinkModel),
  songs: z17.array(SongModel).nullable(),
  artists: z17.array(ArtistMapModel).nullable()
});

// src/modules/playlists/helpers/playlist.helper.ts
var createPlaylistPayload = (playlist) => ({
  id: playlist.id,
  name: playlist.title,
  description: playlist.header_desc,
  type: playlist.type,
  year: playlist.year ? Number(playlist.year) : null,
  playCount: playlist.play_count ? Number(playlist.play_count) : null,
  language: playlist.language,
  explicitContent: playlist.explicit_content === "1",
  url: playlist.perma_url,
  songCount: playlist.list_count ? Number(playlist.list_count) : null,
  artists: playlist.more_info.artists?.map(createArtistMapPayload) || null,
  image: createImageLinks(playlist.image),
  songs: playlist.list && playlist.list?.map(createSongPayload) || null
});

// src/modules/playlists/use-cases/get-playlist-by-id/get-playlist-by-id.use-case.ts
import { HTTPException as HTTPException14 } from "hono/http-exception";
var GetPlaylistByIdUseCase = class {
  constructor() {
  }
  async execute({ id, limit, page }) {
    const { data } = await useFetch({
      endpoint: Endpoints.playlists.id,
      params: {
        listid: id,
        n: limit,
        p: page
      }
    });
    if (!data) throw new HTTPException14(404, { message: "playlist not found" });
    const playlist = createPlaylistPayload(data);
    return {
      ...playlist,
      songCount: playlist?.songs?.length || null,
      songs: playlist?.songs?.slice(0, limit) || []
    };
  }
};

// src/modules/playlists/use-cases/get-playlist-by-link/get-playlist-by-link.use-case.ts
import { HTTPException as HTTPException15 } from "hono/http-exception";
var GetPlaylistByLinkUseCase = class {
  constructor() {
  }
  async execute({ token, limit, page }) {
    const { data } = await useFetch({
      endpoint: Endpoints.albums.link,
      params: {
        token,
        n: limit,
        p: page,
        type: "playlist"
      }
    });
    if (!data) throw new HTTPException15(404, { message: "playlist not found" });
    const playlist = createPlaylistPayload(data);
    return {
      ...playlist,
      songCount: playlist?.songs?.length || null,
      songs: playlist?.songs?.slice(0, limit) || []
    };
  }
};

// src/modules/playlists/services/playlist.service.ts
var PlaylistService = class {
  getPlaylistByIdUseCase;
  getPlaylistByLinkUseCase;
  constructor() {
    this.getPlaylistByIdUseCase = new GetPlaylistByIdUseCase();
    this.getPlaylistByLinkUseCase = new GetPlaylistByLinkUseCase();
  }
  getPlaylistById = (args) => {
    return this.getPlaylistByIdUseCase.execute(args);
  };
  getPlaylistByLink = (args) => {
    return this.getPlaylistByLinkUseCase.execute(args);
  };
};

// src/modules/playlists/controllers/playlist.controller.ts
var PlaylistController = class {
  controller;
  playlistService;
  constructor() {
    this.controller = new OpenAPIHono5();
    this.playlistService = new PlaylistService();
  }
  initRoutes() {
    this.controller.openapi(
      createRoute5({
        method: "get",
        path: "/playlists",
        tags: ["Playlist"],
        summary: "Retrieve a playlist by ID or link",
        description: "Retrieve a playlist by providing either an ID or a direct link to the playlist on JioSaavn.",
        operationId: "getPlaylistByIdOrLink",
        request: {
          query: z18.object({
            id: z18.string().optional().openapi({
              title: "Playlist ID",
              description: "The unique ID of the playlist",
              type: "string",
              example: "82914609",
              default: "82914609"
            }),
            link: z18.string().url().optional().transform((value) => {
              const matches = value?.match(
                /(?:jiosaavn\.com|saavn\.com)\/(?:featured|s\/playlist)\/[^/]+\/([^/]+)$|\/([^/]+)$/
              );
              const filteredMatches = matches?.filter((each) => each !== void 0);
              return filteredMatches && filteredMatches[filteredMatches?.length - 1 || 0] || void 0;
            }).openapi({
              title: "Playlist Link",
              description: "A direct link to the playlist on JioSaavn",
              type: "string",
              example: "https://www.jiosaavn.com/featured/its-indie-english/AMoxtXyKHoU_",
              default: "https://www.jiosaavn.com/featured/its-indie-english/AMoxtXyKHoU_"
            }),
            page: z18.string().pipe(z18.coerce.number()).optional().openapi({
              title: "Page Number",
              description: "The page number of the songs to retrieve from the playlist",
              type: "integer",
              example: "0",
              default: "0"
            }),
            limit: z18.string().pipe(z18.coerce.number()).optional().openapi({
              title: "Limit",
              description: "Number of songs to retrieve per page",
              type: "integer",
              example: "10",
              default: "10"
            })
          })
        },
        responses: {
          200: {
            description: "Successful response with playlist details",
            content: {
              "application/json": {
                schema: z18.object({
                  success: z18.boolean().openapi({
                    description: "Indicates the success status of the request.",
                    type: "boolean",
                    example: true
                  }),
                  data: PlaylistModel.openapi({
                    title: "Playlist Details",
                    description: "The detailed information of the playlist."
                  })
                })
              }
            }
          },
          400: { description: "Bad request due to missing or invalid query parameters." },
          404: { description: "The playlist could not be found with the provided ID or link." }
        }
      }),
      async (ctx) => {
        const { id, link, page, limit } = ctx.req.valid("query");
        if (!link && !id) {
          return ctx.json({ success: false, message: "Either playlist ID or link is required" }, 400);
        }
        const response = link ? await this.playlistService.getPlaylistByLink({
          token: link,
          page: page || 0,
          limit: limit || 10
        }) : await this.playlistService.getPlaylistById({
          id,
          page: page || 0,
          limit: limit || 10
        });
        return ctx.json({ success: true, data: response });
      }
    );
  }
};

// src/application.ts
import { OpenAPIHono as OpenAPIHono6 } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

// src/pages/home.tsx
import { Hono } from "hono";
import { Fragment, jsx, jsxs } from "hono/jsx/jsx-runtime";
var Home = new Hono();
var Meteors = ({ number }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: Array.from({ length: number || 20 }, (_, idx) => /* @__PURE__ */ jsx(
    "span",
    {
      class: "meteor animate-[meteorAnimation_3s_linear_infinite] absolute h-1 w-1 rounded-[9999px] shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
      style: {
        top: 0,
        left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
        animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
        animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`
      }
    },
    idx
  )) });
};
Home.get("/", (c) => {
  const title = "NepoTune API";
  const description = "Unofficial JioSaavn API wrapper in TypeScript. Access songs, albums, artists, playlists, and more.";
  const previewImage = "https://raw.githubusercontent.com/Sandipeyy/NepoTuneAPI/main/assets/preview.pnh";
  const siteUrl = "https://nepotuneapi.vercel.app/";
  return c.html(
    /* @__PURE__ */ jsxs("html", { lang: "en", children: [
      /* @__PURE__ */ jsxs("head", { children: [
        /* @__PURE__ */ jsx("title", { children: title }),
        /* @__PURE__ */ jsx("meta", { charset: "utf-8" }),
        /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "keywords", content: "NepoTune, JioSaavn API, Music API, NepoTune API, NepoFlix, Sandipeyy, Songs, Albums, Playlists" }),
        /* @__PURE__ */ jsx("meta", { name: "author", content: "Sandipeyy" }),
        /* @__PURE__ */ jsx("link", { rel: "canonical", href: siteUrl }),
        /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
        /* @__PURE__ */ jsx("meta", { property: "og:url", content: siteUrl }),
        /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
        /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
        /* @__PURE__ */ jsx("meta", { property: "og:image", content: previewImage }),
        /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
        /* @__PURE__ */ jsx("meta", { name: "twitter:url", content: siteUrl }),
        /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
        /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
        /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: previewImage }),
        /* @__PURE__ */ jsx(
          "link",
          {
            rel: "icon",
            type: "image/x-icon",
            href: "https://raw.githubusercontent.com/Sandipeyy/NepoTuneAPI/main/assets/favicon.ico"
          }
        ),
        /* @__PURE__ */ jsx("link", { rel: "preload", as: "image", href: "https://raw.githubusercontent.com/Sandipeyy/NepoTuneAPI/main/assets/logo.png" }),
        /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
        /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" }),
        /* @__PURE__ */ jsx(
          "link",
          {
            href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
            rel: "stylesheet"
          }
        ),
        /* @__PURE__ */ jsx("script", { src: "https://cdn.tailwindcss.com" }),
        /* @__PURE__ */ jsx(
          "style",
          {
            dangerouslySetInnerHTML: {
              __html: `
            * { font-family: 'Inter', sans-serif; } 
            body {
              background: linear-gradient(180deg, #0f0f0f, #1a1a1a);
              background-size: 400% 400%;
              animation: gradientShift 15s ease infinite;
            }
            @keyframes gradientShift {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes borderAnimation {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            @keyframes meteorAnimation {
              0% { transform: rotate(215deg) translateX(0); opacity: 1; }
              70% { opacity: 1; }
              100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
            }
            .meteor::before {
              content: '';
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 50px;
              height: 1px;
              background: linear-gradient(90deg, #64748b, transparent);
            }
            .animate-meteor-effect {
              animation-name: meteorAnimation;
            }
            /* Card hover polish */
            .card:hover {
              transform: translateY(-3px);
              box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
            }
            .unofficial-tag {
              animation: borderAnimation 3s ease-in-out infinite alternate;
            }`
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("body", { class: "bg-black mx-auto md:min-h-screen max-w-screen-lg flex flex-col", children: [
        /* @__PURE__ */ jsxs("main", { class: "mx-auto my-auto flex flex-col space-y-8 px-4 pb-16 md:py-10 relative overflow-y-hidden overflow-x-hidden", children: [
          /* @__PURE__ */ jsx(Meteors, { number: 15 }),
          /* @__PURE__ */ jsxs("header", { class: "sticky top-0 z-50 bg-black/70 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-3 mb-6 p-3 rounded-lg", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://raw.githubusercontent.com/Sandipeyy/NepoTuneAPI/main/assets/logo.png",
                alt: "NepoTune Logo",
                class: "w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 object-contain",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxs("h1", { class: "flex flex-col sm:flex-row items-start sm:items-end space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left", children: [
              /* @__PURE__ */ jsx("span", { class: "bg-gradient-to-r from-purple-500 to-gray-800 bg-clip-text text-transparent text-xl sm:text-3xl md:text-4xl font-bold", children: "NepoTune API" }),
              /* @__PURE__ */ jsx("span", { class: "unofficial-tag rounded bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1 text-xs sm:text-sm md:text-base uppercase tracking-wider text-white", children: "Unofficial" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 md:gap-8", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Explore Docs",
                class: "card p-4 sm:p-6 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-2 md:col-span-4 lg:col-span-8",
                href: "/docs",
                children: /* @__PURE__ */ jsxs("div", { class: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { class: "text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-red-500 text-red-500", children: "Quick Start" }),
                  /* @__PURE__ */ jsx("span", { class: "text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2", children: "Explore the Docs" }),
                  /* @__PURE__ */ jsxs("div", { class: "text-neutral-500 mt-2", children: [
                    "Learn how to use ",
                    title,
                    " with simple guides and examples."
                  ] })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "View GitHub Source Code",
                class: "card p-4 sm:p-6 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-2 md:col-span-4 lg:col-span-8",
                href: "https://github.com/Sandipeyy/NepoTuneAPI",
                children: /* @__PURE__ */ jsxs("div", { class: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { class: "text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-green-500 text-green-500", children: "Source Code" }),
                  /* @__PURE__ */ jsx("span", { class: "text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2", children: "View on GitHub" }),
                  /* @__PURE__ */ jsx("div", { class: "text-neutral-500 mt-2", children: "NepoTune API is open-source. Check out the source code on GitHub." })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "Contribute to NepoTune API",
                class: "card p-4 sm:p-6 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-2 md:col-span-4 lg:col-span-8",
                href: "https://github.com/Sandipeyy/NepoTuneAPI/issues",
                children: /* @__PURE__ */ jsxs("div", { class: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { class: "text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-violet-500 text-violet-500", children: "Contribute" }),
                  /* @__PURE__ */ jsx("span", { class: "text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2", children: "Get Involved" }),
                  /* @__PURE__ */ jsx("div", { class: "text-neutral-500 mt-2", children: "Found a bug or have a feature idea? Open an issue or submit a pull request." })
                ] })
              }
            ),
            /* @__PURE__ */ jsx("div", { class: "card p-4 sm:p-6 hover:bg-opacity-5 hover:bg-white rounded-lg duration-100 sm:col-span-2 md:col-span-4 lg:col-span-8", children: /* @__PURE__ */ jsxs("div", { class: "flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { class: "text-xs uppercase bg-opacity-15 rounded text-center max-w-fit px-2 py-1 font-bold tracking-wide bg-blue-500 text-blue-500", children: "Socials" }),
              /* @__PURE__ */ jsx("span", { class: "text-neutral-200 font-bold text-lg sm:text-xl md:text-2xl mt-2", children: "Stay Connected" }),
              /* @__PURE__ */ jsx("div", { class: "text-neutral-500 mt-2", children: "Find me on GitHub and Instagram." }),
              /* @__PURE__ */ jsxs("div", { class: "flex flex-row space-x-6 mt-3", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "https://github.com/Sandipeyy",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "GitHub Profile",
                    class: "hover:text-indigo-400 text-indigo-500 transition-transform hover:scale-110 flex items-center space-x-2",
                    children: [
                      /* @__PURE__ */ jsx(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          class: "w-4 h-4",
                          "aria-hidden": "true",
                          focusable: "false",
                          role: "img",
                          fill: "currentColor",
                          children: /* @__PURE__ */ jsx("path", { d: "M12 .296C5.373.296 0 5.67 0 12.296c0 5.292 3.438 9.773 8.205 11.366.6.111.82-.261.82-.579 0-.286-.011-1.04-.017-2.042-3.338.726-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.304-5.467-1.333-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.048.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.624-5.479 5.921.43.371.814 1.102.814 2.222 0 1.605-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 22.067 24 17.584 24 12.296 24 5.67 18.627.296 12 .296z" })
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { children: "GitHub" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "https://instagram.com/sandip.gg_",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "aria-label": "Instagram Profile",
                    class: "hover:text-pink-400 text-pink-500 transition-transform hover:scale-110 flex items-center space-x-2",
                    children: [
                      /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          class: "w-4 h-4",
                          "aria-hidden": "true",
                          focusable: "false",
                          role: "img",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "1.5",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          children: [
                            /* @__PURE__ */ jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5", ry: "5" }),
                            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
                            /* @__PURE__ */ jsx("circle", { cx: "17.5", cy: "6.5", r: "0.5", fill: "currentColor", stroke: "none" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { children: "Instagram" })
                    ]
                  }
                )
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("footer", { class: "text-center text-gray-600 text-sm py-6 border-t border-gray-800", children: [
          /* @__PURE__ */ jsxs("div", { class: "flex flex-col sm:flex-row justify-center gap-4", children: [
            /* @__PURE__ */ jsx("a", { href: "/docs", target: "_blank", rel: "noopener noreferrer", class: "hover:text-white", children: "Docs" }),
            /* @__PURE__ */ jsx("a", { href: "https://github.com/Sandipeyy/NepoTuneAPI", target: "_blank", rel: "noopener noreferrer", class: "hover:text-white", children: "GitHub" }),
            /* @__PURE__ */ jsx("a", { href: "https://instagram.com/sandip.gg_", target: "_blank", rel: "noopener noreferrer", class: "hover:text-white", children: "Instagram" })
          ] }),
          /* @__PURE__ */ jsxs("p", { class: "mt-2", children: [
            "\xA9 ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " NepoTune API. All rights reserved."
          ] })
        ] })
      ] })
    ] })
  );
});

// src/application.ts
var App = class {
  app;
  constructor(routes) {
    this.app = new OpenAPIHono6();
    this.initializeGlobalMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwaggerUI();
    this.initializeRouteFallback();
    this.initializeErrorHandler();
  }
  initializeRoutes(routes) {
    routes.forEach((route) => {
      route.initRoutes();
      this.app.route("/api", route.controller);
    });
    this.app.route("/", Home);
  }
  initializeGlobalMiddlewares() {
    this.app.use(logger());
    this.app.use(prettyJSON());
    this.app.use(cors());
  }
  initializeSwaggerUI() {
    this.app.doc31("/swagger", (c) => {
      const { protocol: urlProtocol, hostname, port } = new URL(c.req.url);
      const protocol = c.req.header("x-forwarded-proto") ? `${c.req.header("x-forwarded-proto")}:` : urlProtocol;
      return {
        openapi: "3.1.0",
        info: {
          version: "1.0.0",
          title: "NepoTune API",
          description: `# Introduction
          
          NepoTune API is an unofficial JioSaavn API that provides fast, reliable access to songs, albums, artists, and playlists. 
          Designed for developers, it enables high-quality music data fetching and downloading through a simple and consistent interface.`,
          contact: {
            name: "Sandip Gurung",
            url: "https://github.com/Sandipeyy/NepoTuneAPI"
          },
          license: {
            name: "MIT",
            url: "https://github.com/Sandipeyy/NepoTuneAPI/blob/main/LICENSE"
          }
        },
        servers: [
          {
            url: `${protocol}//${hostname}${port ? `:${port}` : ""}`,
            description: "Current environment"
          }
        ]
      };
    });
    this.app.get(
      "/docs",
      apiReference({
        pageTitle: "NepoTuneAPI Documentation",
        theme: "deepSpace",
        isEditable: false,
        layout: "modern",
        darkMode: true,
        metaData: {
          applicationName: "NepoTuneAPI",
          author: "Sandip Gurung",
          creator: "Sandip Gurung",
          publisher: "Sandip Gurung",
          robots: "index, follow",
          description: "NepoTuneAPI is an unofficial wrapper written in TypeScript for JioSaavn, providing programmatic access to songs, albums, artists, playlists, and more."
        },
        url: "/swagger"
      })
    );
  }
  initializeRouteFallback() {
    this.app.notFound((ctx) => {
      return ctx.json(
        {
          success: false,
          message: "Route not found, check docs at /docs"
        },
        404
      );
    });
  }
  initializeErrorHandler() {
    this.app.onError((err, ctx) => {
      const error = err;
      return ctx.json(
        { success: false, message: error.message },
        error.status || 500
      );
    });
  }
  getApp() {
    return this.app;
  }
};

// src/server.ts
var app = new App([
  new SearchController(),
  new SongController(),
  new AlbumController(),
  new ArtistController(),
  new PlaylistController()
]).getApp();
var server_default = app;

// src/vercel-handler.ts
var vercel_handler_default = handle(server_default);
export {
  vercel_handler_default as default
};
