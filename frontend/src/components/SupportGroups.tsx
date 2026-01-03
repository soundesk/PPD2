import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Users, Heart, MessageCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface SupportGroupsProps {
  onBack: () => void;
}

export function SupportGroups({ onBack }: SupportGroupsProps) {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({ email: false });

  const telegramGroupLink = 'https://t.me/+BmC6yIbq80E5MTY0'; // TODO: Replace with actual Telegram group invite link

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!formData.email.trim()) {
      setErrors({ email: true });
      return;
    }

    // TODO: Send the data to your backend
    // Example:
    // fetch('/api/support-group/join', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // }).then(() => {
    //   window.open(telegramGroupLink, '_blank');
    // });

    console.log('Joining support group with:', formData);
    
    // Redirect to Telegram group
    window.open(telegramGroupLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-2xl mb-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white mx-auto shadow-lg">
                  <Users className="w-12 h-12" />
                </div>
              </motion.div>
              
              <h1 className="text-purple-900 mb-4">Join Our Community</h1>
              <p className="text-purple-800 text-lg max-w-2xl mx-auto">
                Join our community of mothers who are experiencing similar challenges. 
                Share, talk, and support each other in a safe space.
              </p>
            </div>

            {/* Community Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 rounded-xl overflow-hidden shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=400&fit=crop"
                alt="Women supporting each other"
                className="w-full h-64 object-cover"
              />
            </motion.div>

            {!showJoinForm ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <Heart className="w-10 h-10 text-purple-600 mb-3" />
                    <h3 className="text-purple-900 mb-2">Safe Space</h3>
                    <p className="text-purple-700 text-sm">
                      A confidential and supportive environment for sharing your experiences
                    </p>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <MessageCircle className="w-10 h-10 text-purple-600 mb-3" />
                    <h3 className="text-purple-900 mb-2">24/7 Support</h3>
                    <p className="text-purple-700 text-sm">
                      Connect with other mothers anytime you need support or someone to talk to
                    </p>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <Users className="w-10 h-10 text-purple-600 mb-3" />
                    <h3 className="text-purple-900 mb-2">Shared Experiences</h3>
                    <p className="text-purple-700 text-sm">
                      Find comfort in knowing you're not alone on this journey
                    </p>
                  </Card>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => setShowJoinForm(true)}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12"
                  >
                    Join Now
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <h3 className="text-purple-900 mb-6 text-center">
                    Join Our Telegram Group
                  </h3>
                  
                  <form onSubmit={handleJoin} className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="text-purple-900">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ email: false });
                        }}
                        required
                        className={`mt-2 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-purple-300 focus:border-purple-500'}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-purple-900">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2 border-purple-300 focus:border-purple-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div className="bg-white p-6 rounded-lg text-center">
                      <div className="flex justify-center mb-4">
                        <QRCodeSVG value={telegramGroupLink} size={128} />
                      </div>
                      <p className="text-purple-800 mb-4">
                        Scan this QR code or click the button below to join our Telegram support group
                      </p>
                      <p className="text-sm text-purple-600">
                        Note: This is a Telegram group where you can connect with other mothers
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowJoinForm(false);
                          setErrors({ email: false });
                        }}
                        className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Join Telegram Group
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
