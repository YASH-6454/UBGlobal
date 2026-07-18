'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';

const allTestimonials = [
  { name: 'Ahmed Al-Rashid', company: 'Gulf Engineering, UAE', rating: 5, text: 'United Brothers Global has been our go-to supplier for bright bars for over 5 years. Their quality and on-time delivery is remarkable.', division: 'engineering' },
  { name: 'Hans Mueller', company: 'Deutsche Stahlwerke, Germany', rating: 5, text: 'The alloy steel quality meets our strict European standards every time. Their export process is seamless and professional.', division: 'engineering' },
  { name: 'James Patterson', company: 'Sterling Manufacturing, USA', rating: 5, text: 'We switched to United Brothers for carbon steel and saw a 20% cost reduction without any compromise in quality.', division: 'engineering' },
  { name: 'Yuki Tanaka', company: 'Nippon Auto Parts, Japan', rating: 5, text: 'The precision-grade bright bars are perfect for our automotive line. Consistent specifications save us processing time.', division: 'engineering' },
  { name: 'Sarah Thompson', company: 'Pacific Construction, Australia', rating: 4, text: 'Reliable supply of black bars for our infrastructure projects. Their logistics team ensures timely delivery always.', division: 'engineering' },
  { name: 'Rajesh Mehta', company: 'Mehta Engineering, India', rating: 5, text: 'Competitive pricing and wide range of steel grades. Their technical support team is knowledgeable and very responsive.', division: 'engineering' },
  { name: 'Mohammed Bin Saeed', company: 'Al Baraka Foods, UAE', rating: 5, text: 'The quality of Alphonso mangoes we receive from UBGlobal is exceptional. Freshness and packaging are always top-notch.', division: 'agriculture' },
  { name: 'Lisa Chen', company: 'FreshMart Singapore', rating: 5, text: 'Their onion and vegetable exports arrive perfectly graded and fresh. APEDA certification gives us confidence in quality.', division: 'agriculture' },
  { name: 'David Okafor', company: 'TechBridge Solutions, Nigeria', rating: 5, text: 'UBGlobal built our ERP system from scratch. Professional team, excellent delivery timelines, and ongoing support.', division: 'it' },
  { name: 'Priya Sharma', company: 'RetailMax, India', rating: 5, text: 'Their web development team delivered a stunning e-commerce platform. Our online sales increased 45% within 3 months.', division: 'it' },
];

export default function TestimonialCarousel({ division = 'all', light = true }) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const testimonials = division === 'all'
    ? allTestimonials
    : allTestimonials.filter((t) => t.division === division);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: true }}
        className="pb-16"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i} className="!h-auto">
            <div className={`rounded-2xl p-7 h-full flex flex-col transition-all duration-400 ${
              light
                ? 'bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.1]'
                : 'bg-surface border border-surface-darker/40 hover:shadow-lg'
            }`}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <FiStar key={j} className={`text-sm ${j < t.rating ? 'text-eng fill-eng' : light ? 'text-white/15' : 'text-surface-darker'}`} />
                ))}
              </div>
              <p className={`text-sm leading-relaxed flex-1 mb-6 ${light ? 'text-white/75' : 'text-secondary'}`}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className={`flex items-center gap-3 pt-4 border-t ${light ? 'border-white/[0.08]' : 'border-surface-darker/50'}`}>
                <div className="w-10 h-10 rounded-full gradient-eng flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className={`font-semibold text-sm truncate ${light ? 'text-white' : 'text-primary'}`}>{t.name}</div>
                  <div className={`text-xs truncate ${light ? 'text-white/40' : 'text-secondary-light'}`}>{t.company}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
