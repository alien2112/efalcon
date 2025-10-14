export interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  features: string[];
  content: string;
  detailedContent: string;
  galleryImages: string[];
  benefits: string[];
}

export const services: ServiceItem[] = [
  {
    slug: 'engine-oils',
    title: 'Motor Oils',
    summary: 'High-quality Saudi-made motor oils engineered for durability and peak performance.',
    imageUrl: '/gallery/engine%20oil1.jpg',
    features: [
      'Synthetic and mineral formulations',
      'Extended engine protection',
      'High-temperature stability',
      'Fuel efficiency optimization'
    ],
    content:
      'We provide premium-grade engine oils engineered to protect engines under extreme conditions. Our formulations deliver superior wear protection, thermal stability, and cleanliness for long-lasting performance across passenger cars, commercial fleets, and industrial applications.',
    detailedContent: 'Our Falcon Motor Oils represent the pinnacle of lubrication technology, specifically formulated for the demanding conditions of Saudi Arabia and the broader Middle East region. These fully synthetic oils are engineered to keep engines running like new, with specific formulations for both gasoline and diesel engines. Our advanced additive packages provide superior protection against wear, corrosion, and thermal breakdown, ensuring optimal performance even in extreme temperatures.',
    galleryImages: [
      '/gallery/engine%20oil1.jpg',
      '/gallery/engine%20oil%20details.jpg',
      '/gallery/engine%20oil%201%20detial.jpg',
      '/gallery/product-img-1.jpg',
      '/gallery/product-img-2.jpg',
      '/gallery/product-img-3.jpg'
    ],
    benefits: [
      'Extended oil change intervals',
      'Superior engine protection',
      'Improved fuel economy',
      'Reduced maintenance costs',
      'Enhanced engine performance',
      'Compatible with all engine types'
    ]
  },
  {
    slug: 'oil-gas-solutions',
    title: 'Oil & Gas Solutions',
    summary: 'Comprehensive petroleum storage, trading, and logistics solutions with advanced safety systems and strategic partnerships.',
    imageUrl: '/gallery/oil%20extraction.jpg',
    features: [
      'Bulk storage facilities',
      'Import/export operations',
      'Blending and distribution',
      'Trading and risk management'
    ],
    content:
      'Our oil and gas solutions provide comprehensive petroleum storage, trading, and logistics services with advanced safety systems, strategic partnerships, and cutting-edge technology to ensure optimal performance and reliability.',
    detailedContent: 'We offer state-of-the-art petroleum storage facilities, automated trading systems, comprehensive logistics networks, and strategic partnerships across multiple regions. Our solutions include advanced safety monitoring, real-time market analysis, and integrated supply chain management.',
    galleryImages: [
      '/gallery/oil%20extraction.jpg',
      '/gallery/logistic%20.jpg',
      '/gallery/product-img-4.jpg',
      '/gallery/product-img-5.jpg',
      '/gallery/product-img-6.jpg',
      '/gallery/product-img-7.jpg'
    ],
    benefits: [
      'Enhanced Storage Capacity',
      'Improved Safety Standards',
      'Reduced Operational Costs',
      'Strategic Market Access',
      'Advanced Risk Management',
      'Comprehensive Logistics Network'
    ]
  },
  {
    slug: 'logistics-marine-services',
    title: 'Logistics & Marine Services',
    summary: 'World-class logistics across marine ports and inland operations to keep supply chains moving.',
    imageUrl: '/gallery/logistic%20.jpg',
    features: [
      'Port handling and stevedoring',
      'Customs and documentation',
      'Inland transport and distribution',
      'Global freight coordination'
    ],
    content:
      'We operate across marine and inland logistics to deliver reliability at scale. Our capabilities span port operations, documentation, inland transportation, and worldwide freight coordination.',
    detailedContent: 'Our logistics and marine services provide comprehensive solutions for complex supply chain requirements. We handle everything from port operations and customs clearance to inland transportation and global freight coordination. Our experienced team ensures seamless operations across marine ports and inland facilities, maintaining the highest standards of efficiency and reliability.',
    galleryImages: [
      '/gallery/logistic%20.jpg',
      '/gallery/electric.jpg',
      '/gallery/product-2-img-1.jpg',
      '/gallery/product-2-img-2.jpg',
      '/gallery/product-2-img-3.jpg'
    ],
    benefits: [
      'Expert port operations',
      'Customs clearance services',
      'Inland transportation network',
      'Global freight coordination',
      'Documentation management',
      'Supply chain optimization'
    ]
  },
  {
    slug: 'renewable-energy-desalination',
    title: 'Alternative Energy & Water Desalination',
    summary: 'Sustainable solar and wind energy solutions alongside advanced water desalination systems.',
    imageUrl: '/gallery/solar%20panels.jpg',
    features: [
      'Solar and wind integrations',
      'Hybrid energy systems',
      'Reverse osmosis desalination',
      'Sustainable infrastructure design'
    ],
    content:
      'We invest in sustainable energy projects and water technologies that secure resources for the future. Our solutions balance performance, cost, and environmental impact.',
    detailedContent: 'Our alternative energy solutions focus on renewable resources that are less harmful to the environment and more cost-effective than fossil fuels. We specialize in solar energy technology using photovoltaic cells and semi-conductive materials to generate electrical energy. Our wind energy systems convert kinetic energy into mechanical and electrical power. Additionally, our water desalination processes convert salt water into pure fresh water suitable for drinking and daily use, utilizing advanced filtration systems to remove salts and minerals.',
    galleryImages: [
      '/gallery/solar%20panels.jpg',
      '/gallery/solar%20energy.jpg',
      '/gallery/wind%20genrators.jpg',
      '/gallery/waterpurification.jpg',
      '/gallery/water%20purification1.jpg',
      '/gallery/product-3-img-1.jpg',
      '/gallery/product-3-img-2.jpg',
      '/gallery/product-3-img-3.jpg',
      '/gallery/product-4-img-1.jpg',
      '/gallery/product-4-img-2.jpg',
      '/gallery/product-4-img-3.jpg',
      '/gallery/product-5-img-1.jpg',
      '/gallery/product-5-img-2.jpg',
      '/gallery/product-5-img-3.jpg',
      '/gallery/product-6-img-1.jpg',
      '/gallery/product-6-img-2.jpg',
      '/gallery/product-6-img-3.jpg'
    ],
    benefits: [
      'Environmentally friendly solutions',
      'Cost-effective renewable energy',
      'Advanced solar technology',
      'Efficient wind energy systems',
      'Pure water desalination',
      'Sustainable infrastructure'
    ]
  }
];


