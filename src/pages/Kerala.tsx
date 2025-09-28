import { ParticleBackground } from "@/components/ParticleBackground";
import { DestinationCard } from "@/components/DestinationCard";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Star, Waves, Leaf, Heart, Sparkles } from "lucide-react";
import { keralaDestinations } from "@/data/destinations";
import { useEffect, useState } from "react";

const Kerala = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative pt-16 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-teal-900/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.2),transparent_50%)]" />
      
      <ParticleBackground theme="ocean" />
      
      {/* Floating Elements */}
      <div className="absolute top-32 right-16 w-28 h-28 bg-teal-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-60 left-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-32 right-1/3 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative section-padding parallax-container">
        <div className="max-w-7xl mx-auto">
          {/* Glass Hero Panel */}
          <div className={`glass-hero rounded-3xl p-12 md:p-16 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="mb-8">
              <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-md text-white border-white/30 text-lg">
                <Waves className="w-5 h-5 mr-3" />
                God's Own Country
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-cinematic text-white mb-8 leading-none">
              Kerala's
              <span className="block text-gradient-luxury bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_200%]">
                Aquatic Symphony
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed font-luxury">
              Immerse yourself in Kerala's harmonious blend of backwaters, spice-scented hills, pristine beaches, 
              and ancient Ayurvedic wisdom - where nature becomes your healer.
            </p>

            {/* Floating Stats */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
              {[
                { number: "10+", label: "Healing Destinations", icon: Heart },
                { number: "44", label: "Rivers & Backwaters", icon: Waves },
                { number: "5000+", label: "Years Ayurveda", icon: Leaf }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`glass-premium rounded-2xl p-6 hover-glow transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                    <Icon className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Healing Powers Section */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className={`glass-premium rounded-3xl p-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-cinematic text-white mb-6 flex items-center justify-center gap-4">
                <Sparkles className="w-10 h-10 text-emerald-400" />
                Kerala's Natural Therapy
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto font-luxury">
                Discover how Kerala's natural elements work together to heal mind, body, and soul
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🌿",
                  title: "Ayurvedic Healing",
                  description: "Experience authentic treatments and holistic wellness practices passed down through generations",
                  gradient: "from-emerald-500/20 to-green-500/20"
                },
                {
                  icon: "🛶",
                  title: "Backwater Meditation",
                  description: "Find inner peace cruising through serene waterways on traditional houseboats",
                  gradient: "from-teal-500/20 to-cyan-500/20"
                },
                {
                  icon: "🏔️",
                  title: "Mountain Rejuvenation",
                  description: "Breathe pure air in misty mountains surrounded by spice gardens and tea plantations",
                  gradient: "from-blue-500/20 to-emerald-500/20"
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
              Kerala's
              <span className="text-gradient-cinematic bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Emotional Sanctuaries</span>
            </h2>
            <p className={`text-xl text-white/80 max-w-4xl mx-auto font-luxury transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
              Each corner of Kerala offers unique emotional experiences - from peaceful backwaters to adventurous wildlife encounters that reconnect you with nature's rhythm.
            </p>
          </div>

          {/* Destinations Grid - Keep Original Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
            {keralaDestinations.map((destination, index) => (
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
                Navigate Kerala's
                <span className="text-gradient-luxury bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Waterways</span>
              </h2>
              <p className="text-xl text-white/80 font-luxury">
                Discover backwaters, hill stations, beaches, and Ayurvedic centers across God's Own Country
              </p>
            </div>
            
            <div className="glass rounded-2xl p-2 shadow-luxury">
              <GoogleMapEmbed
                region="Kerala"
                embedUrl="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2003236.5359239418!2d75.5!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1756863984310!5m2!1sen!2sin"
                searchBounds={{ lat: 10.8505, lng: 76.2711, radius: 40000 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Guide Section */}
      <section className="section-padding-xs relative">
        <div className="max-w-6xl mx-auto">
          <div className={`glass-hero rounded-3xl p-12 bg-gradient-to-br from-emerald-600/30 to-teal-600/30 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1800ms' }}>
            <h2 className="text-4xl font-cinematic text-white mb-12 text-center">Kerala Wellness Mastery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-emerald-400" />
                  Monsoon Magic
                </h3>
                <div className="space-y-4">
                  {[
                    { period: "Monsoon Season", time: "June-September", desc: "Peak Ayurveda time, lush landscapes" },
                    { period: "Tourist Season", time: "October-March", desc: "Perfect weather, outdoor activities" },
                    { period: "Summer Escape", time: "April-May", desc: "Hill stations, fewer crowds, better prices" }
                  ].map((item, index) => (
                    <div key={index} className="glass rounded-xl p-4 hover-glow">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white">{item.period}</span>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">{item.time}</Badge>
                      </div>
                      <p className="text-white/70 text-sm font-luxury">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-teal-400" />
                  Cultural Immersion
                </h3>
                <div className="space-y-4">
                  {[
                    { tip: "Kathakali Evenings", desc: "Traditional dance performances tell ancient stories" },
                    { tip: "Spice Route Heritage", desc: "Visit spice gardens and learn ancient trading secrets" },
                    { tip: "Houseboat Traditions", desc: "Experience life on water with local boat families" }
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

export default Kerala;