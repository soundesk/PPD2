import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Heart, 
  Flower2, 
  Edit2, 
  Save,
  Baby,
  Clock,
  CheckCircle2
} from 'lucide-react';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    babyName: 'Emma',
    birthDate: '2024-09-15',
    notes: 'Remember to practice self-care daily. It\'s okay to ask for help.'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to a database here
  };

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pt-24 pb-12 px-4">
      {/* Decorative background elements */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl" />
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 right-20 opacity-10"
      >
        <Flower2 className="w-48 h-48 text-purple-300" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-xl mb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-32 h-32 border-4 border-pink-200">
                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-purple-400 text-white text-3xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                  <h1 className="text-purple-900">{profile.name}</h1>
                  <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-purple-700 mb-4">Welcome to your personal wellness space</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                    <Heart className="w-3 h-3 mr-1" />
                    New Mom
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-xl h-full">
              <h2 className="text-purple-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-purple-700">Full Name</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <User className="w-5 h-5 text-purple-400" />
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-purple-900">{profile.name}</span>
                    )}
                  </div>
                </div>

                <Separator className="bg-pink-200/50" />

                <div>
                  <Label htmlFor="email" className="text-purple-700">Email</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-purple-900">{profile.email}</span>
                    )}
                  </div>
                </div>

                <Separator className="bg-pink-200/50" />

                <div>
                  <Label htmlFor="phone" className="text-purple-700">Phone</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Phone className="w-5 h-5 text-purple-400" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-purple-900">{profile.phone}</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Baby Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-xl h-full">
              <h2 className="text-purple-900 mb-6 flex items-center gap-2">
                <Baby className="w-5 h-5" />
                Baby Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="babyName" className="text-purple-700">Baby's Name</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-400" />
                    {isEditing ? (
                      <Input
                        id="babyName"
                        value={profile.babyName}
                        onChange={(e) => handleChange('babyName', e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-purple-900">{profile.babyName}</span>
                    )}
                  </div>
                </div>

                <Separator className="bg-pink-200/50" />

                <div>
                  <Label htmlFor="birthDate" className="text-purple-700">Birth Date</Label>
                  <div className="mt-2 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    {isEditing ? (
                      <Input
                        id="birthDate"
                        type="date"
                        value={profile.birthDate}
                        onChange={(e) => handleChange('birthDate', e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-purple-900">
                        {new Date(profile.birthDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    )}
                  </div>
                </div>

                <Separator className="bg-pink-200/50" />

                <div>
                  <div className="flex items-center gap-3 text-purple-700 mb-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>Baby's Age</span>
                  </div>
                  <div className="ml-8">
                    <span className="text-purple-900">
                      {(() => {
                        const birth = new Date(profile.birthDate);
                        const now = new Date();
                        const diffTime = Math.abs(now.getTime() - birth.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        const months = Math.floor(diffDays / 30);
                        const days = diffDays % 30;
                        return `${months} month${months !== 1 ? 's' : ''}, ${days} day${days !== 1 ? 's' : ''}`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Personal Notes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-xl">
              <h2 className="text-purple-900 mb-4 flex items-center gap-2">
                <Flower2 className="w-5 h-5" />
                Personal Notes & Reminders
              </h2>
              
              {isEditing ? (
                <Textarea
                  value={profile.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="min-h-[120px] text-purple-900"
                  placeholder="Write your thoughts, reminders, or affirmations here..."
                />
              ) : (
                <p className="text-purple-800 leading-relaxed bg-purple-50 p-4 rounded-lg border border-purple-200">
                  {profile.notes}
                </p>
              )}
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-pink-200/50 shadow-xl">
              <h2 className="text-purple-900 mb-6 text-center">Your Wellness Journey</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/60 rounded-xl">
                  <div className="text-3xl mb-2">🌸</div>
                  <div className="text-2xl text-purple-900 mb-1">1</div>
                  <div className="text-purple-700">Assessments Taken</div>
                </div>
                
                <div className="text-center p-4 bg-white/60 rounded-xl">
                  <div className="text-3xl mb-2">💝</div>
                  <div className="text-2xl text-purple-900 mb-1">7</div>
                  <div className="text-purple-700">Days Active</div>
                </div>
                
                <div className="text-center p-4 bg-white/60 rounded-xl">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl text-purple-900 mb-1">3</div>
                  <div className="text-purple-700">Resources Saved</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
