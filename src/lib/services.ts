export interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  features: string[];
  content: string;
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
      'We provide premium-grade engine oils engineered to protect engines under extreme conditions. Our formulations deliver superior wear protection, thermal stability, and cleanliness for long-lasting performance across passenger cars, commercial fleets, and industrial applications.'
  },
  {
    slug: 'oil-gas-solutions',
    title: 'Oil & Gas Solutions',
    summary: 'Integrated solutions in storage, transportation, and trading of petroleum derivatives.',
    imageUrl: '/gallery/oil%20extraction.jpg',
    features: [
      'Bulk storage facilities',
      'Import/export operations',
      'Blending and distribution',
      'Trading and risk management'
    ],
    content:
      'From storage terminals to international trading operations, we deliver end-to-end solutions that ensure product integrity, supply reliability, and operational efficiency across the energy value chain.'
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
      'We operate across marine and inland logistics to deliver reliability at scale. Our capabilities span port operations, documentation, inland transportation, and worldwide freight coordination.'
  },
  {
    slug: 'renewable-energy-desalination',
    title: 'Renewable Energy & Water Desalination',
    summary: 'Sustainable solar and wind energy solutions alongside advanced water desalination systems.',
    imageUrl: '/gallery/solar%20panels.jpg',
    features: [
      'Solar and wind integrations',
      'Hybrid energy systems',
      'Reverse osmosis desalination',
      'Sustainable infrastructure design'
    ],
    content:
      'We invest in sustainable energy projects and water technologies that secure resources for the future. Our solutions balance performance, cost, and environmental impact.'
  }
];


