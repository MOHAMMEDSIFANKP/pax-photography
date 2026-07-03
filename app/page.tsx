'use client';
import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import {
  MapPin,
  Phone,
  MessageCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Camera,
  Video,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { InstagramIcon, FacebookIcon } from "./components/SocialIcons";
// logo
import logo from "@/public/logo/logo.jpg";

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1492175742197-ed20dc5a6bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    label: "Bridal",
    cat: "Wedding",
  },
  {
    src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    label: "Romance",
    cat: "Couple",
  },
  {
    src: "https://images.unsplash.com/photo-1488846343176-08e05ab9a2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    label: "Portrait",
    cat: "Modeling",
  },
  {
    src: "https://images.unsplash.com/photo-1664714844985-adb4fd6572ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    label: "Candid",
    cat: "Couple",
  },
  {
    src: "https://images.unsplash.com/photo-1588433963304-7edb7af03908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    label: "Bouquet",
    cat: "Wedding",
  },
  {
    src: "https://images.unsplash.com/photo-1614618586684-7afae48a15d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    label: "Fashion",
    cat: "Modeling",
  },
];

const REVIEWS = [
  {
    "name": "Nashid Nazer",
    "rating": 5,
    "text": "Pax Photography made my sister’s nikah one of the most beautiful memories of our lives. Their skill, dedication, and passion transformed the nikah into a truly divine experience.",
    "date": "Google Review",
    "avatar": "NN"
  },
  {
    "name": "Fathima Munjiya",
    "rating": 5,
    "text": "Pax Photography made our wedding day stress-free and memorable. Their team is very professional, creative, and captures real emotions beautifully.",
    "date": "1 week ago",
    "avatar": "FM"
  },
  {
    "name": "REFAYTKS",
    "rating": 5,
    "text": "Exceptional quality and highly professional. We worked on a commercial project and the results exceeded expectations. They understood our brand guidelines perfectly.",
    "date": "1 month ago",
    "avatar": "RF"
  },
  {
    "name": "Afna Nushi",
    "rating": 5,
    "text": "I'm so glad I chose Pax Studio for my wedding photography. The team is friendly, patient, and truly understands client requirements. Every moment was captured beautifully.",
    "date": "4 months ago",
    "avatar": "AN"
  },
  {
    "name": "Ashmila's World",
    "rating": 5,
    "text": "Thank you for capturing our special day so beautifully. Your hard work and talent can be seen in every frame. Highly recommended!",
    "date": "4 weeks ago",
    "avatar": "AW"
  },
  {
    "name": "Haseeb Hasi",
    "rating": 5,
    "text": "Had my wedding photographed by Pax Photography. Every beautiful moment was captured perfectly with excellent quality.",
    "date": "5 months ago",
    "avatar": "HH"
  },
  {
    "name": "Thasni Sakeer",
    "rating": 5,
    "text": "Great experience with Pax. Professional, friendly team and amazing photos and videos with excellent editing quality.",
    "date": "1 month ago",
    "avatar": "TS"
  },
  {
    "name": "Shameem Kundookkara",
    "rating": 5,
    "text": "Excellent experience at Pax Studio. Extremely professional and creative team. Highly recommended.",
    "date": "5 months ago",
    "avatar": "SK"
  },
  {
    "name": "Nijiya Nizar",
    "rating": 5,
    "text": "Amazing photography studio. Very professional and friendly team with outstanding creativity and attention to detail.",
    "date": "4 months ago",
    "avatar": "NN"
  },
  {
    "name": "Hadiy NK",
    "rating": 5,
    "text": "Glad I chose Pax Studio for family photography. Amazing experience with a friendly and professional team.",
    "date": "3 months ago",
    "avatar": "HK"
  },
  {
    "name": "Jafar Sadik",
    "rating": 5,
    "text": "Amazing experience for our marriage shoot. Very professional and made us feel comfortable throughout the session.",
    "date": "3 weeks ago",
    "avatar": "JS"
  },
  {
    "name": "Anand P",
    "rating": 5,
    "text": "Excellent experience at Pax Studio. Professional team that truly understands creative vision.",
    "date": "8 months ago",
    "avatar": "AP"
  },
  {
    "name": "Muhammed Ashiq",
    "rating": 5,
    "text": "Rahim blends photography with pure magic. Every moment is captured with precision and creativity.",
    "date": "2 months ago",
    "avatar": "MA"
  },
  {
    "name": "Akhil Krishna",
    "rating": 5,
    "text": "Fantastic experience. Extremely professional and creative team. The session felt natural and relaxed.",
    "date": "4 months ago",
    "avatar": "AK"
  },
  {
    "name": "Bahjath Sha",
    "rating": 5,
    "text": "Heartfelt thanks for capturing my brother’s wedding so beautifully. Every moment turned into a priceless memory.",
    "date": "5 months ago",
    "avatar": "BS"
  }
]
const CATS = ["All", "Wedding", "Couple", "Modeling"];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < count ? "fill-[#C0392B] text-[#C0392B]" : "text-[#d9d4cf]"}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const gallerySwiperRef = useRef<SwiperType | null>(null);
  const reviewSwiperRef = useRef<SwiperType | null>(null);

  const filtered = activeTab === "All" ? GALLERY : GALLERY.filter((g) => g.cat === activeTab);

  const scrollTo = (idx: number) => {
    gallerySwiperRef.current?.slideTo(idx);
  };

  const scrollReview = (dir: number) => {
    if (dir > 0) reviewSwiperRef.current?.slideNext();
    else reviewSwiperRef.current?.slidePrev();
  };
  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ background: "#faf9f7", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-[430px] relative overflow-hidden">

        {/* ── HERO ── */}
        <section className="relative pt-12 pb-8 px-6">
          {/* Faint red glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(192,57,43,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative flex flex-col items-center gap-4">
            {/* Logo circle */}
            <Image
              src={logo}
              alt="Pax Studio Logo"
              width={100}
              height={100}
              className="rounded-full object-cover border-2 border-[#C0392B]"
            />

            {/* Name & tagline */}
            <div className="text-center">
              <h1 className="text-[#1a1a1a] text-3xl tracking-[0.08em] font-cormorant font-light">
                PAX
                <span className="text-[#C0392B] mx-2">·</span>
                STUDIO
              </h1>
              <p className="text-[#aaa] text-xs tracking-[0.25em] uppercase mt-1">
                Wedding · Videography · Modeling
              </p>
            </div>

            {/* Stat chips */}
            <div className="flex gap-6 mt-1">
              {[
                { label: "Experience", val: "11+ yrs" },
                { label: "Happy Clients", val: "300+" },
                { label: "Projects", val: "500+" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="text-[#1a1a1a] font-semibold text-base">{s.val}</span>
                  <span className="text-[#bbb] text-[10px] tracking-widest uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Thin red divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-[#C0392B] to-transparent opacity-30" />

        {/* ── SERVICES ── */}
        <section className="px-6 py-7">
          <p className="text-[#bbb] text-[10px] tracking-[0.3em] uppercase mb-4">What We Do</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Camera, label: "Wedding Photography" },
              { icon: Video, label: "Videography" },
              { icon: Sparkles, label: "Modeling Shoots" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 py-4 rounded-xl"
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <Icon size={18} className="text-[#C0392B]" />
                <span className="text-[#666] text-[10px] text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY CAROUSEL ── */}
        <section className="py-2 pb-6">
          <div className="px-6 flex items-center justify-between mb-4">
            <p className="text-[#bbb] text-[10px] tracking-[0.3em] uppercase">Gallery</p>
            <div className="flex gap-2">
              <button
                onClick={() => scrollTo(Math.max(0, currentIndex - 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#ede9e4", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <ChevronLeft size={14} className="text-[#888]" />
              </button>
              <button
                onClick={() => scrollTo(Math.min(filtered.length - 1, currentIndex + 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#ede9e4", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <ChevronRight size={14} className="text-[#888]" />
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="px-6 flex gap-2 mb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActiveTab(c)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs transition-all duration-200"
                style={{
                  background: activeTab === c ? "#C0392B" : "#ffffff",
                  color: activeTab === c ? "#fff" : "#888",
                  border: activeTab === c ? "none" : "1px solid rgba(0,0,0,0.1)",
                  boxShadow: activeTab === c ? "0 4px 12px rgba(192,57,43,0.25)" : "none",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Swiper carousel */}
          <Swiper
            key={activeTab}
            onSwiper={(s) => (gallerySwiperRef.current = s)}
            onSlideChange={(s) => setCurrentIndex(s.activeIndex)}
            slidesPerView="auto"
            spaceBetween={12}
            slidesOffsetBefore={24}
            slidesOffsetAfter={24}
            grabCursor
          >
            {filtered.map((item, i) => (
              <SwiperSlide key={item.src} style={{ width: "72vw", maxWidth: 280 }}>
                <div
                  onClick={() => scrollTo(i)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer"
                  style={{
                    height: 360,
                    border: i === currentIndex ? "2px solid #C0392B" : "2px solid transparent",
                    boxShadow: i === currentIndex ? "0 8px 32px rgba(192,57,43,0.18)" : "0 2px 12px rgba(0,0,0,0.1)",
                    transition: "border 0.2s, box-shadow 0.2s",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    style={{ filter: i !== currentIndex ? "brightness(0.75) saturate(0.9)" : "brightness(1)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white/60 text-[9px] tracking-widest uppercase">{item.cat}</span>
                    <p
                      className="text-white text-lg leading-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Dot indicators */}
          <div className="flex gap-1.5 justify-center mt-4">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === currentIndex ? 20 : 6,
                  height: 6,
                  background: i === currentIndex ? "#C0392B" : "#ddd",
                }}
              />
            ))}
          </div>
        </section>

        {/* ── COMPANY DETAILS ── */}
        <section className="mx-6 mb-6 rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
          <div
            className="px-5 py-3 flex items-center gap-2"
            style={{ background: "linear-gradient(90deg, rgba(192,57,43,0.07) 0%, transparent 100%)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}
          >
            <div className="w-1.5 h-4 rounded-full bg-[#C0392B]" />
            <p className="text-[#999] text-xs tracking-[0.2em] uppercase">Contact & Location</p>
          </div>

          <div className="px-5 py-5 flex flex-col gap-4">
            <a href="tel:9567656199" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(192,57,43,0.08)" }}>
                <Phone size={16} className="text-[#C0392B]" />
              </div>
              <div>
                <p className="text-[#bbb] text-[9px] tracking-widest uppercase">Call us</p>
                <p className="text-[#1a1a1a] text-sm font-medium tracking-wide">+91 9567 656 199</p>
              </div>
            </a>

            <a
              href="https://maps.app.goo.gl/4aFQB5BTRCjbtDwX8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(192,57,43,0.08)" }}>
                <MapPin size={16} className="text-[#C0392B]" />
              </div>
              <div>
                <p className="text-[#bbb] text-[9px] tracking-widest uppercase">Studio Address</p>
                <p className="text-[#1a1a1a] text-sm leading-snug">Panayi Arakkayam</p>
                <p className="text-[#aaa] text-xs">Malappuram · 676509</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/pax__photography"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, rgba(255,221,85,0.15), rgba(200,55,171,0.15), rgba(91,81,216,0.15))" }}
              >
                <InstagramIcon size={16} />
              </div>
              <div>
                <p className="text-[#bbb] text-[9px] tracking-widest uppercase">Instagram</p>
                <p className="text-[#1a1a1a] text-sm">@pax__photography</p>
              </div>
            </a>
          </div>
        </section>

        {/* ── GOOGLE REVIEWS ── */}
        <section className="py-2 pb-6">
          <div className="px-6 flex items-center justify-between mb-1">
            <p className="text-[#bbb] text-[10px] tracking-[0.3em] uppercase">Google Reviews</p>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={10} className="fill-[#C0392B] text-[#C0392B]" />
                ))}
              </div>
              <span className="text-[#1a1a1a] text-xs font-semibold">5.0</span>
            </div>
          </div>

          <div className="px-6 mb-4">
            <div className="flex items-center gap-2">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                className="h-4 object-contain opacity-50"
              />
              <span className="text-[#ccc] text-[10px]">· Verified Reviews</span>
            </div>
          </div>

          <div className="flex items-center px-6 gap-2 mb-3">
            <button onClick={() => scrollReview(-1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
              <ChevronLeft size={14} className="text-[#aaa]" />
            </button>
            <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
            <span className="text-[#ccc] text-[10px]">{reviewIndex + 1} / {REVIEWS.length}</span>
            <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
            <button onClick={() => scrollReview(1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}>
              <ChevronRight size={14} className="text-[#aaa]" />
            </button>
          </div>

          <Swiper
            onSwiper={(s) => (reviewSwiperRef.current = s)}
            onSlideChange={(s) => setReviewIndex(s.activeIndex)}
            slidesPerView="auto"
            spaceBetween={16}
            slidesOffsetBefore={24}
            slidesOffsetAfter={24}
            grabCursor
          >
            {REVIEWS.map((r) => (
              <SwiperSlide key={r.name} style={{ width: "80vw", maxWidth: 300 }}>
                <div
                  className="rounded-2xl p-5 flex flex-col gap-3 h-full"
                  style={{
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #C0392B, #96281B)" }}
                    >
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-[#1a1a1a] text-sm font-medium">{r.name}</p>
                      <StarRating count={r.rating} />
                    </div>
                  </div>
                  <p className="text-[#888] text-xs leading-relaxed">"{r.text}"</p>
                  <p className="text-[#ccc] text-[9px] tracking-wide uppercase">{r.date}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* ── FOUNDER NOTE ── */}
        <section
          className="mx-6 mb-6 rounded-2xl px-5 py-5 flex gap-4 items-start"
          style={{
            background: "linear-gradient(135deg, rgba(192,57,43,0.06) 0%, rgba(192,57,43,0.02) 100%)",
            border: "1px solid rgba(192,57,43,0.15)",
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #C0392B, #96281B)" }}
          >
            P
          </div>
          <div>
            <p className="text-[#C0392B] text-[9px] tracking-[0.25em] uppercase mb-1">Founder</p>
            <p className="text-[#555] text-xs leading-relaxed">
              "We don't just take pictures — we craft stories that live forever."
            </p>
            <p
              className="text-[#aaa] text-xs mt-1.5"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
            >
              — Raheem Irambuzhi
            </p>
          </div>
        </section>

        {/* ── SOCIAL LINKS ── */}
        <section className="px-6 pb-10">
          <p className="text-[#bbb] text-[10px] tracking-[0.3em] uppercase mb-4">Find Us On</p>
          <div className="flex flex-col gap-3">
            {[
              {
                label: "Instagram",
                sub: "@pax__photography · 18.7K followers",
                icon: InstagramIcon,
                href: "https://www.instagram.com/pax__photography",
                bg: "linear-gradient(135deg, rgba(255,221,85,0.18), rgba(200,55,171,0.18), rgba(91,81,216,0.18))",
              },
              {
                label: "Facebook",
                sub: "Pax Photography",
                icon: FacebookIcon,
                href: "https://www.facebook.com/paxphotography/",
                bg: "linear-gradient(135deg, rgba(24,119,242,0.15), rgba(12,93,199,0.15))",
              },
              {
                label: "WhatsApp",
                sub: "+91 9567 656 199",
                icon: MessageCircle,
                href: "https://wa.me/919567656199",
                color: "#25D366",
                bg: "rgba(37,211,102,0.1)",
              },
            ].map(({ label, sub, icon: Icon, href, color, bg }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl px-4 py-3.5 group transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon size={18} style={color ? { color } : undefined} />
                </div>
                <div className="flex-1">
                  <p className="text-[#1a1a1a] text-sm font-medium">{label}</p>
                  <p className="text-[#aaa] text-xs">{sub}</p>
                </div>
                <ExternalLink size={13} className="text-[#ccc] group-hover:text-[#C0392B] transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pb-8 px-6 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-[#C0392B] to-transparent opacity-20 mb-6" />
          <div
            className="text-[#C0392B] text-lg tracking-[0.4em] uppercase mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            PAX
          </div>
          <p className="text-[#ccc] text-[10px] tracking-widest uppercase">Photography · Malappuram</p>
        </footer>

        {/* ── FLOATING CALL BUTTON ── */}
        <a
          href="tel:9567656199"
          className="fixed bottom-6 right-4 w-12 h-12 rounded-full flex items-center justify-center z-50"
          style={{
            background: "linear-gradient(135deg, #C0392B, #96281B)",
            boxShadow: "0 4px 20px rgba(192,57,43,0.4)",
          }}
        >
          <Phone size={20} className="text-white" />
        </a>
      </div>
    </div>
  );
}
