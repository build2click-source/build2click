import React from 'react';
import Image from 'next/image';

export default function CardPage() {
    return (
        <div style={{
            margin: 0,
            fontFamily: "'Poppins', sans-serif",
            background: "radial-gradient(circle at top, #1a1a1a, #000)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
        }}>
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        
        body {
            margin: 0;
            background: #000;
        }

        .b2c-card {
            max-width: 350px;
            width: 100%;
            padding: 36px 26px;
            text-align: center;
            border-radius: 20px;
            background: linear-gradient(145deg, #0b0b0b, #161616);
            border: 1px solid rgba(212,175,55,0.4);
            box-shadow: 0 0 30px rgba(212,175,55,0.25);
            box-sizing: border-box;
        }

        .b2c-logo {
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
        }

        .b2c-logo img {
            width: 50%;
            height: auto;
            object-fit: cover;
        }

        .b2c-tagline {
            font-size: 16px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            color: #ccc;
            margin-bottom: 26px;
        }

        .b2c-btn {
            display: block;
            margin: 12px 0;
            padding: 14px;
            border-radius: 30px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            color: #000;
            background: linear-gradient(135deg, #d4af37, #f5d77a);
            box-shadow: 0 8px 18px rgba(212,175,55,0.45);
            transition: 0.3s;
        }

        .b2c-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 26px rgba(212,175,55,0.7);
        }

        .b2c-btn.outline {
            background: transparent;
            color: #d4af37;
            border: 1px solid #d4af37;
            box-shadow: none;
        }

        .b2c-footer {
            margin-top: 22px;
            font-size: 12px;
            color: #888;
        }
      `}} />

            <div className="b2c-card">
                <div className="b2c-logo">
                    <Image src="/LOGO2.png" alt="BUILD2CLICK" width={175} height={175} />
                </div>

                <div className="b2c-tagline">
                    <b> Web Design • Branding • Digital Solutions </b>
                </div>

                <a className="b2c-btn" href="tel:+917980313975">📞 Call Now </a>
                <a className="b2c-btn" href="https://wa.me/message/27KNHBXJ4VTOG1">💬 WhatsApp</a>
                <a className="b2c-btn" href="https://www.instagram.com/build2click?igsh=MW1tMTJxY2RoeXdkMg==" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
                <a className="b2c-btn" href="https://www.build2click.in" target="_blank" rel="noopener noreferrer">🌍 Website</a>

                <a className="b2c-btn outline" href="/build2click.vcf" download>
                    ⬇ Save Contact
                </a>

                <div className="b2c-footer">
                    © {new Date().getFullYear()} BUILD2CLICK
                </div>
            </div>
        </div>
    );
}
