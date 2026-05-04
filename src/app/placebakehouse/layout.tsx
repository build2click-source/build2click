import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Place Bakehouse | Digital E-Card",
  description:
    "Specialty Coffee & Bakes by MasterChef India Winners Ajinkya & Vikram Gandhe. Located at Chatrapati Square, Nagpur.",
};

export default function PlaceBakehouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* FontAwesome */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        {/* Phosphor Icons */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://unpkg.com/@phosphor-icons/web" />
        {/* Tailwind CDN */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.tailwindcss.com" />
        {/* Tailwind custom coffee palette */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      coffee: {
                        900: '#2C1E16',
                        800: '#4A3525',
                        600: '#8C6239',
                        400: '#D9B48F',
                        200: '#F4E3D3',
                        100: '#FDF8F5',
                        50:  '#FFFCF9'
                      }
                    },
                    fontFamily: {
                      serif: ['"Playfair Display"', 'serif'],
                      sans:  ['"Poppins"', 'sans-serif'],
                    }
                  }
                }
              }
            `,
          }}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          body{background-color:#E8E4D9;background-image:radial-gradient(#D9B48F 1px,transparent 1px);background-size:20px 20px;}
          .card-glass{background:rgba(253,248,245,0.95);backdrop-filter:blur(10px);box-shadow:0 20px 40px -15px rgba(74,53,37,0.2);}
          .header-pattern{background:linear-gradient(135deg,#4A3525 0%,#2C1E16 100%);position:relative;overflow:hidden;}
          .header-pattern::after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background-image:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238c6239' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");opacity:0.5;}
          .avatar-container{transform:translateY(-50%);margin-bottom:-50px;}
          .icon-circle{transition:all 0.3s ease;}
          .contact-item:hover .icon-circle{background-color:#4A3525;color:#FDF8F5;transform:scale(1.1);}
          .btn-hover-effect{transition:transform 0.3s cubic-bezier(0.4,0,0.2,1),box-shadow 0.3s ease;}
          .btn-hover-effect:hover{transform:translateY(-3px);box-shadow:0 10px 20px -5px rgba(74,53,37,0.3);}
          @keyframes popBox{0%{transform:scale(1);box-shadow:0 0 0 0 rgba(217,180,143,0.6);}50%{transform:scale(1.15);box-shadow:0 0 0 6px rgba(217,180,143,0);}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(217,180,143,0);}}
          .animate-pop-box{animation:popBox 2s infinite cubic-bezier(0.66,0,0,1);}
          @keyframes steamRise{0%{transform:translateY(0) scale(1);opacity:0;}50%{opacity:1;}100%{transform:translateY(-10px) scale(1.1);opacity:0;}}
          .animate-steam{animation:steamRise 2s ease-in-out infinite;}
          .animate-steam-delay-1{animation:steamRise 2s ease-in-out infinite 0.6s;}
          .animate-steam-delay-2{animation:steamRise 2s ease-in-out infinite 1.2s;}
          @keyframes gentleBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
          .animate-gentle-bounce{animation:gentleBounce 2s ease-in-out infinite;}
          @keyframes slideInLeft{0%{opacity:0;transform:translateX(-40px) scale(0.85);}100%{opacity:1;transform:translateX(0) scale(1);}}
          .winner-slide-in{animation:slideInLeft 0.45s cubic-bezier(0.22,1,0.36,1) forwards;}
          #toast{visibility:hidden;opacity:0;transition:opacity 0.3s,bottom 0.3s;}
          #toast.show{visibility:visible;opacity:1;bottom:2rem;}
        ` }} />
      </head>
      <body className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 text-coffee-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
