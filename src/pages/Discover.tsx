import { ParticleBackground } from "@/components/ParticleBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, Compass, Globe, ArrowRight, Users, Calendar, Star, Sparkles, Brain, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const emotionalJourneys = [
  {
    emotion: "Stressed & Overwhelmed",
    icon: "😰",
    color: "from-blue-500/20 to-cyan-500/20",
    recommendations: ["Kerala Backwaters", "Ooty Tea Gardens", "Bangalore Parks"],
    description: "Find peace in nature's embrace",
    gradient: "bg-gradient-to-br from-blue-600/30 to-cyan-600/30"
  },
  {
    emotion: "Adventurous & Excited",
    icon: "🚀",
    color: "from-orange-500/20 to-red-500/20", 
    recommendations: ["Nandi Hills Cycling", "Thekkady Wildlife", "Mahabalipuram Exploration"],
    description: "Channel your energy into exploration",
    gradient: "bg-gradient-to-br from-orange-600/30 to-red-600/30"
  },
  {
    emotion: "Reflective & Contemplative",
    icon: "🧘",
    color: "from-purple-500/20 to-indigo-500/20",
    recommendations: ["Thanjavur Temples", "Kanyakumari Sunsets", "Lalbagh Gardens"],
    description: "Spaces for deep introspection",
    gradient: "bg-gradient-to-br from-purple-600/30 to-indigo-600/30"
  },
  {
    emotion: "Joyful & Celebratory",
    icon: "🎉",
    color: "from-yellow-500/20 to-pink-500/20",
    recommendations: ["Kochi Cultural Shows", "Bangalore Film City", "Varkala Beach"],
    description: "Amplify your happiness",
    gradient: "bg-gradient-to-br from-yellow-600/30 to-pink-600/30"
  }
];

const travelStats = [
  { number: "15K+", label: "Happy Travelers", icon: Users, color: "text-blue-400" },
  { number: "50+", label: "Destinations", icon: MapPin, color: "text-emerald-400" },
  { number: "98%", label: "Satisfaction", icon: Star, color: "text-yellow-400" },
  { number: "365", label: "Days Support", icon: Calendar, color: "text-purple-400" }
];

const Discover = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative pt-16 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.2),transparent_50%)]" />
      
      <ParticleBackground theme="minimal" />
      
      {/* Floating Elements */}
      <div className="absolute top-32 right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute top-60 left-16 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Hero Section with Glassmorphism */}
      <section className="relative section-padding parallax-container">
        <div className="max-w-7xl mx-auto">
          {/* Glass Hero Panel */}
          <div className={`glass-hero rounded-3xl p-12 md:p-16 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="mb-8">
              <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md text-white border-white/30 text-lg">
                <Compass className="w-5 h-5 mr-3" />
                Discover Your Journey
              </Badge>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-cinematic text-white mb-8 leading-none">
              Your Emotions,
              <span className="block text-gradient-premium bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_200%]">
                Your Adventure
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed font-luxury">
              Every emotion tells a story, and every story deserves the perfect destination. 
              Discover how our AI transforms your feelings into extraordinary travel experiences.
            </p>

            <Link to="/">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-6 text-xl font-semibold rounded-2xl hover:shadow-glow-purple transition-all duration-500 group hover:scale-105">
                Start Your Emotional Journey
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Emotional Journey Mapping */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-cinematic text-white mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              How We Match Your
              <span className="text-gradient-cinematic bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent"> Emotions</span>
            </h2>
            <p className={`text-xl text-white/80 max-w-4xl mx-auto font-luxury transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              Our advanced AI analyzes your emotional state and cultural preferences to create personalized travel experiences that heal and inspire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {emotionalJourneys.map((journey, index) => (
              <div key={index} className={`glass-premium rounded-2xl p-8 hover-lift group transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${800 + index * 150}ms` }}>
                <div className="text-center">
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{journey.icon}</div>
                  <Badge className={`mb-6 px-4 py-2 bg-gradient-to-r ${journey.color} backdrop-blur-md text-white border-white/20`}>
                    {journey.emotion}
                  </Badge>
                  <p className="text-white/80 mb-6 font-luxury text-lg">
                    {journey.description}
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-white">Perfect Destinations:</p>
                    {journey.recommendations.map((rec, idx) => (
                      <div key={idx} className="glass rounded-full px-4 py-2 text-sm text-white/80 hover:text-white transition-colors">
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-cinematic text-white mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
              Your Journey in
              <span className="text-gradient-luxury bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> 3 Cinematic Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Share Your Feelings",
                description: "Tell us how you're feeling and what kind of experience you're seeking through our intuitive emotion selector.",
                icon: Heart,
                gradient: "from-pink-600/30 to-rose-600/30",
                iconColor: "text-pink-400"
              },
              {
                step: "2", 
                title: "Get AI Recommendations",
                description: "Our advanced AI analyzes your emotions and suggests destinations that perfectly match your current state of mind.",
                icon: Brain,
                gradient: "from-blue-600/30 to-indigo-600/30",
                iconColor: "text-blue-400"
              },
              {
                step: "3",
                title: "Explore & Transform",
                description: "Embark on your personalized journey with cultural insights, safety information, and emotional support throughout.",
                icon: Globe,
                gradient: "from-emerald-600/30 to-teal-600/30",
                iconColor: "text-emerald-400"
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${1200 + index * 200}ms` }}>
                  <div className={`glass-hero rounded-3xl p-12 bg-gradient-to-br ${step.gradient} hover-lift group`}>
                    {/* Step Number */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-luxury">
                        <span className="text-xl font-bold text-white">{step.step}</span>
                      </div>
                    </div>
                    
                    <div className={`w-20 h-20 glass-premium rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className={`w-10 h-10 ${step.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6">{step.title}</h3>
                    <p className="text-white/80 leading-relaxed font-luxury">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className={`glass-hero rounded-3xl p-16 text-center bg-gradient-to-br from-indigo-600/30 to-purple-600/30 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
            <h2 className="text-4xl md:text-5xl font-cinematic text-white mb-16">Trusted by Thousands of Emotional Travelers</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {travelStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`glass-premium rounded-2xl p-8 hover-glow group transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${1600 + index * 100}ms` }}>
                    <Icon className={`w-10 h-10 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div className="text-4xl font-bold text-white mb-3">{stat.number}</div>
                    <div className="text-white/80 font-luxury">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Regional Spotlights */}
      <section className="section-padding-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl font-cinematic text-white mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1800ms' }}>
              Explore Our
              <span className="text-gradient-luxury bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"> Featured Regions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                emoji: "🏛️",
                title: "Tamil Nadu",
                description: "Ancient temples, hill stations, and cultural heritage that speaks to your soul through millennia of wisdom",
                link: "/tamil-nadu",
                gradient: "from-purple-600/30 to-indigo-600/30",
                buttonGradient: "from-purple-600 to-indigo-600"
              },
              {
                emoji: "🛶",
                title: "Kerala", 
                description: "Backwaters, Ayurveda, and natural beauty for complete emotional healing and spiritual awakening",
                link: "/kerala",
                gradient: "from-emerald-600/30 to-teal-600/30",
                buttonGradient: "from-emerald-600 to-teal-600"
              },
              {
                emoji: "🌳",
                title: "Bangalore",
                description: "Perfect climate, innovation energy, and urban wellness for modern stress relief and inspiration",
                link: "/bangalore", 
                gradient: "from-orange-600/30 to-amber-600/30",
                buttonGradient: "from-orange-600 to-amber-600"
              }
            ].map((region, index) => (
              <div key={index} className={`glass-hero rounded-3xl overflow-hidden hover-lift group transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${2000 + index * 200}ms` }}>
                <div className={`p-12 text-center bg-gradient-to-br ${region.gradient}`}>
                  <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500">{region.emoji}</div>
                  <h3 className="text-3xl font-cinematic text-white mb-6">{region.title}</h3>
                  <p className="text-white/80 mb-8 leading-relaxed font-luxury text-lg">
                    {region.description}
                  </p>
                  <Link to={region.link}>
                    <Button className={`bg-gradient-to-r ${region.buttonGradient} text-white px-8 py-4 text-lg font-semibold rounded-xl hover:shadow-luxury transition-all duration-500 group-hover:scale-105`}>
                      Explore {region.title}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Discover;