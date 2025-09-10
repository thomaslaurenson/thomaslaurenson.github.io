import { useScrollTrigger } from '@mui/material';

export const useScrollToTop = (threshold = 100) => {
  const trigger = useScrollTrigger({
    threshold,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { trigger, scrollToTop };
};
