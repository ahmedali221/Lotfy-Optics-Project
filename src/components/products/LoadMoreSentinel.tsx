import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LoadMoreSentinelProps {
  hasMore: boolean;
  loading: boolean;
  failed: boolean;
  onLoadMore: () => void;
}

// Placed after a product grid: loads the next batch when it scrolls into view.
// The button is a fallback for manual loading and retries after a failed request,
// which pauses automatic loading so a broken connection is not hammered.
export function LoadMoreSentinel({ hasMore, loading, failed, onLoadMore }: LoadMoreSentinelProps) {
  const { language } = useLanguage();
  const t = (ar: string, en: string) => language === 'ar' ? ar : en;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasMore || loading || failed) return;
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) onLoadMore(); },
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, failed, onLoadMore]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="flex justify-center py-8">
      {loading ? (
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      ) : (
        <button
          onClick={onLoadMore}
          className="px-6 py-2 border border-border rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          {failed ? t('إعادة المحاولة', 'Retry') : t('عرض المزيد', 'Load more')}
        </button>
      )}
    </div>
  );
}
