"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number | string;
  image?: string;
}

function getItemsPerLoad(width: number) {
  if (width >= 1280) return 6;
  if (width >= 640) return 4;
  return 2;
}

export function ReviewTestimonialsGrid({ reviews }: { reviews: Testimonial[] }) {
  const [itemsPerLoad, setItemsPerLoad] = useState(6);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const updateChunkSize = () => {
      const nextChunk = getItemsPerLoad(window.innerWidth);
      setItemsPerLoad(nextChunk);
      setVisibleCount((prev) => {
        const nextVisible = Math.max(prev, nextChunk);
        const rounded = Math.ceil(nextVisible / nextChunk) * nextChunk;
        return Math.min(rounded, reviews.length || rounded);
      });
    };

    updateChunkSize();
    window.addEventListener("resize", updateChunkSize, { passive: true });

    return () => window.removeEventListener("resize", updateChunkSize);
  }, [reviews.length]);

  const visibleReviews = useMemo(() => reviews.slice(0, visibleCount), [reviews, visibleCount]);
  const hasMore = visibleCount < reviews.length;

  return (
    <>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-12">
        {visibleReviews.map((review) => {
          const rating = Math.max(0, Math.min(5, Number(review.rating || 0)));

          return (
            <article
              key={review.id}
              className="group relative rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm p-6 card-hover overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden border border-primary/30 shrink-0 bg-muted">
                      {review.image ? (
                        <Image
                          src={review.image}
                          alt={review.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-lg font-bold text-primary">
                          {review.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                        {review.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                    </div>
                  </div>

                  <Quote className="h-8 w-8 text-primary/30 shrink-0" />
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={`${review.id}-${index}`}
                      className={`h-4 w-4 ${index < rating ? "text-primary fill-primary" : "text-muted-foreground/40"}`}
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => setVisibleCount((prev) => Math.min(prev + itemsPerLoad, reviews.length))}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            View More
          </Button>
        </div>
      )}
    </>
  );
}
