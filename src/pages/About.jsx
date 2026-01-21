import { motion } from 'framer-motion';
import Button from '../components/Button';

const About = () => {
    const values = [
        { icon: '💡', title: 'Innovation', description: 'Blending ancient techniques with cutting-edge molecular science.' },
        { icon: '🌍', title: 'Sustainability', description: 'Ethically sourced ingredients and eco-conscious packaging.' },
        { icon: '✨', title: 'Excellence', description: 'Rigorous testing ensures only the finest fragrances.' },
        { icon: '❤️', title: 'Passion', description: 'Master perfumers pour their hearts into every creation.' }
    ];

    const milestones = [
        { year: '2020', title: 'The Beginning', description: 'Avenge was founded to redefine luxury fragrance.' },
        { year: '2021', title: 'First Collection', description: 'Released "Dark Sovereign" collection to acclaim.' },
        { year: '2023', title: 'Industry Recognition', description: 'Won "Best Luxury Fragrance Brand" award.' },
        { year: '2024', title: 'Sustainable Future', description: 'Achieved carbon neutrality.' }
    ];

    return (
        <main className="min-h-screen pt-24 bg-black">
            {/* Hero */}
            <section className="relative py-24 bg-gradient-to-br from-charcoal via-deep-brown to-black">
                <div className="container relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
                        <p className="text-gold uppercase tracking-[0.3em] text-sm mb-6">Our Story</p>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-off-white mb-8">
                            Born from <span className="text-gradient">Boldness</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl">
                            Avenge was created for those who refuse to blend in. Fragrance is a statement of power and confidence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">The Avenge Philosophy</p>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-off-white mb-6">Crafting Confidence</h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>In 2020, we set out to create fragrances that amplify who you are. We believed the world needed perfumes that make statements, not whispers.</p>
                                <p>Our master perfumers source the rarest ingredients from around the globe. Every Avenge fragrance is a composition of power for the bold and ambitious.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-charcoal rounded-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-glow">
                                        <span className="font-display text-5xl font-bold text-black">A</span>
                                    </div>
                                    <p className="font-display text-2xl text-off-white">Avenge</p>
                                    <p className="text-gold uppercase tracking-[0.3em] text-sm">Est. 2020</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section bg-charcoal">
                <div className="container">
                    <div className="text-center mb-16">
                        <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">What Drives Us</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-off-white">Our Core Values</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div key={value.title} className="bg-black rounded-xl border border-gold/10 p-8 text-center hover:border-gold/30 transition-colors">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="font-display text-xl font-semibold text-off-white mb-3">{value.title}</h3>
                                <p className="text-gray-400 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section">
                <div className="container">
                    <div className="text-center mb-16">
                        <p className="text-gold uppercase tracking-[0.2em] text-sm mb-4">Our Journey</p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-off-white">Milestones</h2>
                    </div>
                    <div className="max-w-2xl mx-auto space-y-8">
                        {milestones.map((m) => (
                            <div key={m.year} className="flex gap-6">
                                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shrink-0">
                                    <span className="font-display text-black font-bold">{m.year}</span>
                                </div>
                                <div>
                                    <h3 className="font-display text-xl font-semibold text-off-white mb-2">{m.title}</h3>
                                    <p className="text-gray-400">{m.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-gradient-to-r from-deep-brown via-charcoal to-deep-brown">
                <div className="container text-center">
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-off-white mb-6">Experience Avenge</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">Discover your signature scent today.</p>
                    <Button to="/products" variant="primary" size="xl">Explore Collection</Button>
                </div>
            </section>
        </main>
    );
};

export default About;
