import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ArrowLeft, MapPin, Phone, Clock, Calendar as CalendarIcon, User, Stethoscope, Search, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Provider {
  id: number;
  name: string;
  specialty: string;
  location: string;
  phone: string;
  availability: string[];
  availableDates: Date[];
}

interface HealthcareProviderProps {
  onBack: () => void;
}

export function HealthcareProvider({ onBack }: HealthcareProviderProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [patientName, setPatientName] = useState('');
  const [errors, setErrors] = useState({ patientName: false, date: false });
  
  // Filter states
  const [nameFilter, setNameFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  // TODO: Replace with actual API call to fetch providers from backend
  const providers: Provider[] = [];
  // Example API call structure:
  // const [providers, setProviders] = useState<Provider[]>([]);
  // useEffect(() => {
  //   fetch('/api/providers')
  //     .then(res => res.json())
  //     .then(data => setProviders(data));
  // }, []);

  const cities = ['all', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX'];
  const specialties = ['all', 'Perinatal Psychiatrist', 'Clinical Psychologist', 'Psychiatrist'];

  const filteredProviders = providers.filter(provider => {
    const matchesName = provider.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesLocation = locationFilter === 'all' || provider.location === locationFilter;
    const matchesSpecialty = specialtyFilter === 'all' || provider.specialty === specialtyFilter;
    const matchesAvailability = availabilityFilter === 'all' || provider.availability.includes(availabilityFilter);
    
    return matchesName && matchesLocation && matchesSpecialty && matchesAvailability;
  });

  const handleBookAppointment = (provider: Provider) => {
    setSelectedProvider(provider);
    setShowBookingDialog(true);
    setSelectedDate(undefined);
    setPatientName('');
    setErrors({ patientName: false, date: false });
  };

  const handleConfirmBooking = () => {
    // Validate form
    const newErrors = {
      patientName: !patientName.trim(),
      date: !selectedDate
    };
    setErrors(newErrors);

    if (!newErrors.patientName && !newErrors.date && selectedProvider && selectedDate) {
      // TODO: Send booking data to backend
      // Example:
      // fetch('/api/appointments', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     providerId: selectedProvider.id,
      //     patientName,
      //     appointmentDate: selectedDate
      //   })
      // }).then(res => res.json()).then(() => {
      //   setShowBookingDialog(false);
      //   setShowSuccessDialog(true);
      // });

      console.log('Booking appointment:', {
        providerId: selectedProvider.id,
        provider: selectedProvider.name,
        date: selectedDate,
        patientName
      });
      
      setShowBookingDialog(false);
      setShowSuccessDialog(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccessDialog(false);
        setPatientName('');
        setSelectedDate(undefined);
      }, 3000);
    }
  };

  const isDateAvailable = (date: Date) => {
    if (!selectedProvider) return false;
    return selectedProvider.availableDates.some(
      availDate => 
        availDate.getDate() === date.getDate() &&
        availDate.getMonth() === date.getMonth() &&
        availDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white mx-auto shadow-lg">
                <Stethoscope className="w-12 h-12" />
              </div>
            </motion.div>
            
            <h1 className="text-purple-900 mb-4">Find a Healthcare Provider</h1>
            <p className="text-purple-800 text-lg max-w-2xl mx-auto">
              Connect with qualified mental health professionals specializing in postpartum care
            </p>
          </div>

          {/* Filters */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg mb-8">
            <h3 className="text-purple-900 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Filter Providers
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="name" className="text-purple-900 text-sm">Search by Name</Label>
                <Input
                  id="name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="Provider name..."
                  className="mt-2 border-purple-300 focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-purple-900 text-sm">Location</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="mt-2 border-purple-300">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>
                        {city === 'all' ? 'All Cities' : city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="specialty" className="text-purple-900 text-sm">Specialty</Label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger className="mt-2 border-purple-300">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty === 'all' ? 'All Specialties' : specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability" className="text-purple-900 text-sm">Availability</Label>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="mt-2 border-purple-300">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Days</SelectItem>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Providers List */}
          <div className="space-y-4">
            {filteredProviders.length === 0 ? (
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-purple-200 text-center">
                <p className="text-purple-700">No providers found matching your criteria</p>
              </Card>
            ) : (
              filteredProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white flex-shrink-0">
                            <User className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-purple-900 mb-2">{provider.name}</h3>
                            <div className="space-y-1 text-sm text-purple-700">
                              <p className="flex items-center gap-2">
                                <Stethoscope className="w-4 h-4" />
                                {provider.specialty}
                              </p>
                              <p className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {provider.location}
                              </p>
                              <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {provider.phone}
                              </p>
                              <p className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Available: {provider.availability.join(', ')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleBookAppointment(provider)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Booking Dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300">
            <DialogHeader>
              <DialogTitle className="text-purple-900">
                Book Appointment with {selectedProvider?.name}
              </DialogTitle>
              <DialogDescription className="text-purple-700">
                Fill in your details and select a date to book your appointment
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <div>
                <Label htmlFor="patientName" className="text-purple-900">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => {
                    setPatientName(e.target.value);
                    if (errors.patientName) setErrors({ ...errors, patientName: false });
                  }}
                  placeholder="Enter your full name"
                  className={`mt-2 ${errors.patientName ? 'border-red-500 focus:border-red-500' : 'border-purple-300 focus:border-purple-500'}`}
                />
                {errors.patientName && <p className="text-red-500 text-sm mt-1">Name is required</p>}
              </div>

              <div>
                <Label className="text-purple-900 mb-3 block">
                  Select an Available Date <span className="text-red-500">*</span>
                </Label>
                <div className={`bg-white p-4 rounded-lg border-2 ${errors.date ? 'border-red-500' : 'border-purple-200'}`}>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (errors.date) setErrors({ ...errors, date: false });
                    }}
                    disabled={(date) => !isDateAvailable(date)}
                    className="rounded-md"
                  />
                </div>
                <p className="text-sm text-purple-600 mt-2">
                  Only available dates are selectable
                </p>
                {errors.date && <p className="text-red-500 text-sm mt-1">Date selection is required</p>}
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowBookingDialog(false);
                    setErrors({ patientName: false, date: false });
                  }}
                  className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="max-w-md bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300">
            <DialogHeader>
              <DialogTitle className="text-purple-900 text-center">
                Booking Confirmed!
              </DialogTitle>
              <DialogDescription className="text-purple-700 text-center">
                Your appointment has been successfully scheduled
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-green-400"
                  />
                </div>
              </motion.div>

              <div className="bg-white/60 p-4 rounded-lg text-center">
                <p className="text-purple-900 mb-1">
                  <strong>{selectedProvider?.name}</strong>
                </p>
                <p className="text-purple-700 text-sm">
                  {selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <Button
                onClick={() => setShowSuccessDialog(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}