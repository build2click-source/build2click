export default function AgencyAbout() {
    return (
        <>
            <section className="about-section py-5">
                <div className="container">
                    <div className="row align-items-center gy-4">
                        <div className="col-lg-7">
                            <h1 className="mb-3">Who We Are</h1>
                            <p className="lead mb-4">
                                Build2Click is a leading <strong>website design and digital solutions company in India</strong>, trusted by over <strong>160+ clients</strong> to deliver creative, scalable, and result-driven digital experiences.
                            </p>
                            <p>
                                We are a focused team of designers and developers who deliver measurable outcomes — increased leads, faster site performance, and improved conversions. Our approach combines modern UI/UX, strategic SEO, and scalable technology to help brands grow reliably.
                            </p>
                            <div className="mt-4">
                                <a href="/services" className="btn btn-primary me-2">Our Services</a>
                                <a href="/contact" className="btn btn-outline-secondary">Get a quote</a>
                            </div>
                        </div>
                        <div className="col-lg-5 text-center">
                            <div className="bg-white rounded shadow-sm p-3">
                                <img src="/design.jpg" className="img-fluid rounded" alt="Team at work" style={{ maxHeight: "260px" }} />
                            </div>
                        </div>
                    </div>

                    <div className="row text-center mt-5 gy-4 stats-row">
                        <div className="col-md-4">
                            <div className="stat-card stat-item p-4 bg-white rounded shadow-sm reveal">
                                <div className="stat-number" data-target="160" data-suffix="+" aria-hidden="true">160+</div>
                                <div className="stat-label text-muted">Happy clients</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stat-card stat-item p-4 bg-white rounded shadow-sm reveal">
                                <div className="stat-number" data-target="250" data-suffix="+" aria-hidden="true">250+</div>
                                <div className="stat-label text-muted">Completed Projects</div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="stat-card stat-item p-4 bg-white rounded shadow-sm reveal">
                                <div className="stat-number" data-target="99" data-suffix="%" aria-hidden="true">99%</div>
                                <div className="stat-label text-muted">Client satisfaction</div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 gy-4">
                        <div className="col-md-6">
                            <div className="stat-card h-100">
                                <h3>Why Choose Us</h3>
                                <div className="row gx-3 mt-3 gy-3">
                                    <div className="col-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-award"></i></div>
                                            <div className="feature-text"><strong>Proven Results</strong><div className="small text-muted">99% satisfied clients</div></div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-users"></i></div>
                                            <div className="feature-text"><strong>Experienced Team</strong><div className="small text-muted">Designers & developers in-house</div></div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-cubes"></i></div>
                                            <div className="feature-text"><strong>Custom Solutions</strong><div className="small text-muted">Tailored to your goals</div></div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-magnifying-glass-chart"></i></div>
                                            <div className="feature-text"><strong>SEO & Performance</strong><div className="small text-muted">Built for visibility & speed</div></div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-people-arrows"></i></div>
                                            <div className="feature-text"><strong>Partnership</strong><div className="small text-muted">Strategic, long-term approach</div></div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-headset"></i></div>
                                            <div className="feature-text"><strong>Reliable Support</strong><div className="small text-muted">Post-launch assistance</div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="stat-card h-100">
                                <h3>What We Do</h3>
                                <div className="row mt-3 gx-3 gy-3">
                                    <div className="col-12 col-sm-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-laptop-code"></i></div>
                                            <div className="feature-text"><strong>Website Design & Development</strong><div className="small text-muted">Custom, responsive, SEO-friendly websites.</div></div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-pencil-alt"></i></div>
                                            <div className="feature-text"><strong>Logo & Brand Identity</strong><div className="small text-muted">Clear, recognizable brand systems.</div></div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-code-branch"></i></div>
                                            <div className="feature-text"><strong>Software Development</strong><div className="small text-muted">Scalable web & backend solutions.</div></div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="feature-item">
                                            <div className="feature-icon"><i className="fa-solid fa-server"></i></div>
                                            <div className="feature-text"><strong>Website Maintenance</strong><div className="small text-muted">Updates, backups, and security.</div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 gy-4 align-items-start">
                        <div className="col-lg-7">
                            <h3>What our clients say</h3>
                            <div className="testimonials d-flex gap-3 flex-wrap mt-3">
                                <div className="testimonial p-4 bg-white rounded shadow-sm">
                                    <p className="mb-2">&quot;Build2Click redesigned and now maintains our website. It’s professional, easy to use, and always kept up to date.&quot;</p>
                                </div>
                                <div className="testimonial p-4 bg-white rounded shadow-sm">
                                    <p className="mb-2">&quot;Build2Click designed our product catalogue and brochures. The layouts are clear, attractive, and have helped us present our offerings more effectively to clients.&quot;</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="mt-4 p-3 bg-white rounded shadow-sm">
                                <h5>Schedule a free consult</h5>
                                <form id="consultForm" className="contact-inline" action="https://formsubmit.co/build2click@gmail.com" method="POST">
                                    <input type="hidden" name="_subject" value="New consult request from website" />
                                    <input type="hidden" name="_captcha" value="false" />
                                    <input type="hidden" name="_template" value="table" />
                                    <input type="hidden" name="_next" value="/about?submitted=1" />
                                    <div className="mb-2">
                                        <label className="visually-hidden" htmlFor="consult-name">Name</label>
                                        <input id="consult-name" className="form-control form-control-sm" name="name" placeholder="Name" required />
                                    </div>
                                    <div className="mb-2">
                                        <label className="visually-hidden" htmlFor="consult-email">Email</label>
                                        <input id="consult-email" className="form-control form-control-sm" name="email" type="email" placeholder="Email" required />
                                    </div>
                                    <div className="mb-2">
                                        <label className="visually-hidden" htmlFor="consult-phone">Phone</label>
                                        <input id="consult-phone" className="form-control form-control-sm" name="phone" placeholder="Phone (optional)" />
                                    </div>
                                    <button id="consultSubmit" className="btn btn-primary btn-sm w-100" type="submit">Request consult — free</button>
                                    <small className="d-block text-muted mt-2">We will respond within 24 hours. We respect your privacy.</small>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal fade" id="consultModal" tabIndex={-1} aria-labelledby="consultModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="consultModalLabel">Request sent</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" id="consultModalBody">Thank you! We received your request and will contact you within 24 hours.</div>
                        <div className="modal-footer">
                            <a id="consultEmailLink" className="btn btn-primary" href="mailto:build2click@gmail.com?subject=Consult%20request%20from%20website">Email us</a>
                            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
