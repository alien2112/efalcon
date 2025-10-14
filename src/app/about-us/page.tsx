'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Users, Award, Globe, TrendingUp, CheckCircle, Star } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Banner } from '@/components/Banner';
import { FadeInOnScroll, ParallaxWrapper } from '@/components/ParallaxWrapper';
import { AchievementCard } from '@/components/ui/animated-counter';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  description: string;
}

interface Achievement {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  {
    id: 'chairman',
    name: 'Mosaed M. Al-Jhail',
    position: 'Chairman of Board & Chief Executive',
    imageUrl: '/vision2.png',
    description: 'Leading Ebdaa Falcon with over 20 years of experience in energy and logistics sectors.'
  },
  {
    id: 'operations-director',
    name: 'Ahmed Al-Rashid',
    position: 'Operations Director',
    imageUrl: '/gallery/oil%20extraction.jpg',
    description: 'Expert in petroleum operations and strategic partnerships across multiple regions.'
  },
  {
    id: 'logistics-manager',
    name: 'Sarah Al-Mansouri',
    position: 'Logistics Manager',
    imageUrl: '/gallery/logistic%20.jpg',
    description: 'Specialized in marine operations and inland transportation networks.'
  }
];

const achievements: Achievement[] = [
  {
    id: 'countries',
    title: 'Countries Served',
    value: '11+',
    description: 'Active presence across multiple continents',
    icon: <Globe className="w-8 h-8 text-[#716106]" />
  },
  {
    id: 'projects',
    title: 'Projects Completed',
    value: '150+',
    description: 'Successful energy and logistics projects',
    icon: <Award className="w-8 h-8 text-[#716106]" />
  },
  {
    id: 'growth',
    title: 'Annual Growth',
    value: '25%',
    description: 'Consistent year-over-year expansion',
    icon: <TrendingUp className="w-8 h-8 text-[#716106]" />
  },
  {
    id: 'satisfaction',
    title: 'Client Satisfaction',
    value: '98%',
    description: 'High satisfaction rate from our clients',
    icon: <Star className="w-8 h-8 text-[#716106]" />
  }
];

const values = [
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'We strive for the highest levels of excellence in all our operations and services.',
    icon: <Star className="w-6 h-6" />
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Embracing innovative solutions to meet evolving industry demands.',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 'integrity',
    title: 'Integrity',
    description: 'Maintaining the highest standards of integrity in all our business practices.',
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    id: 'partnership',
    title: 'Partnership',
    description: 'Building strong, lasting partnerships with clients and stakeholders.',
    icon: <Users className="w-6 h-6" />
  }
];

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [hoveredAchievement, setHoveredAchievement] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsFormSubmitting(false);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation currentSection="about" onNavigate={() => {}} />

      {/* Banner */}
      <div className="pt-[103px]">
        <Banner
          title="About Us"
          subtitle="Ebdaa Falcon is a leading company in international energy and logistics services, committed to delivering excellence through strategic partnerships and innovative solutions across multiple regions."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'About Us' }
          ]}
          backgroundImage="/about us banner .jpg"
        />
      </div>

      {/* Company Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6">
                Our Story
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Founded with a vision to revolutionize energy and logistics services, Ebdaa Falcon has grown into a trusted partner 
                for companies worldwide, delivering innovative solutions and exceptional service quality.
              </p>
            </div>
          </FadeInOnScroll>

          {/* Tabbed Content */}
          <FadeInOnScroll direction="up" delay={0.4}>
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 rounded-lg p-2 flex space-x-2">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'mission', label: 'Mission' },
                  { id: 'vision', label: 'Vision' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-md font-['ADLaM_Display:Regular',_sans-serif] text-[16px] transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      activeTab === tab.id
                        ? 'bg-[#716106] text-white shadow-lg scale-105'
                        : 'text-gray-600 hover:text-[#716106] hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeInOnScroll>

          {/* Tab Content */}
          <ParallaxWrapper speed={0.2} direction="up">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeInOnScroll direction="left" delay={0.6}>
                <div className="space-y-6">
                  {activeTab === 'overview' && (
                    <>
                      <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[28px] md:text-[36px] text-[#716106]">
                        Company Overview
                      </h3>
                      <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                        Ebdaa Falcon is a company that deals with international companies in the field of oil and gas, 
                        petroleum derivatives, sea ports and logistics services. We aim to reach the highest levels of 
                        excellence and superior service that meets your needs.
                      </p>
                      <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                        We are involved in storing, transporting and trading petroleum products. We represent international 
                        companies in the field of oil and gas derivatives, alternative energies and water desalination.
                      </p>
                    </>
                  )}
                  {activeTab === 'mission' && (
                    <>
                      <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[28px] md:text-[36px] text-[#716106]">
                        Our Mission
                      </h3>
                      <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                        To deliver world-class energy and logistics solutions through strategic partnerships, 
                        innovative approaches, and unwavering commitment to excellence.
                      </p>
                      <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                        We strive to be the first company in logistics services, setting industry standards 
                        and creating lasting value for our clients and partners worldwide.
                      </p>
                    </>
                  )}
                  {activeTab === 'vision' && (
                    <>
                      <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[28px] md:text-[36px] text-[#716106]">
                        Our Vision
                      </h3>
                      <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                        To be a global leader in energy and logistics services, recognized for our innovation, 
                        reliability, and commitment to sustainable solutions.
                      </p>
                      <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 leading-relaxed">
                        We envision a future where our expertise drives positive change in the energy sector 
                        while supporting economic growth and environmental sustainability.
                      </p>
                    </>
                  )}
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll direction="right" delay={0.8}>
                <div className="relative">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src="/vision.png"
                      alt="Company Vision"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </FadeInOnScroll>
            </div>
          </ParallaxWrapper>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6">
                Our Achievements
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-3xl mx-auto">
                Numbers that reflect our commitment to excellence and growth in the energy and logistics sectors.
              </p>
            </div>
          </FadeInOnScroll>

          <ParallaxWrapper speed={0.3} direction="up">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <AchievementCard
                icon={<Globe className="w-6 h-6" />}
                value="11+"
                label="Countries Served"
                description="Active presence across multiple continents"
                endNumber={11}
                suffix="+"
                delay={0}
              />
              <AchievementCard
                icon={<Award className="w-6 h-6" />}
                value="150+"
                label="Projects Completed"
                description="Successful energy and logistics projects"
                endNumber={150}
                suffix="+"
                delay={1}
              />
              <AchievementCard
                icon={<TrendingUp className="w-6 h-6" />}
                value="25%"
                label="Annual Growth"
                description="Consistent year-over-year expansion"
                endNumber={25}
                suffix="%"
                delay={2}
              />
              <AchievementCard
                icon={<CheckCircle className="w-6 h-6" />}
                value="98%"
                label="Client Satisfaction"
                description="High satisfaction rate from our clients"
                endNumber={98}
                suffix="%"
                delay={3}
              />
            </div>
          </ParallaxWrapper>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6">
                Our Leadership Team
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-3xl mx-auto">
                Meet the experienced professionals who lead Ebdaa Falcon towards continued success and innovation.
              </p>
            </div>
          </FadeInOnScroll>

          <ParallaxWrapper speed={0.3} direction="up">
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <FadeInOnScroll key={member.id} direction="up" delay={0.1 * index}>
                  <div 
                    className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                      hoveredMember === member.id ? 'scale-105' : ''
                    }`}
                    onMouseEnter={() => setHoveredMember(member.id)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="relative h-64">
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        className={`object-cover transition-transform duration-300 ${
                          hoveredMember === member.id ? 'scale-110' : ''
                        }`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                        hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                    <div className="p-6">
                      <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] text-[#716106] mb-2">
                        {member.name}
                      </h3>
                      <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] text-gray-600 mb-3">
                        {member.position}
                      </p>
                      <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-500 leading-relaxed">
                        {member.description}
                      </p>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </ParallaxWrapper>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[36px] md:text-[48px] text-[#716106] mb-6">
                Our Core Values
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600 max-w-3xl mx-auto">
                The principles that guide our decisions and shape our company culture.
              </p>
            </div>
          </FadeInOnScroll>

          <ParallaxWrapper speed={0.3} direction="up">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <FadeInOnScroll key={value.id} direction="up" delay={0.1 * index}>
                  <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full bg-[#716106]/10 text-[#716106] transition-all duration-300 group-hover:bg-[#716106] group-hover:text-white group-hover:scale-110">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[20px] text-[#716106] mb-4">
                      {value.title}
                    </h3>
                    <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[14px] text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </ParallaxWrapper>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="font-['Alfa_Slab_One:Regular',_sans-serif] text-[32px] md:text-[40px] text-[#716106] mb-6">
                Get to Know Us Better
              </h2>
              <p className="font-['ADLaM_Display:Regular',_sans-serif] text-[16px] md:text-[18px] text-gray-600">
                Ready to work with us? Let&apos;s discuss how we can help achieve your goals.
              </p>
            </div>
          </FadeInOnScroll>

          <ParallaxWrapper speed={0.2} direction="up">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="text-center">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center bg-[#716106] text-white px-8 py-4 rounded-lg hover:bg-[#8B7A0A] transition-all duration-300 transform hover:scale-105 active:scale-95 font-['ADLaM_Display:Regular',_sans-serif] text-[16px] shadow-lg hover:shadow-xl group"
                >
                  Contact Us Today
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </ParallaxWrapper>
        </div>
      </section>
    </div>
  );
}
