"use client";
import Link from "next/link";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SplitType from 'split-type';

export default function Book_A_Slot() {
    const quoteRef = useRef(null);
    
    useEffect(() => {
        // Make sure the DOM is loaded
        if (!quoteRef.current) return;
        
        // Create new SplitType instance after component renders
        const typeSplit = new SplitType(quoteRef.current, {
            types: 'lines',
            tagName: 'span'
        });
        
        // Get the split elements
        const lines = quoteRef.current.querySelectorAll('.line');
        
        // Create a timeline for smoother animation
        const tl = gsap.timeline();
        
        // Reset any previous styles that might affect the animation
        gsap.set(lines, { opacity: 0, y: 100 });
        
        // Apply the animation
        tl.to(lines, {
            y: 0,
            opacity: 1,
            duration: 1.25,
            ease: "power4.out",
            stagger: 0.45,
        });
        
        // Cleanup function
        return () => {
            // Clean up animations
            tl.kill();
            if (typeSplit && typeSplit.revert) {
                typeSplit.revert();
            }
        };
    }, []); // Empty dependency array means this runs once after mount
    
    return (
        <>
        
            <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&family=Jockey+One&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
                .connect-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                }
                
                .connect-quote {
                    flex: 1;
                    padding: 2rem;
                    overflow: hidden; /* Important for animations that move elements */
                }
                
                .quote-line {
                    font-family: 'Quicksand', sans-serif;
                    font-weight: 700;
                    font-size: 4rem;
                    letter-spacing: 1px;
                    margin: 0.5rem 0;
                    color: #333;
                    display: block; /* Ensures proper line handling */
                    position: relative; /* For positioning animations */
                }
                
                .connect-image {
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                }
                
                .connect-image img {
                    max-width: 100%;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
                
                @media (max-width: 768px) {
                    .connect-container {
                        flex-direction: column-reverse;
                    }
                    
                    .connect-quote {
                        text-align: center;
                        padding: 1rem;
                    }
                    
                    .quote-line {
                        font-size: 2rem;
                    }
                    
                    .connect-image {
                        justify-content: center;
                    }
                }
            `}</style>
            
            <section className="category-area pt-70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tpsection mb-40">
                                <h4 className="tpsection__title">Our <span> Motive <img src="/assets/img/icon/title-shape-01.jpg" alt="" /></span></h4>
                            </div>
                        </div>
                    </div>
                    <div className="custom-row category-border pb-45">
                        <div className="connect-container">
                            <div className="connect-quote" ref={quoteRef}>
                                <h2 className="quote-line">CONTROL.</h2><br />
                                <h2 className="quote-line">CONNECT.</h2>
                                <h2 className="quote-line">COLLABORATE.</h2>
                            </div>
                            <div className="connect-image">
                                <img src='/assets/img/connect.jpg' alt="connect" loading="lazy"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}