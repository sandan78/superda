import React from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Users, Star, Clock, Camera, Utensils, Car, Plane, Hotel, CircleCheck as CheckCircle, Circle } from 'lucide-react';
import { tamilNaduDestinations, keralaDestinations, bangaloreDestinations } from '@/data/destinations';
import { usePlans } from '@/contexts/PlanContext';
import { useToast } from '@/hooks/use-toast';
import { GoogleMapEmbed } from '@/components/GoogleMapEmbed';

const DestinationDetail = () => {
  const { country, name } = useParams<{ country: string; name: string }>();
  const location = useLocation();
  const { selectedPlans, addPlan, advancePlanStep } = usePlans();
  const { toast } = useToast();
  
  const destinations = [...tamilNaduDestinations, ...keralaDestinations, ...bangaloreDestinations];
  const destination = location.state?.destination || destinations.find(d => 
    d.name === decodeURIComponent(name || '') && d.country === decodeURIComponent(country || '')
  );
  
  if (!destination) {
    return <Navigate to="/not-found" replace />;
  }

  const existingPlan = selectedPlans.find(p => 
    p.destinationName === destination.name && p.destinationCountry === destination.country
  );
  
  const handleStartJourney = () => {
    if (!existingPlan) {
      addPlan({
        destinationName: destination.name,
        destinationCountry: destination.country,
        region: destination.country,
        status: 'ongoing',
        currentStep: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      toast({
        title: "Journey Started! 🎉",
        description: `Your journey to ${destination.name} has begun at Step 1: Research & Planning`,
      });
    }
  };

  const handleCompleteStep = () => {
    if (existingPlan && existingPlan.currentStep < 6) {
      advancePlanStep(existingPlan.id!);
      
      const nextStep = existingPlan.currentStep + 1;
      if (nextStep === 6) {
        toast({
          title: "Journey Completed! 🎊",
          description: `Congratulations! You've completed your journey to ${destination.name}`,
        });
      } else {
        const stepNames = [
          '', 'Research & Planning', 'Accommodation & Transport', 'Travel Preparation', 
          'Arrival & Check-in', 'Explore & Experience', 'Journey Complete'
        ];
        toast({
          title: `Step ${existingPlan.currentStep} Completed! ✅`,
          description: `Moving to Step ${nextStep}: ${stepNames[nextStep]}`,
        });
      }
    }
  };

  const getStepStatus = (stepNumber: number) => {
    if (!existingPlan) return 'pending';
    if (existingPlan.currentStep > stepNumber) return 'completed';
    if (existingPlan.currentStep === stepNumber) return 'current';
    return 'pending';
  };

  const getProgressPercentage = () => {
    if (!existingPlan) return 0;
    return Math.round((existingPlan.currentStep / 6) * 100);
  };

  const regionMapConfigs = {
    'Tamil Nadu': {
      embedUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(destination.name + ', Tamil Nadu, India')}`,
      searchBounds: { lat: 11.1271, lng: 78.6569 }
    },
    'Kerala': {
      embedUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(destination.name + ', Kerala, India')}`,
      searchBounds: { lat: 10.8505, lng: 76.2711 }
    },
    'Karnataka': {
      embedUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(destination.name + ', Karnataka, India')}`,
      searchBounds: { lat: 15.3173, lng: 75.7139 }
    }
  };

  const journeySteps = [
    {
      id: 1,
      title: "Research & Planning",
      description: "Gather information about the destination, weather, and local customs",
      icon: <Calendar className="w-5 h-5" />,
      tasks: [
        "Check weather forecasts",
        "Learn basic local phrases", 
        "Research cultural etiquette"
      ]
    },
    {
      id: 2,
      title: "Accommodation & Transport",
      description: "Book hotels, flights, and local transportation",
      icon: <Hotel className="w-5 h-5" />,
      tasks: [
        "Compare prices across platforms",
        "Book refundable options",
        "Save confirmation emails"
      ]
    },
    {
      id: 3,
      title: "Travel Preparation", 
      description: "Pack essentials, check documents, and prepare for the journey",
      icon: <Car className="w-5 h-5" />,
      tasks: [
        "Create packing checklist",
        "Check passport validity",
        "Get travel insurance"
      ]
    },
    {
      id: 4,
      title: "Arrival & Check-in",
      description: "Reach destination, check into accommodation, and get oriented",
      icon: <MapPin className="w-5 h-5" />,
      tasks: [
        "Keep hotel address handy",
        "Exchange currency",
        "Get local SIM/WiFi"
      ]
    },
    {
      id: 5,
      title: "Explore & Experience",
      description: "Visit attractions, try local cuisine, and immerse in culture",
      icon: <Camera className="w-5 h-5" />,
      tasks: [
        "Start early to avoid crowds",
        "Try street food",
        "Interact with locals"
      ]
    },
    {
      id: 6,
      title: "Journey Complete",
      description: "Reflect on experiences and share memories",
      icon: <Star className="w-5 h-5" />,
      tasks: [
        "Write travel journal",
        "Share photos with friends",
        "Leave reviews"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{destination.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>3-5 days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Journey Timeline */}
            {existingPlan && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Your Journey Timeline</CardTitle>
                        <CardDescription>Track your travel progress step by step</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 px-3 py-1">
                      {existingPlan.status === 'completed' ? 'Journey Complete' : 'Journey In Progress'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                      <span className="text-sm font-bold text-blue-600">{getProgressPercentage()}%</span>
                    </div>
                    <Progress value={getProgressPercentage()} className="h-3" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {journeySteps.map((step, index) => {
                      const status = getStepStatus(step.id);
                      return (
                        <div
                          key={step.id}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            status === 'completed' 
                              ? 'bg-green-50 border-green-200' 
                              : status === 'current'
                              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              status === 'completed' 
                                ? 'bg-green-100 text-green-600' 
                                : status === 'current'
                                ? 'bg-amber-100 text-amber-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {status === 'completed' ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                step.icon
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  status === 'completed' 
                                    ? 'bg-green-500 text-white' 
                                    : status === 'current'
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-gray-300 text-gray-600'
                                }`}>
                                  {step.id}
                                </span>
                                <h3 className={`font-semibold ${
                                  status === 'completed' 
                                    ? 'text-green-800' 
                                    : status === 'current'
                                    ? 'text-amber-800'
                                    : 'text-gray-600'
                                }`}>
                                  {step.title}
                                </h3>
                              </div>
                              <p className={`text-sm mb-3 ${
                                status === 'completed' 
                                  ? 'text-green-700' 
                                  : status === 'current'
                                  ? 'text-amber-700'
                                  : 'text-gray-500'
                              }`}>
                                {step.description}
                              </p>
                              <ul className="space-y-1">
                                {step.tasks.map((task, taskIndex) => (
                                  <li key={taskIndex} className={`text-xs flex items-center gap-2 ${
                                    status === 'completed' 
                                      ? 'text-green-600' 
                                      : status === 'current'
                                      ? 'text-amber-600'
                                      : 'text-gray-400'
                                  }`}>
                                    <Circle className="w-2 h-2 fill-current" />
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {existingPlan.status !== 'completed' && (
                    <div className="mt-6 text-center">
                      <Button 
                        onClick={handleCompleteStep}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete Current Step
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Destination Info Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-1">
                <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
                <TabsTrigger value="attractions" className="rounded-lg">Attractions</TabsTrigger>
                <TabsTrigger value="cuisine" className="rounded-lg">Cuisine</TabsTrigger>
                <TabsTrigger value="tips" className="rounded-lg">Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">About {destination.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">{destination.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          Best For
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {[destination.emotionalMatch].map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          Duration & Budget
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-700">Duration: {destination.duration}</p>
                          <p className="text-gray-700">Budget: {destination.budget}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attractions">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Camera className="w-6 h-6 text-purple-600" />
                      Top Attractions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {(destination.touristPlaces || []).map((place, index) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                          <h4 className="font-semibold text-purple-800 mb-2">{place.name}</h4>
                          <p className="text-sm text-purple-600">Must-visit destination</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cuisine">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Utensils className="w-6 h-6 text-orange-600" />
                      Local Cuisine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {(destination.localCuisine || []).map((dish, index) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                          <h4 className="font-semibold text-orange-800 mb-2">{dish}</h4>
                          <p className="text-sm text-orange-600">Local specialty</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-600" />
                      Travel Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(destination.travelTips || []).map((tip, index) => (
                        <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                          <p className="text-yellow-800">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Plan Your Journey</CardTitle>
                <CardDescription>
                  {existingPlan 
                    ? `Journey ${existingPlan.status === 'completed' ? 'completed' : 'in progress'}`
                    : 'Ready to start your adventure?'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!existingPlan ? (
                  <Button 
                    onClick={handleStartJourney}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plane className="w-5 h-5 mr-2" />
                    Begin Step 1: Research & Planning
                  </Button>
                ) : existingPlan.status === 'completed' ? (
                  <div className="text-center">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-semibold">Journey Completed!</p>
                      <p className="text-green-600 text-sm">You've successfully completed your journey to {destination.name}</p>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={handleCompleteStep}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete Current Step
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GoogleMapEmbed 
                  location={destination.name} 
                  embedUrl={regionMapConfigs[destination.country as keyof typeof regionMapConfigs]?.embedUrl}
                />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Budget</span>
                  <span className="font-semibold">{destination.priceRange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Time</span>
                  <span className="font-semibold">Year Round</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;