import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Instagram, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast"; // Assuming use-toast is set up
// import Navbar from '@/components/Navbar'; // Uncomment if you want Navbar
// import Footer from '@/components/Footer';   // Uncomment if you want Footer

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Oops! Missing info",
        description: "Fill out all fields before sending",
        variant: "destructive",
      });
      return;
    }
    // TODO: Implement actual message sending logic (e.g., API call)
    console.log('Message to send:', { name, email, message });
    navigate('/message-sent'); // Navigate to a confirmation page
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      {/* <Navbar /> */} {/* Navbar is global in App.jsx */}
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 pt-0"> {/* Removed gradient, adjusted pt-24 to pt-0 */}
        <div className="container mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-buddy-lavender font-outfit">Contact Us</h1>
            <p className="text-xl text-gray-600 mt-2">We'd love to hear from you!</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 font-outfit mb-4">Get in Touch</h2>
              <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
                <CardContent className="pt-6">
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-buddy-lavender" />
                      <span>harshitverma547@gmail.com</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Instagram className="h-5 w-5 text-buddy-lavender" />
                      <span>@Harshit.hgh_333</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-buddy-lavender" />
                      <span>+91 85629 30574</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <p className="text-gray-600">
                Feel free to reach out via email, social media, or phone. For quick inquiries, you can also use the contact form.
              </p>
            </div>

            {/* Contact Form Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 font-outfit mb-4">Send Us a Message</h2>
              <Card className="bg-white/80 backdrop-blur-sm border-none shadow-lg">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="contact-name">Name</Label>
                      <Input 
                        id="contact-name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="bg-white/70 mt-1"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input 
                        id="contact-email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="bg-white/70 mt-1"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Message</Label>
                      <textarea 
                        id="contact-message" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex h-32 w-full rounded-md border border-input bg-white/70 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none mt-1"
                        placeholder="What's on your mind?"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="cta-button w-full flex justify-center items-center gap-2"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
           <div className="text-center mt-16">
              <Link to="/" className="cta-button inline-block">
                Back to Home
              </Link>
            </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default ContactUsPage;