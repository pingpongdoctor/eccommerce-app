'use client';
import { useEffect, useRef, useState, memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { cn } from '../utils/cs';

export const CategoryCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement | any>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event: any) {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      ref={cardRef}
      className={cn(
        'relative w-[40rem] overflow-hidden rounded-lg border border-white/[0.08] bg-[#1d1c20] p-8',
        className
      )}
    >
      {children}

      <div className="relative  flex h-40 items-center overflow-hidden">
        <motion.div
          style={{
            width: '100%',
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute z-20 bg-[#1d1c20]  will-change-transform"
        >
          <p
            style={{
              textShadow: '4px 4px 15px rgba(0,0,0,0.5)',
            }}
            className="to-neutral-300 bg-gradient-to-b from-white bg-clip-text py-10 text-base font-bold text-transparent text-white sm:text-[3rem]"
          >
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="via-neutral-800 absolute z-50 h-40 w-[8px] bg-gradient-to-b from-transparent to-transparent will-change-transform"
        ></motion.div>

        <div className=" overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="bg-[#9797a5] bg-clip-text py-10 text-base font-bold text-transparent sm:text-[3rem]">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge('mb-2 text-lg text-white', className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={twMerge('text-sm text-[#a9a9a9]', className)}>{children}</p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  const position = {
    top: `top-[${Math.random() * 100}%]`,
    left: `left-[${Math.random() * 100}%]`,
  };

  return (
    <div className="absolute inset-0">
      {[...Array(140)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute -left-20 top-[50%] z-[1] inline-block h-[2px] w-[2px] rounded-[50%] bg-white`}
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
