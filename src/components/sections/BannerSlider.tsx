"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

interface BannerSlide {
    id: string;
    image: string;
    line_1: string;
    line_2: string;
    order: number;
    isActive: boolean;
}

interface BannerSliderProps {
    slides: BannerSlide[];
    ctaText?: string;
    ctaHref?: string;
    secondaryCtaText?: string;
    secondaryCtaHref?: string;
}

export function BannerSlider({ slides, ctaText, ctaHref, secondaryCtaText, secondaryCtaHref }: BannerSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const [parallaxValue, setParallaxValue] = useState(400);

    useEffect(() => {
        const updateParallax = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setParallaxValue(200);
            } else if (width < 1200) {
                setParallaxValue(300);
            } else {
                setParallaxValue(400);
            }
        };
        updateParallax();
        window.addEventListener("resize", updateParallax);
        return () => window.removeEventListener("resize", updateParallax);
    }, []);

    // Filter to only active slides, sorted by order
    const activeSlides = slides
        .filter((s) => s.isActive)
        .sort((a, b) => a.order - b.order);

    if (activeSlides.length === 0) return null;

    const handleSlideChangeStart = (swiper: SwiperType) => {
        // Old text exits, new text enters — both start at same time as image
        setPrevIndex(activeIndex);
        setActiveIndex(swiper.realIndex);
    };

    return (
        <section className="banner-slider">
            <Swiper
                modules={[Navigation, Pagination, Parallax, Autoplay, EffectFade]}
                speed={1800}
                onSlideChangeTransitionStart={handleSlideChangeStart}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                parallax
                loop
                pagination={{
                    clickable: true,
                    el: ".banner-pagination",
                }}
            >
                {activeSlides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="slide-bg"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                            data-swiper-parallax={parallaxValue}
                        >
                            <div className="slide-overlay" />
                            <div className="slide-container">
                                <div className="slide-content">
                                    <div
                                        className={`slide-text-wrapper ${
                                            activeIndex === index
                                                ? "slide-text-enter"
                                                : prevIndex === index
                                                ? "slide-text-exit"
                                                : "slide-text-hidden"
                                        }`}
                                    >
                                        <h1 className="slide-heading">
                                            <span className="block">{slide.line_1}</span>
                                            <span className="block">{slide.line_2}</span>
                                        </h1>
                                    </div>
                                    {(ctaText || secondaryCtaText) && (
                                        <div className="slide-cta-buttons">
                                            {ctaText && ctaHref && (
                                                <Link href={ctaHref} className="slide-btn-primary">
                                                    {ctaText}
                                                </Link>
                                            )}
                                            {secondaryCtaText && secondaryCtaHref && (
                                                <Link href={secondaryCtaHref} className="slide-btn-secondary">
                                                    {secondaryCtaText}
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="banner-pagination" />
            </Swiper>
        </section>
    );
}
