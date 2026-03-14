"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Parallax } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/parallax";

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
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const directionRef = React.useRef<"forward" | "backward">("forward");

    // Filter to only active slides, sorted by order
    const activeSlides = slides
        .filter((s) => s.isActive)
        .sort((a, b) => a.order - b.order);

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

    // Custom autoplay using interval to control direction
    useEffect(() => {
        if (!swiperInstance || activeSlides.length <= 1) return;

        const interval = setInterval(() => {
            if (directionRef.current === "forward") {
                swiperInstance.slideNext(2000);
            } else {
                swiperInstance.slidePrev(2000);
            }
        }, 5000 + 2000); // delay + transition time

        return () => clearInterval(interval);
    }, [swiperInstance, activeSlides.length]);

    if (activeSlides.length === 0) return null;

    const handleSlideChangeStart = (swiper: SwiperType) => {
        // Old text exits, new text enters — both start at same time as image
        setPrevIndex(activeIndex);
        setActiveIndex(swiper.activeIndex);
    };

    const handleReachEnd = (swiper: SwiperType) => {
        directionRef.current = "backward";
        if (swiper.autoplay) {
            swiper.autoplay.stop();
            setTimeout(() => {
                swiper.autoplay.start();
            }, 50);
        }
    };

    const handleReachBeginning = (swiper: SwiperType) => {
        directionRef.current = "forward";
        if (swiper.autoplay) {
            swiper.autoplay.stop();
            setTimeout(() => {
                swiper.autoplay.start();
            }, 50);
        }
    };

    return (
        <section className="banner-slider">
            <Swiper
                modules={[Pagination, Parallax]}
                speed={2000}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
                onSlideChangeTransitionStart={handleSlideChangeStart}
                onReachEnd={handleReachEnd}
                onReachBeginning={handleReachBeginning}
                parallax
                pagination={{
                    clickable: true,
                    el: ".banner-pagination",
                }}
            >
                {activeSlides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="slide-bg"
                            data-swiper-parallax={parallaxValue}
                        >
                            <Image
                                src={slide.image}
                                alt={`${slide.line_1} ${slide.line_2}`}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority={index === 0}
                                quality={75}
                            />
                            <div className="slide-overlay" />
                            <div className="slide-container">
                                <div className="slide-content">
                                    <div
                                        className={`slide-text-wrapper ${activeIndex === index
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
                        </div>
                    </SwiperSlide>
                ))}
                <div className="banner-pagination" />
            </Swiper>
        </section>
    );
}
