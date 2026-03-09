"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import "swiper/css/autoplay";

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
}

export function BannerSlider({ slides }: BannerSliderProps) {
    const [reverse, setReverse] = useState(false);
    const [reverseLast, setReverseLast] = useState(false);
    const [mounted, setMounted] = useState(false);
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

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Filter to only active slides, sorted by order
    const activeSlides = slides
        .filter((s) => s.isActive)
        .sort((a, b) => a.order - b.order);

    if (activeSlides.length === 0) return null;

    return (
        <section className="banner-slider">
            <Swiper
                modules={[Navigation, Pagination, Parallax, Autoplay]}
                speed={reverse ? 700 : 2500}
                onSlideChange={(swiper) => {
                    if (swiper.isEnd) {
                        setTimeout(() => setReverse(true), 1900);
                        setTimeout(() => setReverseLast(true), 2700);
                    }
                    if (reverse && swiper.isBeginning) {
                        setReverse(false);
                        setReverseLast(false);
                    }
                }}
                allowTouchMove={false}
                autoplay={{
                    delay: reverse ? 500 : 2500,
                    disableOnInteraction: true,
                    reverseDirection: reverse,
                    stopOnLastSlide: true,
                    pauseOnMouseEnter: false,
                }}
                parallax
                loop
                wrapperClass="swiper-wrapper"
                pagination={{
                    clickable: true,
                    el: ".banner-pagination",
                }}
            >
                {activeSlides.map((slide) => (
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
                                    <h1
                                        className={`slide-heading ${reverseLast ? "opacity-0" : "opacity-100"} ${mounted ? "slide-mounted" : ""}`}
                                    >
                                        <span className="block">{slide.line_1}</span>
                                        <span className="block">{slide.line_2}</span>
                                    </h1>
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
