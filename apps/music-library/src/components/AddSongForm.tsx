import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useAddSongMutation } from "../hooks/useAddSongMutation";

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

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-violet-500 text-white rounded-full shadow-lg hover:bg-violet-600 transition-all duration-300 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Song
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="text-2xl font-bold mb-6 text-ink">Add New Song</h3>

              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all"
                    placeholder="Enter song title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Artist *
                  </label>
                  <input
                    {...register("artist", { required: "Artist is required" })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all"
                    placeholder="Enter artist name"
                  />
                  {errors.artist && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.artist.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Album *
                  </label>
                  <input
                    {...register("album", { required: "Album is required" })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all"
                    placeholder="Enter album name"
                  />
                  {errors.album && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.album.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Year *
                  </label>
                  <input
                    {...register("year", {
                      required: "Year is required",
                      pattern: {
                        value: /^\d{4}$/,
                        message: "Year must be 4 digits",
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all"
                    placeholder="2024"
                  />
                  {errors.year && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.year.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={addMutation.isPending}
                    className="flex-1 px-6 py-3 bg-violet-500 text-white rounded-2xl font-semibold hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {addMutation.isPending ? "Adding..." : "Add Song"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
