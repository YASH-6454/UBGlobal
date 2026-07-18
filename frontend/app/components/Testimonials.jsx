'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  { name: 'Ahmed Al-Rashid', company: 'Gulf Engineering, UAE', rating: 5, text: 'United Brothers Global has been our go-to supplier for bright bars for over 5 years. Their quality and on-time delivery is remarkable.' },
  { name: 'Hans Mueller', company: 'Deutsche Stahlwerke, Germany', rating: 5, text: 'The alloy steel quality meets our strict European standards every time. Their export process is seamless and professional.' },
  { name: 'James Patterson', company: 'Sterling Manufacturing, USA', rating: 5, text: 'We switched to United Brothers for carbon steel and saw a 20% cost reduction without any compromise in quality.' },
  { name: 'Yuki Tanaka', company: 'Nippon Auto Parts, Japan', rating: 5, text: 'The precision-grade bright bars are perfect for our automotive line. Consistent specifications save us processing time.' },
  { name: 'Sarah Thompson', company: 'Pacific Construction, Australia', rating: 4, text: 'Reliable supply of black bars for our infrastructure projects. Their logistics team ensures timely delivery always.' },
  { name: 'Rajesh Mehta', company: 'Mehta Engineering, India', rating: 5, text: 'Competitive pricing and wide range of steel grades. Their technical support team is knowledgeable and very responsive.' },
];

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  return (
    <section id="testimonials" className="py-20 sm:py-28 gradient-primary relative overflow-hidden">
      <div className="absolute top-16 left-10 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-16 right-10 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="text-accent font-semibold text-xs tracking-[0.2em] uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4 font-[Poppins]">What Our Clients Say</h2>
          <div className="section-divider mx-auto mb-5" />
          <p className="text-white/50 max-w-2xl mx-auto text-base">Hear from our valued clients across the globe.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
          <Swiper modules={[Pagination, Autoplay]} spaceBetween={24} slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            pagination={{ clickable: true }} autoplay={{ delay: 4500, disableOnInteraction: true }} className="pb-16"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-7 h-full flex flex-col hover:bg-white/[0.1] transition-all duration-400">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <FiStar key={j} className={`text-sm ${j < t.rating ? 'text-accent fill-accent' : 'text-white/15'}`} />
                    ))}
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
                    <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white font-bold text-sm shrink-0">{t.name.charAt(0)}</div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-sm truncate">{t.name}</div>
                      <div className="text-white/40 text-xs truncate">{t.company}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
