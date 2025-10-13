'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

interface WorkImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  category?: string;
  client?: string;
  year?: string;
}

export default function OurWorkPage() {
  const [workImages, setWorkImages] = useState<WorkImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkImages = async () => {
      try {
        const response = await fetch('/api/admin/work-images');
        const result = await response.json();
        
        if (result.success) {
          const sortedImages = (result.data || []).sort((a: WorkImage, b: WorkImage) => a.order - b.order);
          setWorkImages(sortedImages);
        } else {
          // Fallback to enhanced default projects matching the reference website style
          setWorkImages([
            {
              _id: '1',
              title: "Integrated Global Services",
              description: "Comprehensive petroleum products storage and distribution solutions with advanced monitoring systems",
              imageUrl: "/images/999718f4c2f82d26b7f5fe8222338d676599195f.png",
              order: 1,
              isActive: true,
              category: "Storage Solutions",
              client: "Integrated Global Services",
              year: "2024"
            },
            {
              _id: '2',
              title: "Atlantic Sunshine",
              description: "Marine port operations and logistics services with cutting-edge infrastructure and technology",
              imageUrl: "/images/de677a78167b5a290392b1d450bcb146fab1dd5e.png",
              order: 2,
              isActive: true,
              category: "Marine Logistics",
              client: "Atlantic Sunshine",
              year: "2024"
            },
            {
              _id: '3',
              title: "Heath",
              description: "Reliable inland transportation and distribution networks across multiple regions",
              imageUrl: "/images/665db4c10244e78f94bf59a54bb37d716103ac23.png",
              order: 3,
              isActive: true,
              category: "Transportation",
              client: "Heath",
              year: "2023"
            },
            {
              _id: '4',
              title: "Murex",
              description: "Strategic petroleum products trading and market solutions with global reach",
              imageUrl: "/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.png",
              order: 4,
              isActive: true,
              category: "Trading",
              client: "Murex",
              year: "2024"
            },
            {
              _id: '5',
              title: "Intercontinental Terminals Company",
              description: "Advanced energy infrastructure development and maintenance services",
              imageUrl: "/images/999718f4c2f82d26b7f5fe8222338d676599195f.png",
              order: 5,
              isActive: true,
              category: "Infrastructure",
              client: "Intercontinental Terminals Company",
              year: "2023"
            },
            {
              _id: '6',
              title: "Heath NGD",
              description: "Green energy solutions and sustainable practices implementation",
              imageUrl: "/images/de677a78167b5a290392b1d450bcb146fab1dd5e.png",
              order: 6,
              isActive: true,
              category: "Sustainability",
              client: "Heath NGD",
              year: "2024"
            },
            {
              _id: '7',
              title: "Greenleaf Power",
              description: "Advanced refining processes and quality control systems for petroleum products",
              imageUrl: "/images/665db4c10244e78f94bf59a54bb37d716103ac23.png",
              order: 7,
              isActive: true,
              category: "Refining",
              client: "Greenleaf Power",
              year: "2024"
            },
            {
              _id: '8',
              title: "Gulf Gateway Terminal",
              description: "Comprehensive pipeline monitoring and maintenance across regional networks",
              imageUrl: "/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.png",
              order: 8,
              isActive: true,
              category: "Pipeline Systems",
              client: "Gulf Gateway Terminal",
              year: "2023"
            },
            {
              _id: '9',
              title: "Alpha Oilfield Supply",
              description: "Smart technology integration for optimized energy management and monitoring",
              imageUrl: "/images/999718f4c2f82d26b7f5fe8222338d676599195f.png",
              order: 9,
              isActive: true,
              category: "Digital Solutions",
              client: "Alpha Oilfield Supply",
              year: "2024"
            },
            {
              _id: '10',
              title: "International Materials",
              description: "Advanced materials and equipment solutions for energy sector",
              imageUrl: "/images/de677a78167b5a290392b1d450bcb146fab1dd5e.png",
              order: 10,
              isActive: true,
              category: "Materials",
              client: "International Materials",
              year: "2024"
            },
            {
              _id: '11',
              title: "ALTA Houston",
              description: "Houston-based energy trading and logistics operations",
              imageUrl: "/images/665db4c10244e78f94bf59a54bb37d716103ac23.png",
              order: 11,
              isActive: true,
              category: "Trading",
              client: "ALTA Houston",
              year: "2023"
            },
            {
              _id: '12',
              title: "Norton Corrosion",
              description: "Specialized corrosion protection and maintenance services",
              imageUrl: "/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.png",
              order: 12,
              isActive: true,
              category: "Maintenance",
              client: "Norton Corrosion",
              year: "2024"
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching work images:', error);
        // Fallback to enhanced default projects matching the reference website style
        setWorkImages([
          {
            _id: '1',
            title: "Integrated Global Services",
            description: "Comprehensive petroleum products storage and distribution solutions with advanced monitoring systems",
            imageUrl: "/images/999718f4c2f82d26b7f5fe8222338d676599195f.png",
            order: 1,
            isActive: true,
            category: "Storage Solutions",
            client: "Integrated Global Services",
            year: "2024"
          },
          {
            _id: '2',
            title: "Atlantic Sunshine",
            description: "Marine port operations and logistics services with cutting-edge infrastructure and technology",
            imageUrl: "/images/de677a78167b5a290392b1d450bcb146fab1dd5e.png",
            order: 2,
            isActive: true,
            category: "Marine Logistics",
            client: "Atlantic Sunshine",
            year: "2024"
          },
          {
            _id: '3',
            title: "Heath",
            description: "Reliable inland transportation and distribution networks across multiple regions",
            imageUrl: "/images/665db4c10244e78f94bf59a54bb37d716103ac23.png",
            order: 3,
            isActive: true,
            category: "Transportation",
            client: "Heath",
            year: "2023"
          },
          {
            _id: '4',
            title: "Murex",
            description: "Strategic petroleum products trading and market solutions with global reach",
            imageUrl: "/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.png",
            order: 4,
            isActive: true,
            category: "Trading",
            client: "Murex",
            year: "2024"
          },
          {
            _id: '5',
            title: "Intercontinental Terminals Company",
            description: "Advanced energy infrastructure development and maintenance services",
            imageUrl: "/images/999718f4c2f82d26b7f5fe8222338d676599195f.png",
            order: 5,
            isActive: true,
            category: "Infrastructure",
            client: "Intercontinental Terminals Company",
            year: "2023"
          },
          {
            _id: '6',
            title: "Heath NGD",
            description: "Green energy solutions and sustainable practices implementation",
            imageUrl: "/images/de677a78167b5a290392b1d450bcb146fab1dd5e.png",
            order: 6,
            isActive: true,
            category: "Sustainability",
            client: "Heath NGD",
            year: "2024"
          },
          {
            _id: '7',
            title: "Greenleaf Power",
            description: "Advanced refining processes and quality control systems for petroleum products",
            imageUrl: "/images/665db4c10244e78f94bf59a54bb37d716103ac23.png",
            order: 7,
            isActive: true,
            category: "Refining",
            client: "Greenleaf Power",
            year: "2024"
          },
          {
            _id: '8',
            title: "Gulf Gateway Terminal",
            description: "Comprehensive pipeline monitoring and maintenance across regional networks",
            imageUrl: "/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.png",
            order: 8,
            isActive: true,
            category: "Pipeline Systems",
            client: "Gulf Gateway Terminal",
            year: "2023"
          },
          {
            _id: '9',
            title: "Alpha Oilfield Supply",
            description: "Smart technology integration for optimized energy management and monitoring",
            imageUrl: "/images/999718f4c2f82d26b7f5fe8222338d676599195f.png",
            order: 9,
            isActive: true,
            category: "Digital Solutions",
            client: "Alpha Oilfield Supply",
            year: "2024"
          },
          {
            _id: '10',
            title: "International Materials",
            description: "Advanced materials and equipment solutions for energy sector",
            imageUrl: "/images/de677a78167b5a290392b1d450bcb146fab1dd5e.png",
            order: 10,
            isActive: true,
            category: "Materials",
            client: "International Materials",
            year: "2024"
          },
          {
            _id: '11',
            title: "ALTA Houston",
            description: "Houston-based energy trading and logistics operations",
            imageUrl: "/images/665db4c10244e78f94bf59a54bb37d716103ac23.png",
            order: 11,
            isActive: true,
            category: "Trading",
            client: "ALTA Houston",
            year: "2023"
          },
          {
            _id: '12',
            title: "Norton Corrosion",
            description: "Specialized corrosion protection and maintenance services",
            imageUrl: "/images/5992bbb553331fc55d07d245c68d3a2d7b8fea26.png",
            order: 12,
            isActive: true,
            category: "Maintenance",
            client: "Norton Corrosion",
            year: "2024"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkImages();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentSection="work" onNavigate={() => {}} />

      {/* Hero Section */}
      <div className="pt-[103px] pb-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[48px] md:text-[72px] leading-[1.2] text-[#716106] mb-6">
            ENERGY INDUSTRY WEBSITE DESIGN PORTFOLIO
          </h1>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[18px] md:text-[24px] text-gray-600 max-w-4xl mx-auto">
            Explore our energy industry website design portfolio featuring work from top oil and gas, industrial, renewable energy and power companies.
          </p>
        </div>
      </div>

      {/* Portfolio Grid - Matching Reference Website Style */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg h-[300px] animate-pulse shadow-sm" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {workImages.map((project, index) => (
                <div
                  key={project._id}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredItem(project._id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Image Container */}
                  <div className="relative h-[250px] overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className={`object-cover transition-all duration-500 ${
                        hoveredItem === project._id 
                          ? 'scale-105' 
                          : 'scale-100'
                      }`}
                    />
                    
                    {/* Dark Overlay on Hover */}
                    <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                      hoveredItem === project._id ? 'opacity-40' : 'opacity-0'
                    }`} />
                    
                    {/* Company Name Overlay - Matching Reference Style */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                      hoveredItem === project._id 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-2'
                    }`}>
                      <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] md:text-[24px] text-white text-center px-4 leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content Area - Clean and Minimal */}
                  <div className="p-4 bg-white">
                    <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-800 mb-2 group-hover:text-[#716106] transition-colors duration-300 text-center">
                      {project.title}
                    </h3>
                    <div className="text-center">
                      <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Subtle Border Effect on Hover */}
                  <div className={`absolute inset-0 border-2 border-[#716106] rounded-lg transition-opacity duration-300 pointer-events-none ${
                    hoveredItem === project._id ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6">
            You take care of your business. We take care of your website.
          </h2>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[18px] text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to elevate your energy industry presence with a professional website?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="inline-block bg-[#716106] text-white px-8 py-4 rounded-full font-['ADLaM_Display:Regular',_sans-serif] text-[16px] hover:bg-[#5a4f05] transition-colors duration-300"
            >
              Get a Free Quote
            </Link>
            <div className="text-[#716106] font-['ADLaM_Display:Regular',_sans-serif] text-[16px]">
              888.424.6363
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#716106] py-8 md:py-12 text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="mb-6">
            <Image 
              src="/images/95eb61c3ac3249a169d62775cfc3315b24c65966.png"
              alt="Ebdaa Falcon Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] md:text-[16px] mb-4">
            Copyright @ 2025 | About Ebdaa Falcon
          </p>
          <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[12px] md:text-[14px] text-white/70">
            Excellence in Energy, Logistics & Sustainability
          </p>
        </div>
      </footer>
    </div>
  );
}
