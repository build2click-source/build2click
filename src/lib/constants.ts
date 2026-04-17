export const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;

export const SERVICES = [
  {
    title: "Web Architecture",
    desc: "Architecting performance-first digital storefronts. We build lightning-fast, SEO-optimized web experiences with React and Next.js.",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Custom Software",
    desc: "Enterprise-grade software solutions. Specializing in scalable backend architectures, cloud integration, and robust security.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Brand Identity",
    desc: "Comprehensive brand systems that position you as a market leader. From visual theory to full-scale brand books.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Targeted Growth",
    desc: "Data-driven marketing engines. Precision campaigns and conversion funnels designed to maximize your digital ROI.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "App Excellence",
    desc: "Fluid mobile experiences for iOS and Android. High-performance native interactions that keep users engaged.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "System Support",
    desc: "24/7 dedicated maintenance and optimization. Secure, reliable, and always evolving to meet your business needs.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Logo Mastery",
    desc: "Crafting iconic visual symbols that define your brand at first glance. Timeless designs for modern digital presence.",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Catalogue Design",
    desc: "High-impact product showcases designed for both digital-first browsing and premium high-key print quality.",
    img: "https://www.build2click.in/catalogue.png",
  },
  {
    title: "Business Cards",
    desc: "Tactile networking tools that leave an indelible mark of professional superiority. Custom finishes and elite stocks.",
    img: "https://www.build2click.in/business-cards.png",
  },
] as const;

export const CAPABILITIES = [
  {
    title: 'High-End Web Dev',
    desc: 'Architecting performance-first digital storefronts that turn browsers into buyers.',
    tags: ['Custom UI/UX', 'SEO Optimization', 'Headless CMS'],
    iconName: 'Code' as const,
  },
  {
    title: 'Mobile App Strategy',
    desc: 'Seamless, fluid mobile applications designed for retention and high-frequency engagement.',
    tags: ['iOS & Android', 'Real-Time Sync', 'Push Strategy'],
    iconName: 'Smartphone' as const,
  },
  {
    title: 'Premium Branding',
    desc: 'Strategic visual storytelling that positions your business at the top of its market tier.',
    tags: ['Logo Systems', 'Style Guides', 'Brand Voice'],
    iconName: 'Palette' as const,
  },
  {
    title: 'Performance Marketing',
    desc: 'Data-driven growth engines built to scale your conversions and maximize return on spend.',
    tags: ['PPC Management', 'Funnel Design', 'Analytics'],
    iconName: 'TrendingUp' as const,
  },
] as const;

export const GROWTH_BLOCKS = [
  {
    title: "Billing & Invoicing",
    desc: "Eliminate manual bookkeeping with our precision-engineered financial dashboards. We design robust billing systems that automatically generate invoices, capture real-time revenue analytics, and streamline cash flow tracking—empowering you to scale without the administrative burden.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    reverse: false,
  },
  {
    title: "Inventory Management",
    desc: "Gain absolute control over your supply chain. We develop centralized inventory hubs that automate restocking protocols, reduce human error, and provide granular visibility into stock lifecycles, ensuring your operations remain lean, accurate, and completely synchronized.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    reverse: true,
  },
  {
    title: "Employee & Payroll",
    desc: "Transform your human resources operations with intelligent, integrated management hubs. Our solutions unify metric tracking, automated payroll distribution, and performance evaluation into a single, intuitive platform customized for your team's unique workflows.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    reverse: false,
  },
  {
    title: "Brand Identity & Design",
    desc: "Command market authority through cohesive, high-impact visual systems. We meticulously craft every touchpoint—from bespoke logo architecture and refined typography to elite business materials—ensuring your digital and physical presence exudes uncompromising professionalism.",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    reverse: true,
  },
] as const;

export const STATS = [
  { endNum: 160, suffix: "+", label: "HAPPY CLIENTS", emoji: "👍", float: "-rotate-12" },
  { endNum: 250, suffix: "+", label: "COMPLETED PROJECTS", emoji: "🎉", float: "rotate-6" },
  { endNum: 99, suffix: "%", label: "CLIENT SATISFACTION", emoji: "🤩", float: "-rotate-6" },
] as const;

export const CORE_VALUES = [
  {
    title: "Resilience by\nDesign",
    desc: "We build fault-tolerant\nsystems meant to last.",
    iconName: 'Layers' as const,
  },
  {
    title: "User-Centricity",
    desc: "Every pixel and line of code\nserves the end-user.",
    iconName: 'Users' as const,
  },
  {
    title: "Transparent\nCollaboration",
    desc: "No black boxes. You see what\nwe see.",
    iconName: 'MessageSquare' as const,
  },
  {
    title: "Continuous\nEvolution",
    desc: "We iterate, improve, and stay\nahead of the curve.",
    iconName: 'RefreshCw' as const,
  },
] as const;

export const AI_STRATEGY_RESULT = [
  {
    title: "I. Core Digital Infrastructure & E-commerce",
    items: [
      "Deploy a high-performance, mobile-first e-commerce platform optimized for swift load times and intuitive user experience.",
      "Integrate secure, diverse payment gateways and flexible shipping logistics.",
      "Establish robust SEO foundations for product discovery, including schema markup and category page optimization.",
    ],
  },
  {
    title: "II. Brand Storytelling & Content Strategy",
    items: [
      "Develop a distinct visual identity with professional product photography and videography, highlighting fabric, fit, and lifestyle.",
      "Implement a strategic content calendar featuring style guides, lookbooks, and behind-the-scenes narratives across all digital touchpoints.",
      "Foster a community through user-generated content initiatives and engaging social media presence.",
    ],
  },
  {
    title: "III. Performance Marketing & Customer Acquisition",
    items: [
      "Execute targeted paid social media campaigns (Instagram, TikTok, Pinterest) leveraging compelling visual creatives and precise audience segmentation.",
      "Design a sophisticated email marketing funnel for abandoned carts, welcome sequences, and exclusive promotions to drive conversion and loyalty.",
      "Explore strategic collaborations with influencers and relevant brand partners to expand reach and credibility.",
    ],
  },
  {
    title: "IV. Data-Driven Optimization & Retention",
    items: [
      "Implement comprehensive analytics (e.g., Google Analytics 4) to monitor key performance indicators (KPIs) such as conversion rates.",
      "Conduct continuous A/B testing on product pages, ad creatives, and call-to-actions to refine effectiveness.",
      "Establish direct customer feedback loops to inform product development and service enhancements.",
    ],
  },
];
