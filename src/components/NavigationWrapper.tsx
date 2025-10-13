'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useInternalLoading } from './InternalLoadingScreen';

interface NavigationWrapperProps {
  children: ReactNode;
}

export function NavigationWrapper({ children }: NavigationWrapperProps) {
  const router = useRouter();
  const { isLoading, startLoading, stopLoading, InternalLoadingScreen } = useInternalLoading();

  // Override router methods to show loading
  const originalPush = router.push;
  const originalReplace = router.replace;
  const originalBack = router.back;
  const originalForward = router.forward;

  router.push = (href: string, options?: { scroll?: boolean; shallow?: boolean }) => {
    startLoading();
    return originalPush(href, options);
  };

  router.replace = (href: string, options?: { scroll?: boolean; shallow?: boolean }) => {
    startLoading();
    return originalReplace(href, options);
  };

  router.back = () => {
    startLoading();
    return originalBack();
  };

  router.forward = () => {
    startLoading();
    return originalForward();
  };

  return (
    <>
      {children}
      <InternalLoadingScreen onComplete={stopLoading} />
    </>
  );
}

// Enhanced Link component with loading
interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LoadingLink({ href, children, className, onClick }: LoadingLinkProps) {
  const { startLoading } = useInternalLoading();

  const handleClick = () => {
    startLoading();
    onClick?.();
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
