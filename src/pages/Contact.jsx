import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    const contactInfo = [
        { icon: '📍', title: 'Visit Us', info: '350 Fifth Avenue, New York, NY 10118' },
        { icon: '📧', title: 'Email', info: 'contact@avenge.com' },
        { icon: '📞', title: 'Call', info: '+1 (555) 123-4567' },
        { icon: '🕐', title: 'Hours', info: 'Mon-Fri: 9AM - 6PM EST' }
    ];

    const socialLinks = [
        { name: 'Instagram', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Facebook', href: '#' },
        { name: 'LinkedIn', href: '#' }
    ];

    return (
        <main className="min-h-screen pt-24 bg-black">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-b from-charcoal to-black">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                        <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">Get In Touch</p>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-off-white mb-4">Contact Avenge</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">Have questions about our fragrances? We'd love to hear from you.</p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="section pt-8">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="bg-charcoal rounded-xl border border-gold/10 p-8">
                                <h2 className="font-display text-2xl font-semibold text-off-white mb-6">Send Us a Message</h2>

                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                                            <span className="text-3xl">✓</span>
                                        </div>
                                        <h3 className="font-display text-xl text-off-white mb-2">Message Sent!</h3>
                                        <p className="text-gray-400">We'll get back to you shortly.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                    className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Subject</label>
                                            <input
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none"
                                                placeholder="How can we help?"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Message</label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                required
                                                rows={5}
                                                className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-off-white placeholder-gray-500 focus:border-gold focus:outline-none resize-none"
                                                placeholder="Your message..."
                                            />
                                        </div>
                                        <Button type="submit" variant="primary" size="lg" fullWidth>Send Message</Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            {/* Info Cards */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {contactInfo.map((item) => (
                                    <div key={item.title} className="bg-charcoal rounded-xl border border-gold/10 p-6">
                                        <div className="text-2xl mb-3">{item.icon}</div>
                                        <h3 className="font-display text-lg font-semibold text-off-white mb-1">{item.title}</h3>
                                        <p className="text-gray-400 text-sm">{item.info}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="bg-charcoal rounded-xl border border-gold/10 p-6">
                                <h3 className="font-display text-lg font-semibold text-off-white mb-4">Follow Us</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className="px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold hover:text-black transition-colors text-sm"
                                        >
                                            {social.name}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-charcoal rounded-xl border border-gold/10 h-64 flex items-center justify-center">
                                <div className="text-center">
                                    <span className="text-4xl mb-2 block">🗺️</span>
                                    <p className="text-gray-400">Interactive map coming soon</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
