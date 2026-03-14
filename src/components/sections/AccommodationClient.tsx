"use client";

import * as React from "react";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Accommodation } from "@/lib/data";

interface AccommodationClientProps {
  items: Accommodation[];
  sectionHeader: { subtitle?: string; title?: string; description?: string };
}

export function AccommodationClient({ items, sectionHeader }: AccommodationClientProps) {
  const [filter, setFilter] = React.useState<"All" | "Male" | "Female">("All");
  const [selected, setSelected] = React.useState<Accommodation | null>(null);
  const [activeImage, setActiveImage] = React.useState(0);

  const filtered = items.filter((item) => {
    if (!item.isActive) return false;
    if (filter === "All") return true;
    return item.gender === filter;
  });

  const openDetails = (item: Accommodation) => {
    setSelected(item);
    setActiveImage(0);
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle={sectionHeader.subtitle || ""}
          title={sectionHeader.title || ""}
          description={sectionHeader.description}
          titleSize="text-3xl md:text-4xl"
        />

        <div className="flex justify-center gap-2 mb-8">
          {(["All", "Male", "Female"] as const).map((value) => (
            <Button
              key={value}
              type="button"
              variant={filter === value ? "default" : "outline"}
              onClick={() => setFilter(value)}
            >
              {value}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No accommodations available right now.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <article key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden card-hover">
                <div className="relative h-52 bg-muted">
                  {item.images?.[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : null}
                  <div className="absolute top-3 right-3">
                    <Badge>{item.gender}</Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                  <p className="text-primary font-semibold">{item.price || "Price on request"}</p>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-primary" /> {item.roomCount || 0} Rooms ({item.roomType || "Standard"})</p>
                    <p className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> {item.seatCount || 0} Seats</p>
                    <p className="flex items-center gap-2"><Bath className="h-4 w-4 text-primary" /> {item.attachedBathroom ? "Attached Bathroom" : "Shared Bathroom"}</p>
                    {item.location ? <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {item.location}</p> : null}
                  </div>

                  <Button className="w-full" onClick={() => openDetails(item)}>View Details</Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected ? (
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">{selected.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              {selected.images?.length ? (
                <div className="space-y-3">
                  <div className="relative h-64 rounded-xl overflow-hidden bg-muted">
                    <Image
                      src={selected.images[activeImage]}
                      alt={`${selected.title} image ${activeImage + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{selected.images.length} image(s) available</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selected.images.map((image, index) => (
                      <button
                        key={`${selected.id}-${index}`}
                        type="button"
                        className={`relative h-16 w-24 shrink-0 rounded-md overflow-hidden border ${activeImage === index ? "border-primary" : "border-border"}`}
                        onClick={() => setActiveImage(index)}
                      >
                        <Image src={image} alt={`thumb-${index + 1}`} fill className="object-cover" sizes="96px" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <p><span className="font-semibold">Gender:</span> {selected.gender}</p>
                <p><span className="font-semibold">Price:</span> {selected.price || "N/A"}</p>
                <p><span className="font-semibold">Room Type:</span> {selected.roomType || "N/A"}</p>
                <p><span className="font-semibold">Room Count:</span> {selected.roomCount ?? 0}</p>
                <p><span className="font-semibold">Seat Count:</span> {selected.seatCount ?? 0}</p>
                <p><span className="font-semibold">Bathroom:</span> {selected.attachedBathroom ? "Attached" : "Shared"}</p>
              </div>

              {selected.location ? <p className="text-sm"><span className="font-semibold">Location:</span> {selected.location}</p> : null}
              {selected.description ? <p className="text-sm text-muted-foreground whitespace-pre-line">{selected.description}</p> : null}

              {selected.facilities?.length ? (
                <div>
                  <h4 className="font-semibold mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.facilities.map((facility, index) => (
                      <Badge key={`${facility}-${index}`} variant="secondary">{facility}</Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {selected.contactLink ? (
                <a href={selected.contactLink} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">Book Now</Button>
                </a>
              ) : (
                <Button className="w-full" disabled>Book Now (Unavailable)</Button>
              )}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  );
}
