import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddSongMutation } from "../hooks/useAddSongMutation";
import type { Song } from "@music-library-app/shared-types";

interface AddSongFormProps {
  userRole: "admin" | "user" | null;
}

interface AddSongFormInputs {
  title: string;
  artist: string;
  album: string;
  year: string;
}

export const AddSongForm: React.FC<AddSongFormProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const addMutation = useAddSongMutation({ userRole });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddSongFormInputs>();

  const onSubmit = handleSubmit((data) => {
    addMutation.mutate(
      {
        title: data.title,
        artist: data.artist,
        album: data.album,
        year: data.year,
      },
      {
        onSuccess: () => {
          reset();
          setIsOpen(false);
        },
      },
    );
  });

  if (userRole !== "admin") {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-all shadow-md"
      >
        Add Song
      </button>
    );
  }

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm mb-6">
      <h3 className="text-lg font-bold mb-4">Add New Song</h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 text-sm">Title *</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm">Artist *</label>
          <input
            {...register("artist", { required: "Artist is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          {errors.artist && (
            <p className="text-red-500 text-xs">{errors.artist.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm">Album *</label>
          <input
            {...register("album", { required: "Album is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          {errors.album && (
            <p className="text-red-500 text-xs">{errors.album.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm">Year *</label>
          <input
            {...register("year", {
              required: "Year is required",
              pattern: { value: /^\d{4}$/, message: "Year must be 4 digits" },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          {errors.year && (
            <p className="text-red-500 text-xs">{errors.year.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 disabled:opacity-50"
          >
            {addMutation.isPending ? "Adding..." : "Add Song"}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
