"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // Load only the slim version to keep bundle size small
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // Optional callback when particles are loaded
    };

    const options: ISourceOptions = {
        fullScreen: {
            enable: true,
            zIndex: -1
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                resize: {
                    enable: true
                }
            },
            modes: {
                push: {
                    quantity: 4,
                },
                grab: {
                    distance: 150,
                    links: {
                        opacity: 0.3
                    }
                },
            },
        },
        particles: {
            color: {
                value: "#6366f1", // primary theme color
            },
            links: {
                color: "#818cf8",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 1.5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    width: 800,
                    height: 800
                },
                value: 60,
            },
            opacity: {
                value: { min: 0.1, max: 0.4 },
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                }
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 4 },
                animation: {
                    enable: true,
                    speed: 2,
                    sync: false
                }
            },
        },
        detectRetina: true,
    };

    if (init) {
        return (
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                className="absolute inset-0 z-[-1]"
            />
        );
    }

    return null;
}
