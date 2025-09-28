import { ParticleBackground } from "@/components/ParticleBackground";
import { DestinationCard } from "@/components/DestinationCard";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star, Users, Globe, Award, Sparkles } from "lucide-react";
import { tamilNaduDestinations } from "@/data/destinations";
import { useEffect, useState } from "react";

const TamilNadu = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative pt-16 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.2),transparent_50%)]" />
      
      <ParticleBackground theme="forest" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative section-padding parallax-container">
        <div className="max-w-7xl mx-auto">
          {/* Glass Hero Panel */}
          <div className={`glass-hero rounded-3xl p-12 md:p-16 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="mb-8">
              <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md text-white border-white/30 text-lg">
                <MapPin className="w-5 h-5 mr-3" />
                Tamil Nadu Heritage
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-cinematic text-white mb-8 leading-none">
              Tamil Nadu's
              <span className="block text-gradient-premium bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_200%]">
                Timeless Majesty
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed font-luxury">
              Journey through ancient temples, misty hill stations, and vibrant cultural heritage where 
              every stone tells a story and every landscape heals the soul.
            </p>

            {/* Floating Stats */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
              {[
                { number: "9+", label: "Sacred Destinations", icon: Award },
                { number: "2000+", label: "Years of Heritage", icon: Globe },
                { number: "100%", label: "Cultural Immersion", icon: Star }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`glass-premium rounded-2xl p-6 hover-glow transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                    <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Essence Section */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className={`glass-premium rounded-3xl p-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-cinematic text-white mb-6 flex items-center justify-center gap-4">
                <Sparkles className="w-10 h-10 text-purple-400" />
                Tamil Nadu's Cultural DNA
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto font-luxury">
                Discover the essence that makes Tamil Nadu a spiritual and cultural powerhouse
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏛️",
                  title: "Dravidian Architecture",
                  description: "Marvel at towering gopurams and intricate stone carvings that have stood for millennia",
                  gradient: "from-purple-500/20 to-blue-500/20"
                },
                {
                  icon: "🎭",
                  title: "Classical Arts Heritage",
                  description: "Experience Bharatanatyam, Carnatic music, and traditional performances in their birthplace",
                  gradient: "from-pink-500/20 to-purple-500/20"
                },
                {
                  icon: "🌿",
                  title: "Diverse Landscapes",
                  description: "From misty hill stations to pristine beaches, nature's therapy for every emotion",
                  gradient: "from-green-500/20 to-blue-500/20"
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
              Sacred
              <span className="text-gradient-luxury bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Emotional Journeys</span>
            </h2>
            <p className={`text-xl text-white/80 max-w-4xl mx-auto font-luxury transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
              Each destination in Tamil Nadu offers a unique emotional experience, from peaceful hill retreats to spiritually enriching temple towns that awaken your inner self.
            </p>
          </div>

          {/* Destinations Grid - Keep Original Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
            {tamilNaduDestinations.map((destination, index) => (
              <div key={index}>
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
                Explore Tamil Nadu
                <span className="text-gradient-cinematic bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"> on Map</span>
              </h2>
              <p className="text-xl text-white/80 font-luxury">
                Navigate through temples, hill stations, beaches, and cultural sites across the land of ancient wisdom
              </p>
            </div>
            
            <div className="glass rounded-2xl p-2 shadow-luxury">
              <GoogleMapEmbed
                region="Tamil Nadu"
                embedUrl="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d72624.2633302847!2d79.82120989246204!3d11.936286365839566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1756863984310!5m2!1sen!2sin"
                searchBounds={{ lat: 11.1271, lng: 78.6569, radius: 50000 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Travel Insights Section */}
      <section className="section-padding-xs relative">
        <div className="max-w-6xl mx-auto">
          <div className={`glass-hero rounded-3xl p-12 bg-gradient-to-br from-purple-600/30 to-blue-600/30 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1800ms' }}>
            <h2 className="text-4xl font-cinematic text-white mb-12 text-center">Tamil Nadu Travel Mastery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-purple-400" />
                  Perfect Timing
                </h3>
                <div className="space-y-4">
                  {[
                    { period: "Hill Stations", time: "April-June", desc: "Cool mountain air, perfect for meditation" },
                    { period: "Coastal Areas", time: "November-March", desc: "Golden beaches, gentle waves" },
                    { period: "Temple Towns", time: "October-February", desc: "Comfortable spiritual exploration" }
                  ].map((item, index) => (
                    <div key={index} className="glass rounded-xl p-4 hover-glow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white">{item.period}</span>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">{item.time}</Badge>
                      </div>
                      <p className="text-white/70 text-sm font-luxury">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-blue-400" />
                  Cultural Wisdom
                </h3>
                <div className="space-y-4">
                  {[
                    { tip: "Temple Etiquette", desc: "Remove shoes, dress modestly, photography rules vary" },
                    { tip: "Local Connection", desc: "Learn basic Tamil greetings for authentic interactions" },
                    { tip: "Spiritual Timing", desc: "Early morning temple visits offer peaceful experiences" }
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

export default TamilNadu;