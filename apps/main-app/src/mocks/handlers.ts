import { http, HttpResponse } from "msw";
import { addStoredSong, removeStoredSong } from "./songStore";
import type { Song } from "@music-library-app/shared-types";

export const handlers = [
  http.post("/songs", async ({ request }) => {
    const songData = (await request.json()) as Omit<Song, "id">;
    const newSong = addStoredSong(songData);
    return HttpResponse.json(newSong, { status: 201 });
  }),

  http.delete("/songs/:id", ({ params }) => {
    const { id } = params as { id: string };
    removeStoredSong(id);
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];
