import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Build2Click – Web Design & Digital Solutions",
    description: "Build2Click – Web Design, Branding, Software Development & Digital Marketing solutions.",
};

export default function AgencyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="/style.css" />
            </head>
            <body>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            <img src="/logo.png" alt="Build2Click logo" className="brand-logo" />
                            <span className="brand-text">Build2Click</span>
                        </a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto align-items-lg-center">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/services">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/contact">Contact</a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-sm btn-outline-secondary ms-lg-3" id="darkModeToggle">
                                        🌙 Dark Mode
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {children}

                <footer className="py-4 bg-dark text-center text-light">
                    <p className="mb-1">Email: build2click@gmail.com</p>
                    <p className="mb-0">
                        © <span id="year"></span> Build2Click. All Rights Reserved.
                    </p>
                </footer>

                <a
                    className="whatsapp"
                    href="https://wa.me/917980313975"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                >
                    <i className="fa-brands fa-whatsapp"></i>
                </a>

                {/* Global dependencies */}
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive"></Script>
                <Script src="/script.js" strategy="lazyOnload"></Script>
            </body>
        </html>
    );
}
