"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as api from "@/lib/api";

const IMAGES_PER_LOAD = 8; // 2 rows × 4 columns

/**
 * Gallery Page
 * Masonry grid with category filters and lightbox modal
 */
export default function GalleryPage() {
  const [items, setItems] = React.useState<Record<string, string>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [hero, setHero] = React.useState<Record<string, string>>({ title: "", subtitle: "" });
  const [categories, setCategories] = React.useState<string[]>(["All"]);
  const [visibleCount, setVisibleCount] = React.useState(IMAGES_PER_LOAD);

  React.useEffect(() => {
    api.getGallery().then(data => {
      setItems(data);
      // Extract unique categories from the gallery items
      const uniqueCats: string[] = Array.from(new Set(data.map((item: Record<string, string>) => item.category).filter(Boolean)));
      if (uniqueCats.length > 0) {
        setCategories(["All", ...uniqueCats]);
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });

    api.getHeroByPage('gallery').then((data: Record<string, string>) => {
      if (data?.title) setHero(data);
    }).catch(console.error);
  }, []);

  const filteredItems = React.useMemo(() => {
    if (selectedCategory === "All") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, items]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(IMAGES_PER_LOAD);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + IMAGES_PER_LOAD);
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={hero.title || ""}
        subtitle={hero.subtitle || ""}
        description={hero.description}
        backgroundImage={hero.backgroundImage}
        size="medium"
        showScrollIndicator={false}
      />

      {/* Gallery Section */}
      <section id="gallery" className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:border-primary hover:bg-primary"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Masonry Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : (
            <motion.div
              layout
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
            >
              <AnimatePresence>
                {visibleItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="mb-4 break-inside-avoid"
                  >
                    <div
                      className="relative group cursor-pointer rounded-xl overflow-hidden"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-sm">
                            {item.title}
                          </h3>
                          <span className="text-primary text-xs capitalize">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* View More Button */}
          {!loading && hasMore && (
            <div className="flex justify-center mt-10">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                className="gap-2 px-8 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
              >
                View More
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Gallery Image"
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <CTABanner
        title="Want to Be Part of Our Story?"
        description="Join our next batch and create memories that last a lifetime."
        ctaText="Explore Courses"
        ctaHref="/bbta-courses"
      />
    </>
  );
}
