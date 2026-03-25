import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'unknown-app';

  return (
    <footer className="absolute bottom-0 left-0 right-0 z-[999] bg-card/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>© {currentYear}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-destructive fill-destructive" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
