import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { journeyData } from '../data/journey';
import { Sparkles, Heart, Clock, Calendar, Crown, MessageCircle, Smile, Camera, Activity } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Heart,
  Clock,
  Calendar,
  Crown,
  MessageCircle,
  Smile,
  Camera,
};

export default function OurJourney() {
  const { durationMonths, milestones, relationshipStartDate } = journeyData;

  // Calculate start date: either custom from journeyData or dynamically 5 months ago
  const startDate = useMemo(() => {
    if (relationshipStartDate) {
      const parsed = new Date(relationshipStartDate);
      if (!isNaN(parsed.getTime()) && parsed.getTime() < Date.now()) {
        return parsed;
      }
    }
    // Default: exactly 5 months ago from current time
    const d = new Date();
    d.setMonth(d.getMonth() - 5);
    return d;
  }, [relationshipStartDate]);

  // Live timer state updating every second
  const [liveTime, setLiveTime] = useState(() => {
    const now = new Date();
    const diff = Math.max(0, now.getTime() - startDate.getTime());
    const totalSecs = Math.floor(diff / 1000);
    const totalMins = Math.floor(totalSecs / 60);
    const totalHrs = Math.floor(totalMins / 60);
    const totalDys = Math.floor(totalHrs / 24);

    return {
      totalHours: totalHrs,
      totalDays: totalDys,
      days: totalDys % 30,
      hours: totalHrs % 24,
      minutes: totalMins % 60,
      seconds: totalSecs % 60,
    };
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());
      const totalSecs = Math.floor(diff / 1000);
      const totalMins = Math.floor(totalSecs / 60);
      const totalHrs = Math.floor(totalMins / 60);
      const totalDys = Math.floor(totalHrs / 24);

      setLiveTime({
        totalHours: totalHrs,
        totalDays: totalDys,
        days: totalDys % 30,
        hours: totalHrs % 24,
        minutes: totalMins % 60,
        seconds: totalSecs % 60,
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-center z-10">
      {/* Chapter Title Badge */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-blush/25 text-xs uppercase tracking-widest text-soft-rose mb-4"
        >
          <Heart size={13} className="text-pink-400 fill-pink-400" />
          <span>Chapter 2: Our Journey</span>
          <Heart size={13} className="text-pink-400 fill-pink-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair text-3xl sm:text-5xl md:text-6xl text-cream font-bold mb-4"
        >
          Five Months, Countless Little Feelings
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-cursive text-4xl sm:text-5xl text-blush text-glow"
        >
          5 Months of Us ❤️
        </motion.div>
      </div>

      {/* Relationship Stats Row with LIVE INCREASING HOURS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8"
      >
        {/* Card 1: Months Together */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl text-center border border-blush/20 hover:border-blush/40 transition-all hover:scale-105 flex flex-col justify-between">
          <div>
            <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-blush mb-1">
              {durationMonths}
              <span className="text-lg text-soft-rose"> Months</span>
            </div>
            <div className="text-xs text-cream/70 font-medium">Months Together</div>
          </div>
          <div className="text-[10px] text-soft-rose/80 font-mono mt-2 pt-1 border-t border-white/5">
            ~{liveTime.totalDays} Days of Love
          </div>
        </div>

        {/* Card 2: Smiles Shared */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl text-center border border-blush/20 hover:border-blush/40 transition-all hover:scale-105 flex flex-col justify-between">
          <div>
            <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-blush mb-1">
              1000<span className="text-lg text-soft-rose">+</span>
            </div>
            <div className="text-xs text-cream/70 font-medium">Smiles Shared</div>
          </div>
          <div className="text-[10px] text-soft-rose/80 font-mono mt-2 pt-1 border-t border-white/5">
            Every Single Day ✨
          </div>
        </div>

        {/* Card 3: LIVE MAGICAL HOURS (INCREASING LIVE IN REAL TIME!) */}
        <div className="glass-panel-glow p-4 sm:p-5 rounded-2xl text-center border border-pink-400/50 transition-all hover:scale-105 relative overflow-hidden bg-gradient-to-b from-white/10 to-pink-500/10 shadow-lg shadow-pink-500/15 flex flex-col justify-between">
          {/* Live indicator badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-emerald-950/60 border border-emerald-400/30 px-1.5 py-0.5 rounded-full text-[9px] text-emerald-300 font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE</span>
          </div>

          <div>
            <div className="font-playfair text-2xl sm:text-3xl font-black text-blush text-glow tracking-tight mb-0.5">
              {liveTime.totalHours.toLocaleString()}
              <span className="text-sm sm:text-base text-soft-rose font-bold"> hrs</span>
            </div>
            <div className="text-xs text-cream/90 font-semibold">Magical Hours</div>
          </div>

          {/* Real-time ticking minutes & seconds */}
          <div className="text-[11px] font-mono text-amber-200/90 font-medium mt-1.5 pt-1 border-t border-white/10 flex items-center justify-center gap-1">
            <Activity size={10} className="text-emerald-400 animate-pulse" />
            <span>+{liveTime.minutes}m {String(liveTime.seconds).padStart(2, '0')}s</span>
          </div>
        </div>

        {/* Card 4: Love For You */}
        <div className="glass-panel p-4 sm:p-5 rounded-2xl text-center border border-blush/20 hover:border-blush/40 transition-all hover:scale-105 flex flex-col justify-between">
          <div>
            <div className="font-playfair text-2xl sm:text-3xl font-extrabold text-blush mb-1">
              100<span className="text-lg text-soft-rose">%</span>
            </div>
            <div className="text-xs text-cream/70 font-medium">Love For You</div>
          </div>
          <div className="text-[10px] text-soft-rose/80 font-mono mt-2 pt-1 border-t border-white/5">
            Infinite & Growing ❤️
          </div>
        </div>
      </motion.div>

      {/* DEDICATED LIVE RELATIONSHIP CLOCK BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel px-4 py-5 sm:p-6 rounded-3xl border border-blush/30 shadow-xl mb-12 text-center max-w-3xl mx-auto w-full relative overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="text-xs uppercase tracking-widest text-soft-rose font-bold">
            Live Time Spent Together With Princess Meenu
          </span>
        </div>

        {/* Real-time Ticking Countdown / Upcounter Blocks */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-xl mx-auto my-3">
          {/* Months */}
          <div className="bg-white/5 border border-blush/20 rounded-xl p-2 sm:p-3">
            <span className="font-playfair text-xl sm:text-3xl font-black text-blush block">
              {String(durationMonths).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cream/60 font-medium">
              Months
            </span>
          </div>

          {/* Days */}
          <div className="bg-white/5 border border-blush/20 rounded-xl p-2 sm:p-3">
            <span className="font-playfair text-xl sm:text-3xl font-black text-blush block">
              {String(liveTime.totalDays).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cream/60 font-medium">
              Days
            </span>
          </div>

          {/* Total Live Hours */}
          <div className="bg-gradient-to-b from-pink-500/20 to-purple-500/20 border border-pink-400/40 rounded-xl p-2 sm:p-3 shadow-inner">
            <span className="font-playfair text-xl sm:text-3xl font-black text-blush text-glow block">
              {liveTime.totalHours.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-amber-200 font-semibold">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="bg-white/5 border border-blush/20 rounded-xl p-2 sm:p-3">
            <span className="font-playfair text-xl sm:text-3xl font-black text-blush block">
              {String(liveTime.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cream/60 font-medium">
              Mins
            </span>
          </div>

          {/* Live Ticking Seconds */}
          <div className="bg-white/5 border border-blush/20 rounded-xl p-2 sm:p-3 relative overflow-hidden">
            <span className="font-playfair text-xl sm:text-3xl font-black text-pink-300 block animate-soft-pulse">
              {String(liveTime.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-cream/60 font-medium">
              Secs
            </span>
          </div>
        </div>

        <p className="font-poppins text-xs text-cream/70 italic mt-3">
          "Every second with you is my favourite second. Loving you in real time, hour by hour."
        </p>
      </motion.div>

      {/* Editable Timeline */}
      <div className="relative border-l-2 border-blush/30 ml-4 sm:ml-32 md:ml-40 pl-6 sm:pl-10 space-y-10 mb-16">
        {milestones.map((milestone, index) => {
          const IconComponent = ICON_MAP[milestone.icon] || Heart;
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Dot on Timeline */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-deep-purple border-2 border-blush flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:border-pink-400 transition-all">
                <div className="w-2 h-2 rounded-full bg-soft-rose animate-ping" />
              </div>

              {/* Milestone Card */}
              <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-blush/20 hover:border-blush/45 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider text-soft-rose font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-blush/15">
                    {milestone.badge}
                  </span>
                  <span className="text-xs text-cream/60 flex items-center gap-1">
                    <Sparkles size={12} className="text-amber-200" />
                    {milestone.date}
                  </span>
                </div>

                <h4 className="font-playfair text-xl sm:text-2xl font-semibold text-cream mb-2 group-hover:text-blush transition-colors flex items-center gap-2">
                  <IconComponent size={20} className="text-blush" />
                  <span>{milestone.title}</span>
                </h4>

                <p className="font-poppins text-xs sm:text-sm text-cream/80 leading-relaxed mb-3">
                  {milestone.description}
                </p>

                <div className="text-[11px] font-semibold text-soft-rose/90">
                  {milestone.tag}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
