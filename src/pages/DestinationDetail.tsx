import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Users, Shield, BedDouble, Camera, Utensils, Activity, Navigation, Lightbulb, CheckCircle, Circle, ArrowRight, Star, Calendar, DollarSign, Info, Sparkles, TrendingUp, Map, Thermometer, MessageCircle, CreditCard, Timer } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { bangaloreDestinations, keralaDestinations, tamilNaduDestinations, type Destination } from "@/data/destinations";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const allDestinations: Destination[] = [
  ...tamilNaduDestinations,
  ...keralaDestinations,
  ...bangaloreDestinations,
];

const DestinationDetail = () => {
  const { country = "", name = "" } = useParams();
  const decodedCountry = decodeURIComponent(country);
  const decodedName = decodeURIComponent(name);
  const location = useLocation() as { state?: { destination?: Destination } };
  const navigate = useNavigate();
  const { addPlan, selectedPlans, updatePlanStatus } = usePlans();
  const { toast } = useToast();

  const destination = useMemo(() => {
    return (
      location.state?.destination ||
      allDestinations.find(
        (d) => d.name === decodedName && d.country === decodedCountry
      )
    );
  }, [location.state, decodedName, decodedCountry]);

  const currentPlan = selectedPlans.find(
    (p) => p.name === destination?.name && p.region === destination?.country
  );

  // Scroll to top when component mounts or destination changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Also scroll to top after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
    
    return () => clearTimeout(timer);
  }, [destination]);

  useEffect(() => {
    if (destination) {
      const pageTitle = `${destination.name} - ${destination.country} | Destination Details`;
      document.title = pageTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      const description = `${destination.name} in ${destination.country}: ${destination.description}`.slice(0, 155);
      if (metaDesc) metaDesc.setAttribute("content", description);

      // canonical
      const canonicalHref = `${window.location.origin}/destination/${encodeURIComponent(
        destination.country
      )}/${encodeURIComponent(destination.name)}`;
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalHref);
    }
  }, [destination]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background relative pt-16 flex items-center justify-center">
        <ParticleBackground theme="minimal" />
        <p className="text-muted-foreground">Destination not found.</p>
      </div>
    );
  }

  const isSelected = selectedPlans.some(
    (p) => p.name === destination.name && p.region === destination.country
  );

  const rentText = useMemo(() => {
    switch (destination.priceRange) {
      case '$':
        return 'Budget (~₹1,000–₹2,500/night)';
      case '$$':
        return 'Mid-range (~₹2,500–₹6,000/night)';
      case '$$$':
        return 'Premium (₹6,000+/night)';
      default:
        return 'Varies';
    }
  }, [destination.priceRange]);

  const travelSteps = [
    { 
      id: 'research', 
      title: 'Research & Planning', 
      description: 'Gather information about the destination, weather, and local customs',
      icon: Map,
      tips: ['Check weather forecasts', 'Learn basic local phrases', 'Research cultural etiquette']
    },
    { 
      id: 'booking', 
      title: 'Accommodation & Transport', 
      description: 'Book hotels, flights, and local transportation',
      icon: Calendar,
      tips: ['Compare prices across platforms', 'Book refundable options', 'Save confirmation emails']
    },
    { 
      id: 'preparation', 
      title: 'Travel Preparation', 
      description: 'Pack essentials, check documents, and prepare for the journey',
      icon: Sparkles,
      tips: ['Create packing checklist', 'Check passport validity', 'Get travel insurance']
    },
    { 
      id: 'arrival', 
      title: 'Arrival & Check-in', 
      description: 'Reach destination, check into accommodation, and get oriented',
      icon: MapPin,
      tips: ['Keep hotel address handy', 'Exchange currency', 'Get local SIM/WiFi']
    },
    { 
      id: 'exploration', 
      title: 'Explore & Experience', 
      description: 'Visit attractions, try local cuisine, and immerse in culture',
      icon: Camera,
      tips: ['Start early to avoid crowds', 'Try street food', 'Interact with locals']
    },
    { 
      id: 'completion', 
      title: 'Journey Complete', 
      description: 'Reflect on experiences and share memories',
      icon: Star,
      tips: ['Write travel journal', 'Share photos with friends', 'Leave reviews']
    }
  ];

  const getStepProgress = () => {
    if (!currentPlan) return 0;
    if (currentPlan.status === 'selected') return 0;
    if (currentPlan.status === 'ongoing') return 50;
    if (currentPlan.status === 'completed') return 100;
    return 0;
  };

  const getCurrentStepIndex = () => {
    if (!currentPlan) return -1;
    if (currentPlan.status === 'selected') return 0;
    if (currentPlan.status === 'ongoing') return 4;
    if (currentPlan.status === 'completed') return 6;
    return -1;
  };

  const handleAdd = () => {
    if (currentPlan) {
      toast({ title: "Already added", description: `${destination.name} is already in your travel plans.` });
      return;
    }
    addPlan({
      name: destination.name,
      country: destination.country,
      image: destination.image,
      emotionalMatch: destination.emotionalMatch,
      matchPercentage: destination.matchPercentage,
      description: destination.description,
      culturalHighlights: destination.culturalHighlights,
      safetyLevel: destination.safetyLevel,
      bestTime: destination.bestTime,
      priceRange: destination.priceRange,
      region: destination.country as 'Tamil Nadu' | 'Kerala' | 'Bangalore',
    });
    toast({ title: "Added to plans!", description: `${destination.name} has been added to your travel dashboard.` });
  };

  const handleStartJourney = () => {
    if (currentPlan) {
      updatePlanStatus(currentPlan.id, 'ongoing');
      toast({ title: "Journey started!", description: `Your journey to ${destination.name} is now ongoing.` });
    }
  };

  const handleCompleteJourney = () => {
    if (currentPlan) {
      updatePlanStatus(currentPlan.id, 'completed');
      toast({ title: "Journey completed!", description: `Congratulations on completing your journey to ${destination.name}!` });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'people': return '👥';
      case 'livelihood': return '🏭';
      case 'culture': return '🎭';
      case 'tradition': return '🎪';
      case 'lifestyle': return '🏠';
      case 'art': return '🎨';
      case 'festival': return '🎊';
      case 'temple': return '🏛️';
      case 'nature': return '🌿';
      case 'adventure': return '🏔️';
      case 'cultural': return '🎭';
      case 'beach': return '🏖️';
      case 'historical': return '📜';
      case 'shopping': return '🛍️';
      case 'food': return '🍽️';
      default: return '📍';
    }
  };

  const normalizeHighlight = (highlight: string | { name: string; description: string; category: string }) => {
    if (typeof highlight === 'string') {
      return {
        name: highlight,
        description: highlight,
        category: 'culture'
      };
    }
    return highlight;
  };

  return (
    <div className="min-h-screen bg-background relative pt-16">
      <ParticleBackground theme="minimal" />

      {/* Hero Section with Overlay Info */}
      <section className="relative">
        <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
          <img
            src={destination.image}
            alt={`${destination.name}, ${destination.country} travel destination`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white">{destination.name}</h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{destination.country}</span>
                    </div>
                    <Separator orientation="vertical" className="h-5 bg-white/30" />
                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-1">
                      <Heart className="w-4 h-4 mr-2" />
                      {destination.matchPercentage}% Match
                    </Badge>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-white">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Safety</span>
                    </div>
                    <p className="text-lg font-semibold capitalize">{destination.safetyLevel}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-white">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">Budget</span>
                    </div>
                    <p className="text-lg font-semibold">{destination.priceRange}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Travel Progress Section - Enhanced Design */}
          {currentPlan && (
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 mb-8 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                        Your Journey Timeline
                      </h2>
                      <p className="text-muted-foreground mt-2">Track your travel progress step by step</p>
                    </div>
                    <Badge className={`px-4 py-2 text-sm font-semibold ${
                      currentPlan.status === 'selected' ? 'bg-blue-500/20 text-blue-600 border-blue-500/30' :
                      currentPlan.status === 'ongoing' ? 'bg-amber-500/20 text-amber-600 border-amber-500/30' :
                      'bg-green-500/20 text-green-600 border-green-500/30'
                    }`}>
                      {currentPlan.status === 'selected' ? 'Planning Phase' :
                       currentPlan.status === 'ongoing' ? 'Journey in Progress' :
                       'Journey Completed'}
                    </Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm font-medium">{getStepProgress()}%</span>
                    </div>
                    <Progress value={getStepProgress()} className="h-3" />
                  </div>
                  
                  {/* Steps Grid */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {travelSteps.map((step, index) => {
                      const currentStepIndex = getCurrentStepIndex();
                      const isCompleted = currentPlan.status === 'completed' || index < currentStepIndex;
                      const isCurrent = index === currentStepIndex;
                      const isUpcoming = index > currentStepIndex;
                      const Icon = step.icon;
                      
                      return (
                        <div
                          key={step.id}
                          className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                            isCompleted ? 'bg-green-50/50 border-green-500/30 shadow-lg shadow-green-500/10' :
                            isCurrent ? 'bg-amber-50/50 border-amber-500/30 shadow-lg shadow-amber-500/10 scale-105' :
                            'bg-gray-50/50 border-gray-200 opacity-60'
                          }`}
                        >
                          {/* Step Number Badge */}
                          <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            isCompleted ? 'bg-green-500 text-white' :
                            isCurrent ? 'bg-amber-500 text-white animate-pulse' :
                            'bg-gray-300 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          
                          {/* Step Content */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                isCompleted ? 'bg-green-100 text-green-600' :
                                isCurrent ? 'bg-amber-100 text-amber-600' :
                                'bg-gray-100 text-gray-400'
                              }`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <h3 className="font-semibold text-lg">{step.title}</h3>
                            </div>
                            
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                            
                            {/* Tips */}
                            <div className="space-y-1">
                              {step.tips.map((tip, tipIndex) => (
                                <div key={tipIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="w-1 h-1 bg-current rounded-full opacity-60" />
                                  <span>{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8 justify-center">
                    {currentPlan.status === 'selected' && (
                      <Button onClick={handleStartJourney} className="px-8 py-3 text-lg">
                        <Navigation className="w-5 h-5 mr-2" />
                        Start Journey
                      </Button>
                    )}
                    {currentPlan.status === 'ongoing' && (
                      <Button onClick={handleCompleteJourney} className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete Journey
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Info className="w-6 h-6 text-primary" />
                    </div>
                    About {destination.name}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                    {destination.description}
                  </p>
                  
                  {/* Emotional Match */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-primary" />
                      Emotional Connection
                    </h3>
                    <p className="text-muted-foreground mb-4">{destination.emotionalMatch}</p>
                    <div className="flex items-center gap-3">
                      <Progress value={destination.matchPercentage} className="flex-1 h-3" />
                      <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                        {destination.matchPercentage}% Match
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cultural Highlights */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-8">
                    <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
                        <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      Cultural Highlights
                    </h2>
                    <p className="text-muted-foreground mb-6">Discover the people, traditions, and way of life that make this destination unique</p>
                  </div>
                  
                  <div className="p-8 pt-4">
                    <div className="grid gap-6">
                      {destination.culturalHighlights.map((highlight, index) => {
                        const normalized = normalizeHighlight(highlight);
                        const categoryColors = {
                          people: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
                          livelihood: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
                          culture: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
                          tradition: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
                          lifestyle: 'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800',
                          art: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800',
                          festival: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800'
                        };
                        return (
                          <div key={index} className={`flex items-start gap-5 p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${categoryColors[normalized.category as keyof typeof categoryColors] || 'bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800'}`}>
                            <div className="text-3xl bg-white dark:bg-gray-900 p-3 rounded-full shadow-sm">
                              {getCategoryIcon(normalized.category)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="font-bold text-xl text-foreground">{normalized.name}</h3>
                                <Badge className="capitalize px-3 py-1 text-xs font-semibold bg-white/70 dark:bg-gray-900/70 text-foreground border-current">
                                  {normalized.category}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground leading-relaxed text-base">{normalized.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Essential Travel Info
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Best Time to Visit</p>
                        <p className="font-semibold">{destination.bestTime}</p>
                      </div>
                    </div>

                    {destination.duration && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                          <Timer className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Ideal Duration</p>
                          <p className="font-semibold">{destination.duration}</p>
                        </div>
                      </div>
                    )}

                    {destination.climate && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-950 rounded-lg">
                          <Thermometer className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Climate</p>
                          <p className="font-semibold text-sm">{destination.climate}</p>
                        </div>
                      </div>
                    )}

                    {destination.language && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                          <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Languages</p>
                          <p className="font-semibold">{destination.language}</p>
                        </div>
                      </div>
                    )}

                    {destination.currency && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                          <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Currency</p>
                          <p className="font-semibold">{destination.currency}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-50 dark:bg-red-950 rounded-lg">
                        <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Safety Level</p>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold capitalize">{destination.safetyLevel}</p>
                          <div className="text-sm">
                            {destination.safetyLevel === 'high' && '🟢'}
                            {destination.safetyLevel === 'medium' && '🟡'}
                            {destination.safetyLevel === 'low' && '🔴'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                        <DollarSign className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Budget Range</p>
                        <p className="font-semibold">{destination.priceRange}</p>
                        <p className="text-xs text-muted-foreground">{rentText}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Plan Your Visit</h3>
                  {!currentPlan ? (
                    <Button onClick={handleAdd} className="w-full py-3 text-lg">
                      <Heart className="w-5 h-5 mr-2" />
                      Add to Travel Plans
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="font-semibold text-primary">Added to Plans!</p>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className="capitalize font-medium">{currentPlan.status}</span>
                        </p>
                      </div>
                      <Button 
                        onClick={() => navigate('/dashboard')} 
                        variant="outline" 
                        className="w-full"
                      >
                        View in Dashboard
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Travel Tips */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                    Expert Travel Tips
                  </h3>
                  <div className="space-y-3">
                    {destination.travelTips && destination.travelTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200/30 dark:border-amber-800/30">
                        <div className="p-1 bg-amber-100 dark:bg-amber-900 rounded-full mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground font-medium">{tip}</p>
                      </div>
                    ))}
                    {(!destination.travelTips || destination.travelTips.length === 0) && (
                      <div className="text-center py-4 text-muted-foreground">
                        <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Travel tips coming soon...</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;