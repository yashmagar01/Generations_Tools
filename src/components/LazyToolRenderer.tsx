import { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load individual tool components
const QRCodeGenerator = lazy(() => import('./tools/QRCodeGenerator'));
const ColorPalette = lazy(() => import('./tools/ColorPalette'));
const LoremIpsum = lazy(() => import('./tools/LoremIpsum'));
const RandomNumber = lazy(() => import('./tools/RandomNumber'));
const PasswordGenerator = lazy(() => import('./tools/PasswordGenerator'));
const CSSGradient = lazy(() => import('./tools/CSSGradient'));
const ProfileGenerator = lazy(() => import('./tools/ProfileGenerator'));
const PlaceholderImage = lazy(() => import('./tools/PlaceholderImage'));
const UniqueID = lazy(() => import('./tools/UniqueID'));
const RandomQuote = lazy(() => import('./tools/RandomQuote'));
const HashtagGenerator = lazy(() => import('./tools/HashtagGenerator'));
const WouldYouRather = lazy(() => import('./tools/WouldYouRather'));

interface LazyToolRendererProps {
  activeGenerator: string;
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-10 w-32" />
  </div>
);

const LazyToolRenderer = ({ activeGenerator }: LazyToolRendererProps) => {
  const renderTool = () => {
    switch (activeGenerator) {
      case 'qr-code':
        return <QRCodeGenerator />;
      case 'color-palette':
        return <ColorPalette />;
      case 'lorem-ipsum':
        return <LoremIpsum />;
      case 'random-number':
        return <RandomNumber />;
      case 'password':
        return <PasswordGenerator />;
      case 'css-gradient':
        return <CSSGradient />;
      case 'profile':
        return <ProfileGenerator />;
      case 'placeholder':
        return <PlaceholderImage />;
      case 'unique-id':
        return <UniqueID />;
      case 'quotes':
        return <RandomQuote />;
      case 'hashtags':
        return <HashtagGenerator />;
      case 'would-you-rather':
        return <WouldYouRather />;
      default:
        return <QRCodeGenerator />;
    }
  };

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {renderTool()}
    </Suspense>
  );
};

export default LazyToolRenderer;