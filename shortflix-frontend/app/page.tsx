"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";
import type { Short } from "@/types/short";
import { Heart, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [activeShort, setActiveShort] = useState<Short | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("short-flix-favorites");
    if (storedFavorites) {
      try {
        const favoriteIds = JSON.parse(storedFavorites) as number[];
        setFavorites(new Set(favoriteIds));
      } catch (err) {
        console.error("Failed to parse favorites from localStorage:", err);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(
      "short-flix-favorites",
      JSON.stringify(Array.from(favorites))
    );
  }, [favorites]);

  const fetchShorts = async (query?: string) => {
    try {
      setLoading(true);
      setError(null);

      const params: Record<string, string> = {};
      if (query && query.trim().length > 0) {
        params.q = query.trim();
      }

      const res = await apiClient.get<Short[]>("/shorts", { params });
      setShorts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load shorts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShorts();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchShorts(search);
  };

  const handleClearSearch = () => {
    setSearch("");
    fetchShorts();
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredShorts = useMemo(() => {
    let list = shorts;

    if (showFavoritesOnly) {
      list = list.filter((short) => favorites.has(short.id));
    }

    if (!search.trim()) return list;

    const q = search.toLowerCase();
    return list.filter(
      (short) =>
        short.title.toLowerCase().includes(q) ||
        short.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [shorts, search, showFavoritesOnly, favorites]);

  const openShort = (short: Short) => {
    setActiveShort(short);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setActiveShort(null);
  };

  const totalShorts = shorts.length;
  const totalFavorites = favorites.size;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 py-6 px-4 sm:px-6 lg:px-0">
      {/* title + theme toggle */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500/80 via-pink-500/80 to-orange-400/80 px-3 py-1 text-xs font-medium text-white shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            Short-flix · Mini Shorts Platform
          </div>
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Watch shorts instantly
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            Scroll through bite-sized videos in a clean, Netflix-style grid.
            Search by vibe, filter favorites, and enjoy short-form content in
            seconds.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <div className="flex flex-col items-end text-xs text-muted-foreground">
            <span>
              Shorts:{" "}
              <span className="font-medium text-foreground">{totalShorts}</span>
            </span>
            <span>
              Favorites:{" "}
              <span className="font-medium text-foreground">
                {totalFavorites}
              </span>
            </span>
          </div>
          <ModeToggle />
        </div>
      </div>

      {/* search + favorites filter */}
      <section className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-md items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-8 text-sm"
            />
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
          </div>
          <Button type="submit" variant="default" className="shrink-0">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Filter:</span>
          <div className="inline-flex gap-1 rounded-full bg-muted/60 p-1">
            <Button
              type="button"
              size="sm"
              variant={showFavoritesOnly ? "ghost" : "secondary"}
              className={`h-7 rounded-full px-3 text-xs ${
                !showFavoritesOnly ? "shadow-sm" : ""
              }`}
              onClick={() => setShowFavoritesOnly(false)}
            >
              All
            </Button>
            <Button
              type="button"
              size="sm"
              variant={showFavoritesOnly ? "secondary" : "ghost"}
              className={`h-7 rounded-full px-3 text-xs ${
                showFavoritesOnly ? "shadow-sm" : ""
              }`}
              onClick={() => setShowFavoritesOnly(true)}
              disabled={totalFavorites === 0}
            >
              Favorites
              {totalFavorites > 0 && (
                <span className="ml-1 rounded-full bg-background/80 px-1.5 text-[0.65rem]">
                  {totalFavorites}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="space-y-4">
        {error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Card key={idx} className="overflow-hidden border-border/60">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="space-y-2 p-3">
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-1">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredShorts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              No shorts found. Try another search term
              {showFavoritesOnly ? " or show all instead." : "."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredShorts.map((short) => {
              const isFavorite = favorites.has(short.id);
              return (
                <Card
                  key={short.id}
                  className="group flex flex-col overflow-hidden border-border/60 bg-background/80 shadow-sm transition-shadow hover:shadow-lg duration-300"
                >
                  <div
                    className="relative cursor-pointer -mt-6"
                    onClick={() => openShort(short)}
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <video
                        src={short.videoUrl}
                        muted
                        preload="metadata"
                        className="absolute inset-0 block h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90" />
                    <div className="pointer-events-none absolute inset-x-2 bottom-2 flex flex-wrap items-end justify-between gap-2 text-xs text-white">
                      <div className="max-w-[70%] truncate text-sm font-medium drop-shadow">
                        {short.title}
                      </div>
                    </div>
                  </div>

                  <CardContent className="flex flex-1 flex-col justify-between gap-2 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="line-clamp-2 text-sm font-semibold">
                          {short.title}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {short.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[0.65rem] uppercase tracking-wide"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant={isFavorite ? "default" : "outline"}
                        className={`h-8 w-8 shrink-0 rounded-full ${
                          isFavorite
                            ? "bg-pink-600 text-white hover:bg-pink-700"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(short.id);
                        }}
                        aria-label={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <Heart
                          className={`h-4 w-4 transition ${
                            isFavorite ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Video dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-3xl border-border/70 bg-background/95">
          {activeShort && (
            <>
              <DialogHeader>
                <DialogTitle className="flex flex-wrap items-center justify-between gap-2 mt-4">
                  <span>{activeShort.title}</span>
                  <div className="flex flex-wrap gap-1">
                    {activeShort.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[0.65rem] uppercase tracking-wide"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Playing from your Short-flix collection.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2">
                <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
                  <video
                    src={activeShort.videoUrl}
                    controls
                    autoPlay
                    className="block h-full w-full object-contain"
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
