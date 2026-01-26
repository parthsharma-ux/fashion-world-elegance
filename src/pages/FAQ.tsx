import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including UPI, debit cards, credit cards, net banking, and cash on delivery. You can also place orders via WhatsApp for a seamless experience.',
    },
    {
      question: 'What is the dispatch time?',
      answer: 'All orders are dispatched within 2-3 working days after order confirmation.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'All over India delivery within 5-7 working days. Metro cities usually receive orders faster. You will receive tracking information once your order is shipped.',
    },
    {
      question: 'What is your return and exchange policy?',
      answer: 'No Returns & Exchange as we are already providing the real pic and all fabric details are mentioned in description. Note: You can request for exchange within 24 hours by submitting a 360° unboxing video in case of any wrong parcel received.',
    },
    {
      question: 'How do I choose the right size?',
      answer: 'We provide a detailed size guide on each product page. You can find measurements for bust, waist, hip, and length. If you are still unsure, message us on WhatsApp and we will help you find the perfect fit.',
    },
    {
      question: 'Are your products genuine Jaipuri?',
      answer: 'Yes! All our products are authentic Jaipuri kurtis handcrafted by skilled artisans in Jaipur. We work directly with local craftsmen to bring you genuine traditional designs.',
    },
    {
      question: 'Do you offer bulk or wholesale orders?',
      answer: 'Yes, we offer special pricing for bulk and wholesale orders. Contact us via WhatsApp or email for bulk order inquiries and we will provide you with a custom quote.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you will receive a tracking link via SMS and WhatsApp. You can use this link to track your package in real-time.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Yes, you can cancel your order within 24 hours of placing it. After that, the order goes into processing and cancellation may not be possible. Contact us immediately if you need to cancel.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship only within India. We are working on expanding our international shipping options. Please follow us on Instagram for updates.',
    },
    {
      question: 'How do I care for my Jaipuri kurti?',
      answer: 'We recommend dry cleaning for best results. For home wash, use cold water and mild detergent. Avoid wringing and dry in shade. Iron on medium heat. Care instructions are also included with each product.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm uppercase tracking-widest font-medium">
              Help Center
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Find answers to common questions about our products, shipping, returns, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-display text-lg font-semibold hover:text-primary transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Can't find the answer you're looking for? Reach out to us and we'll be happy to help.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="https://wa.me/916376327343"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
