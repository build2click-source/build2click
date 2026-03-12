export default function AgencyHome() {
    return (
        <>
            {/* Hero (carousel) */}
            <section className="hero bg-dark text-light py-5">
                <div className="container text-center">
                    <div
                        id="heroCarousel"
                        className="carousel slide"
                        data-bs-ride="carousel"
                        data-bs-interval="6000"
                        data-bs-pause="hover"
                        role="region"
                        aria-label="Hero messages"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <h1 className="mb-3">Creative Digital Solutions That Grow Your Business</h1>
                                <p className="lead mb-4">
                                    Website Design, Branding, Software Development, and Marketing Solutions to make your brand stand out.
                                </p>
                            </div>
                            <div className="carousel-item">
                                <h1 className="mb-3">Websites That Convert Visitors into Customers</h1>
                                <p className="lead mb-4">
                                    Conversion-focused design, fast performance, and SEO-first development.
                                </p>
                            </div>
                            <div className="carousel-item">
                                <h1 className="mb-3">Brand Identity & Digital Product Design</h1>
                                <p className="lead mb-4">
                                    Clear visual systems and UX that strengthen your brand presence online.
                                </p>
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#heroCarousel"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="services-heading">
                            <a href="/services" className="btn btn-primary btn-lg" role="button" aria-label="Go to Our Services">
                                Our Services
                            </a>
                        </h2>
                        <p>Professional solutions under one roof</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card p-4 text-center h-100">
                                <img
                                    src="/design3.jpg"
                                    loading="lazy"
                                    className="img-fluid rounded mb-3"
                                    alt="Web Design"
                                />
                                <h5>Website Design & Development</h5>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 text-center h-100">
                                <img
                                    src="/designLo.webp"
                                    loading="lazy"
                                    className="img-fluid rounded mb-3"
                                    alt="Logo Design"
                                />
                                <h5>Logo & Brand Identity Design</h5>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card p-4 text-center h-100">
                                <img
                                    src="/software20.jpg"
                                    loading="lazy"
                                    className="img-fluid rounded mb-3"
                                    alt="Software Development"
                                />
                                <h5>Software Development</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="about-section py-5 text-center">
                <div className="container">
                    <h2>About Build2Click</h2>
                    <p className="mt-3">
                        Build2Click is a leading website design and digital solutions company in India, trusted by over 160+ clients
                        for delivering creative, scalable, and result-driven digital experiences.
                    </p>
                    <a href="/about" className="btn btn-primary mt-3">
                        Read More
                    </a>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section text-center">
                <div className="container">
                    <h2>Ready to Grow Your Business Online?</h2>
                    <p>
                        Whether you’re launching a new brand, redesigning your website, or looking for reliable maintenance services, Build2Click is your digital partner.
                    </p>
                    <a href="/contact" className="btn btn-primary btn-lg">
                        Get Started
                    </a>
                </div>
            </section>
        </>
    );
}
