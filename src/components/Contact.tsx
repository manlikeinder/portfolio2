import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. I'm always open to discussing new opportunities and interesting projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Let's Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-cyan-100 rounded-lg border border-cyan-200">
                    <Mail className="text-cyan-600" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 font-medium">Email</div>
                    <div className="text-gray-600">your@email.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-cyan-100 rounded-lg border border-cyan-200">
                    <Phone className="text-cyan-600" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 font-medium">Phone</div>
                    <div className="text-gray-600">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-cyan-100 rounded-lg border border-cyan-200">
                    <MapPin className="text-cyan-600" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 font-medium">Location</div>
                    <div className="text-gray-600">Your City, Country</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4 text-gray-900">Follow Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/manlikeinder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-cyan-600 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-cyan-600 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 hover:border-cyan-600 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none peer"
                    placeholder="Your Name"
                    required
                  />
                  <label className="absolute left-4 -top-2.5 text-sm text-gray-600 bg-white px-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-600">
                    Your Name
                  </label>
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none peer"
                    placeholder="Your Email"
                    required
                  />
                  <label className="absolute left-4 -top-2.5 text-sm text-gray-600 bg-white px-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-600">
                    Your Email
                  </label>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none peer"
                  placeholder="Subject"
                  required
                />
                <label className="absolute left-4 -top-2.5 text-sm text-gray-600 bg-white px-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-600">
                  Subject
                </label>
              </div>
              
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-transparent border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none peer resize-none"
                  placeholder="Your Message"
                  required
                />
                <label className="absolute left-4 -top-2.5 text-sm text-gray-600 bg-white px-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-600">
                  Your Message
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;