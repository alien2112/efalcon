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
    title: 'Engine Oils',
    summary: 'High-quality Saudi-made oils designed to extend engine life and deliver maximum performance.',
    imageUrl: '/images/999718f4c2f82d26b7f5fe8222338d676599195f.png',
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
    imageUrl: '/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.png',
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
    imageUrl: '/images/de677a78167b5a290392b1d450bcb146fab1dd5e.png',
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
    imageUrl: '/images/665db4c10244e78f94bf59a54bb37d716103ac23.png',
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


