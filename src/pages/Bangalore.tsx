import { ParticleBackground } from "@/components/ParticleBackground";
import { DestinationCard } from "@/components/DestinationCard";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star, Zap, TreePine, Cpu, Sparkles } from "lucide-react";
import { bangaloreDestinations } from "@/data/destinations";
import { useEffect, useState } from "react";

const Bangalore = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative pt-16 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-amber-900/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(251,146,60,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_80%,rgba(245,158,11,0.2),transparent_50%)]" />
      
      <ParticleBackground theme="sunset" />
      
      {/* Floating Elements */}
      <div className="absolute top-24 left-20 w-30 h-30 bg-orange-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-48 right-16 w-28 h-28 bg-amber-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-1/3 w-34 h-34 bg-yellow-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative section-padding parallax-container">
        <div className="max-w-7xl mx-auto">
          {/* Glass Hero Panel */}
          <div className={`glass-hero rounded-3xl p-12 md:p-16 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="mb-8">
              <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-md text-white border-white/30 text-lg">
                <Cpu className="w-5 h-5 mr-3" />
                Silicon Valley of India
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-cinematic text-white mb-8 leading-none">
              Bangalore's
              <span className="block text-gradient-cinematic bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_200%]">
                Innovation Oasis
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed font-luxury">
              Experience Bangalore's perfect fusion of cutting-edge innovation and natural tranquility, 
              where technology meets serenity in India's most liveable Garden City.
            </p>

            {/* Floating Stats */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
              {[
                { number: "9+", label: "Urban Sanctuaries", icon: TreePine },
                { number: "20°C", label: "Perfect Climate", icon: Star },
                { number: "1000+", label: "Green Spaces", icon: Zap }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`glass-premium rounded-2xl p-6 hover-glow transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                    <Icon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Meets Nature Section */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className={`glass-premium rounded-3xl p-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-cinematic text-white mb-6 flex items-center justify-center gap-4">
                <Sparkles className="w-10 h-10 text-orange-400" />
                Where Innovation Meets Tranquility
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto font-luxury">
                Discover how Bangalore uniquely balances technological advancement with natural healing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🌡️",
                  title: "Climate Therapy",
                  description: "Year-round pleasant weather that naturally elevates mood and reduces stress levels",
                  gradient: "from-orange-500/20 to-yellow-500/20"
                },
                {
                  icon: "🌳",
                  title: "Urban Forest Healing",
                  description: "Countless parks and green corridors providing oxygen therapy within the bustling city",
                  gradient: "from-green-500/20 to-emerald-500/20"
                },
                {
                  icon: "🚀",
                  title: "Innovation Energy",
                  description: "Dynamic startup ecosystem and tech culture that inspires creativity and personal growth",
                  gradient: "from-blue-500/20 to-purple-500/20"
                }
              ].map((item, index) => (
                <div key={index} className={`glass rounded-2xl p-8 text-center hover-lift transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${600 + index * 150}ms` }}>
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed font-luxury">{item.description}</p>
                  <div className={`mt-6 h-1 w-full bg-gradient-to-r ${item.gradient} rounded-full`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-cinematic text-white mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
              Bangalore's
              <span className="text-gradient-luxury bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"> Tech-Nature Fusion</span>
            </h2>
            <p className={`text-xl text-white/80 max-w-4xl mx-auto font-luxury transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
              From serene botanical gardens to vibrant innovation hubs, Bangalore offers diverse experiences for every emotional need in the modern world.
            </p>
          </div>

          {/* Destinations Grid - Keep Original Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
            {bangaloreDestinations.map((destination, index) => (
              <div key={index} className="animate-scale-in" style={{ animationDelay: `${1400 + index * 100}ms` }}>
                <DestinationCard {...destination} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className={`glass-premium rounded-3xl p-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1600ms' }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-cinematic text-white mb-6">
                Navigate Bangalore's
                <span className="text-gradient-cinematic bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent"> Innovation Map</span>
              </h2>
              <p className="text-xl text-white/80 font-luxury">
                Find parks, tech hubs, cafes, and urban attractions in India's most dynamic Silicon Valley
              </p>
            </div>
            
            <div className="glass rounded-2xl p-2 shadow-luxury">
              <GoogleMapEmbed
                region="Bangalore"
                embedUrl="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d248849.84916296526!2d77.49085452148437!3d12.953945613811665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1756863984310!5m2!1sen!2sin"
                searchBounds={{ lat: 12.9716, lng: 77.5946, radius: 30000 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Living Guide Section */}
      <section className="section-padding-xs relative">
        <div className="max-w-6xl mx-auto">
          <div className={`glass-hero rounded-3xl p-12 bg-gradient-to-br from-orange-600/30 to-amber-600/30 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1800ms' }}>
            <h2 className="text-4xl font-cinematic text-white mb-12 text-center">Bangalore Living Mastery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-orange-400" />
                  Perfect Timing
                </h3>
                <div className="space-y-4">
                  {[
                    { period: "Peak Season", time: "October-February", desc: "Ideal weather for all outdoor activities" },
                    { period: "Pleasant Season", time: "March-May", desc: "Warm but comfortable, fewer tourists" },
                    { period: "Monsoon Magic", time: "June-September", desc: "Lush greenery, romantic weather" }
                  ].map((item, index) => (
                    <div key={index} className="glass rounded-xl p-4 hover-glow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white">{item.period}</span>
                        <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">{item.time}</Badge>
                      </div>
                      <p className="text-white/70 text-sm font-luxury">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-amber-400" />
                  Local Experiences
                </h3>
                <div className="space-y-4">
                  {[
                    { tip: "Sunrise Cycling", desc: "Join weekend groups to Nandi Hills for breathtaking sunrises" },
                    { tip: "Food Street Adventures", desc: "Explore VV Puram's legendary street food culture" },
                    { tip: "Craft Beer Culture", desc: "Experience India's craft beer capital with local breweries" }
                  ].map((item, index) => (
                    <div key={index} className="glass rounded-xl p-4 hover-glow">
                      <div className="font-semibold text-white mb-2">{item.tip}</div>
                      <p className="text-white/70 text-sm font-luxury">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bangalore;