import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Sun,
  Smile,
  Bell,
  Flower2,
  Gift,
  Stars,
  MessageCircleHeart,
  Crown,
  X,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";

import { reasonsData } from "../data/reasons";

import "./Reasons.css";

// Icon mapping
const iconMap = {
  Sparkles,
  Heart,
  Sun,
  Smile,
  Bell,
  Flower2,
  Gift,
  Stars,
  MessageCircleHeart,
  Crown,
};

export default function Reasons() {
  const [selectedReason, setSelectedReason] = useState(null);
  const [readReasons, setReadReasons] = useState([]);

  const cardRefs = useRef([]);

  // Lock background scrolling when modal opens
  useEffect(() => {
    if (selectedReason) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedReason]);

  // Close modal using Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }

      if (e.key === "ArrowRight") {
        nextReason();
      }

      if (e.key === "ArrowLeft") {
        previousReason();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const openReason = (reason, index) => {
    setSelectedReason({ ...reason, index });

    setReadReasons((prev) =>
      prev.includes(reason.id) ? prev : [...prev, reason.id]
    );
  };

  const closeModal = () => {
    if (selectedReason) {
      const index = selectedReason.index;
      setSelectedReason(null);

      setTimeout(() => {
        cardRefs.current[index]?.focus();
      }, 100);
    }
  };

  const nextReason = () => {
    if (!selectedReason) return;

    const nextIndex = (selectedReason.index + 1) % reasonsData.length;

    openReason(reasonsData[nextIndex], nextIndex);
  };

  const previousReason = () => {
    if (!selectedReason) return;

    const previousIndex =
      (selectedReason.index - 1 + reasonsData.length) %
      reasonsData.length;

    openReason(reasonsData[previousIndex], previousIndex);
  };

  const SelectedIcon = selectedReason
    ? iconMap[selectedReason.icon] || Heart
    : Heart;

  return (
    <section className="reasons-section">

      {/* Background Effects */}
      <div className="reasons-background">
        <div className="reason-glow glow-one"></div>
        <div className="reason-glow glow-two"></div>
        <div className="reason-glow glow-three"></div>
      </div>

      {/* Header */}
      <motion.div
        className="reasons-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="reasons-subtitle">
          A LITTLE SOMETHING FROM MY HEART
        </span>

        <h1>
          10 Reasons Why You're
          <span> My Princess ❤️</span>
        </h1>

        <p>
          There are countless reasons why you're special to me.
          Here are just ten of them.
        </p>
      </motion.div>

      {/* Progress */}
      <div className="reasons-progress">
        <div className="progress-info">
          <span>Little secrets discovered</span>
          <span>
            {readReasons.length} / 10 ❤️
          </span>
        </div>

        <div className="progress-track">
          <motion.div
            className="progress-fill"
            animate={{
              width: `${(readReasons.length / 10) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="reasons-grid">

        {reasonsData.map((reason, index) => {
          const Icon = iconMap[reason.icon] || Heart;

          const isRead = readReasons.includes(reason.id);

          return (
            <motion.button
              type="button"
              key={reason.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`reason-card ${isRead ? "reason-card-read" : ""
                }`}
              onClick={() => openReason(reason, index)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
              }}
              whileHover={{
                y: -8,
                scale: 1.025,
              }}
              whileTap={{ scale: 0.97 }}
              aria-label={`Read reason ${reason.id}: ${reason.title}`}
            >

              <div className="reason-card-top">

                <span className="reason-number">
                  Reason #{reason.id}
                </span>

                <Icon size={20} />

              </div>

              <div className="reason-card-content">

                <h3>{reason.title}</h3>

                <p className="reason-card-message">
                  "{reason.message}"
                </p>

              </div>

              <div className="reason-card-footer">

                {isRead ? (
                  <span>
                    <Heart size={13} fill="currentColor" />
                    Already discovered
                  </span>
                ) : (
                  <span>
                    <Sparkles size={13} />
                    Tap to discover ❤️
                  </span>
                )}

              </div>

            </motion.button>
          );
        })}

      </div>

      {/* Final Unlock Message */}
      <AnimatePresence>
        {readReasons.length === 10 && (
          <motion.div
            className="all-reasons-unlocked"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles size={28} />

            <h2>You've discovered all 10 reasons! ❤️</h2>

            <p>
              Princess, these are just 10 reasons...
              but there are countless little things about you
              that make me fall for you every day.

              I could write a thousand more and still
              wouldn't run out. ❤️
            </p>

            <span>With all my love, for my Princess.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL ================= */}

      <AnimatePresence>
        {selectedReason && (
          <motion.div
            className="reason-modal-overlay"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              className="reason-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="reason-modal-title"
              onClick={(e) => e.stopPropagation()}
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 30,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >

              {/* Close Button */}
              <button
                className="reason-modal-close"
                onClick={closeModal}
                aria-label="Close"
                autoFocus
              >
                <X size={22} />
              </button>

              {/* Modal Content */}
              <div className="reason-modal-content">

                <div className="modal-icon">
                  <SelectedIcon size={30} />
                </div>

                <span className="modal-reason-number">
                  REASON #{selectedReason.id}
                </span>

                <h2 id="reason-modal-title">
                  {selectedReason.title}
                </h2>

                <div className="modal-divider">
                  <span>♥</span>
                </div>

                <h3 className="modal-main-message">
                  "{selectedReason.message}"
                </h3>

                <p className="modal-description">
                  {selectedReason.subtext}
                </p>

                <div className="modal-love-footer">
                  <Heart size={16} fill="currentColor" />
                  With all my love, for my Princess
                  <Heart size={16} fill="currentColor" />
                </div>

              </div>

              {/* Navigation */}
              <div className="modal-navigation">

                <button
                  onClick={previousReason}
                  className="modal-nav-btn"
                  aria-label="Previous reason"
                >
                  <ChevronLeft size={19} />
                  Previous
                </button>

                <span>
                  {selectedReason.index + 1} / 10
                </span>

                <button
                  onClick={nextReason}
                  className="modal-nav-btn"
                  aria-label="Next reason"
                >
                  Next
                  <ChevronRight size={19} />
                </button>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}