interface SongSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  isSearching?: boolean;
}

export function SongSearchInput({
  value,
  onChange,
  isSearching = false,
}: SongSearchInputProps) {
  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            className="w-4.5 h-4.5 w-[18px] h-[18px] text-gray-400 group-focus-within:text-violet transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search songs, artists, albums…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-11 pr-11 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-ink placeholder-gray-400 focus:bg-white focus:border-violet/40 focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all duration-200 shadow-sm hover:shadow-md"
        />

        <div className="absolute inset-y-0 right-4 flex items-center gap-3">
          {isSearching && (
            <div
              className="flex items-end gap-[3px] h-4"
              role="status"
              aria-label="Searching"
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-[3px] h-full bg-violet rounded-full origin-bottom animate-[eq-bounce_0.9s_ease-in-out_infinite]"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          )}

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Clear search"
              className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200/70 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}