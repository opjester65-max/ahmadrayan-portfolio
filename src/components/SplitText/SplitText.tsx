import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // Delay between characters in ms
  duration?: number; // Duration of animation per character in seconds
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify' | string;
  tag?: string;
  onLetterAnimationComplete?: () => void;
}

const SplitTextComponent: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 30, // Default crisp stagger in ms
  duration = 0.8, // Elegant, professional snappiness
  ease = 'power4.out',
  splitType = 'chars',
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  threshold = 0.05,
  rootMargin = '-50px',
  textAlign = 'left',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = containerRef.current;

      // Clean, lightweight margin parsing
      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      // Target characters, falling back to words
      const targets = el.querySelectorAll('.split-char');
      const fallbackTargets = targets.length > 0 ? targets : el.querySelectorAll('.split-word');
      
      if (fallbackTargets.length === 0) return;

      const tween = gsap.fromTo(
        fallbackTargets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.1
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: 'transform, opacity',
          force3D: true
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        tween.kill();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: containerRef
    }
  );

  const renderContent = () => {
    if (!text) return null;

    const words = text.split(' ');
    return words.map((word, wordIdx) => {
      const chars = word.split('');
      
      const wordContent = chars.map((char, charIdx) => (
        <span
          key={charIdx}
          className="split-char inline-block"
          style={{
            willChange: 'transform, opacity'
          }}
        >
          {char}
        </span>
      ));

      return (
        <span
          key={wordIdx}
          className="split-word inline-block whitespace-nowrap"
          style={{
            marginRight: '0.24em'
          }}
        >
          {wordContent}
        </span>
      );
    });
  };

  const style: React.CSSProperties = {
    textAlign: textAlign as any,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };
  const classes = `split-parent ${className}`.trim();
  const Tag = (tag || 'p') as any;

  return (
    <Tag ref={containerRef} style={style} className={classes}>
      {renderContent()}
    </Tag>
  );
};

export const SplitText = React.memo(SplitTextComponent);
export default SplitText;
