import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';

// Replace these with your actual Instagram post URLs
// Go to your post on Instagram, click "..." menu, select "Copy Link"
const instagramPostUrls = [
  'https://www.instagram.com/p/YOUR_POST_ID_1/',
  'https://www.instagram.com/p/YOUR_POST_ID_2/',
  'https://www.instagram.com/p/YOUR_POST_ID_3/',
  'https://www.instagram.com/p/YOUR_POST_ID_4/',
  'https://www.instagram.com/p/YOUR_POST_ID_5/',
  'https://www.instagram.com/p/YOUR_POST_ID_6/',
];

const InstagramLookbook: React.FC = () => {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    return () => {
      const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <a 
            href="https://www.instagram.com/jaipuri_kurtis_manufacturer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest font-medium hover:underline"
          >
            <Instagram className="w-4 h-4" />
            @jaipuri_kurtis_manufacturer
          </a>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-4 md:mb-6">
            Follow Our Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Get inspired by our latest collections and styling ideas on Instagram
          </p>
        </motion.div>

        {/* Instagram Embeds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {instagramPostUrls.map((postUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="instagram-embed-container"
            >
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={postUrl}
                data-instgrm-version="14"
                style={{
                  background: 'var(--background)',
                  border: '0',
                  borderRadius: '12px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '0',
                  maxWidth: '100%',
                  minWidth: '280px',
                  padding: '0',
                  width: '100%',
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Instagram className="w-5 h-5" />
                    View on Instagram
                  </a>
                </div>
              </blockquote>
            </motion.div>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-14"
        >
          <a
            href="https://www.instagram.com/jaipuri_kurtis_manufacturer?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            Follow Us on Instagram
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramLookbook;
