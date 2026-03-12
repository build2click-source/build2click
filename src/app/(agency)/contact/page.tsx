export default function AgencyContact() {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-5">
                        <div className="p-4 bg-white rounded shadow-sm contact-card">
                            <h3>
                                <b>Get in Touch</b>
                            </h3>
                            <br />
                            <p className="text-muted">We’re here to help — reach out by phone, email, or message using the form.</p>
                            <ul className="list-unstyled mt-3 contact-info">
                                <li className="mb-2">
                                    <i className="fa-solid fa-phone me-2"></i>
                                    <a href="tel:+917980313975">+91 79803 13975</a>
                                </li>
                                <li className="mb-2">
                                    <i className="fa-solid fa-envelope me-2"></i>
                                    <a href="mailto:build2click@gmail.com">build2click@gmail.com</a>
                                </li>
                                <li className="mb-2">
                                    <i className="fa-solid fa-map-marker-alt me-2"></i>India
                                </li>
                            </ul>
                            <div className="mt-3">
                                <a
                                    className="btn btn-outline-secondary me-2"
                                    href="https://wa.me/917980313975"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa-brands fa-whatsapp me-1" style={{ color: "#25D366" }}></i>Chat
                                </a>
                                <a className="btn btn-outline-secondary" href="mailto:build2click@gmail.com">
                                    <i className="fa-solid fa-envelope me-1"></i>Email
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="p-4 bg-white rounded shadow-sm">
                            <h4>Reach out to us</h4>
                            <form id="contactForm" className="contact-form">
                                <div className="row gx-2">
                                    <div className="col-md-6 mb-2">
                                        <label className="visually-hidden" htmlFor="c-name">
                                            Name
                                        </label>
                                        <input id="c-name" name="name" className="form-control" placeholder="Your name" required />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <label className="visually-hidden" htmlFor="c-email">
                                            Email
                                        </label>
                                        <input id="c-email" type="email" name="email" className="form-control" placeholder="Email address" required />
                                    </div>
                                </div>
                                <div className="row gx-2">
                                    <div className="col-md-6 mb-2">
                                        <label className="visually-hidden" htmlFor="c-phone">
                                            Phone
                                        </label>
                                        <input id="c-phone" name="phone" className="form-control" placeholder="Phone (optional)" />
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <label className="visually-hidden" htmlFor="c-subject">
                                            Subject
                                        </label>
                                        <input id="c-subject" name="subject" className="form-control" placeholder="Subject" />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="visually-hidden" htmlFor="c-msg">
                                        Message
                                    </label>
                                    <textarea id="c-msg" name="message" rows={3} className="form-control" placeholder="Message..." required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Send Message
                                </button>
                                <div id="contactFormMsg" className="mt-2 small text-muted"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
