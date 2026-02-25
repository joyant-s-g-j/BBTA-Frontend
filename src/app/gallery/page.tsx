"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { HeroSection } from "@/components/sections/HeroSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as api from "@/lib/api";

type Category = "All" | "Training" | "Events" | "Cafe" | "Students";

/**
 * Gallery Page
 * Masonry grid with category filters and lightbox modal
 */
export default function GalleryPage() {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("All");
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [hero, setHero] = React.useState<any>(null);

  const categories: Category[] = ["All", "Training", "Events", "Cafe", "Students"];

  React.useEffect(() => {
    api.getGallery().then(data => {
      setItems(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });

    api.getHeroByPage('gallery').then(setHero).catch(console.error);
  }, []);

  const filteredItems = React.useMemo(() => {
    if (selectedCategory === "All") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, items]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        {...(hero || {
          title: "Our Gallery",
          subtitle: "Moments & Memories",
          description: "Explore snapshots from our training sessions, events, and the journeys of our students.",
          backgroundImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920"
        })}
        ctaText="View Gallery"
        ctaHref="#gallery"
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
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-border hover:border-primary hover:text-primary"
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
                {filteredItems.map((item, index) => (
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
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
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
