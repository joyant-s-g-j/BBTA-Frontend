"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Filter } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as api from "@/lib/api";

interface VideoItem {
  id: string;
  title: string;
  embedUrl: string;
  thumbnail?: string;
  category: string;
  order: number;
}

/**
 * Videos Page
 * Modern grid layout with category filters, lightbox player, and hover previews.
 */
export default function VideosPage() {
  const [videos, setVideos] = React.useState<VideoItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [playingVideo, setPlayingVideo] = React.useState<VideoItem | null>(null);
  const [hero, setHero] = React.useState<Record<string, string>>({ title: "", subtitle: "" });
  const [cta, setCta] = React.useState<Record<string, string> | null>(null);

  React.useEffect(() => {
    api.getVideos().then((data: VideoItem[]) => {
      const sorted = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setVideos(sorted);
      setLoading(false);
    }).catch(() => setLoading(false));

    api.getHeroByPage("videos").then((data: Record<string, string>) => {
      if (data?.title) setHero(data);
    }).catch(() => {});

    api.getCtaBanner().then((data: Record<string, string>) => {
      if (data?.title) setCta(data);
    }).catch(() => {});
  }, []);

  // Extract unique categories
  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(videos.map((v) => v.category).filter(Boolean)));
    return ["All", ...cats];
  }, [videos]);

  const filteredVideos = React.useMemo(() => {
    if (selectedCategory === "All") return videos;
    return videos.filter((v) => v.category === selectedCategory);
  }, [selectedCategory, videos]);

  /**
   * Extract a YouTube thumbnail from an embed URL.
   * Works for standard youtube.com/embed/VIDEO_ID links.
   */
  const getYouTubeThumbnail = (embedUrl: string): string | null => {
    const match = embedUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
    if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    return null;
  };

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={hero.title || "Our Videos"}
        subtitle={hero.subtitle || "Watch & Learn"}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        size="medium"
        showScrollIndicator={false}
      />

      {/* Videos Grid Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className={
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "border-border hover:border-primary hover:text-primary"
                  }
                >
                  {cat === "All" && <Filter className="h-3.5 w-3.5 mr-1.5" />}
                  {cat}
                </Button>
              ))}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent animate-spin rounded-full" />
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No videos found.
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredVideos.map((video, index) => {
                  const thumb = video.thumbnail || getYouTubeThumbnail(video.embedUrl);
                  return (
                    <motion.div
                      key={video.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <div
                        className="group relative rounded-2xl overflow-hidden bg-card border border-border/40 cursor-pointer hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                        onClick={() => setPlayingVideo(video)}
                      >
                        {/* Thumbnail / Preview */}
                        <div className="relative aspect-video bg-muted/30 overflow-hidden">
                          {thumb ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={thumb}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-primary/5">
                              <Play className="h-12 w-12 text-primary/40" />
                            </div>
                          )}

                          {/* Play overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                            <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
                              <Play className="h-6 w-6 text-primary-foreground ml-0.5" fill="currentColor" />
                            </div>
                          </div>

                          {/* Category badge */}
                          {video.category && video.category !== "General" && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-medium uppercase tracking-wider text-white">
                              {video.category}
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <div className="p-4">
                          <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Video Lightbox */}
      <Dialog open={!!playingVideo} onOpenChange={() => setPlayingVideo(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden">
          {playingVideo && (
            <div className="aspect-video w-full">
              <iframe
                src={`${playingVideo.embedUrl}${playingVideo.embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={playingVideo.title}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      {cta && cta.title && (
        <CTABanner
          title={cta.title}
          description={cta.description}
          ctaText={cta.buttonText}
          ctaHref={cta.buttonUrl}
        />
      )}
    </>
  );
}
