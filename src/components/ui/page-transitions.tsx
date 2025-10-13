'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggeredChildren({ 
  children, 
  className = '', 
  staggerDelay = 0.1 
}: StaggeredChildrenProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggeredItemProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function StaggeredItem({ 
  children, 
  className = '', 
  direction = 'up' 
}: StaggeredItemProps) {
  const getVariants = () => {
    const distance = 30;
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: getVariants(),
        visible: {
          y: 0,
          x: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
