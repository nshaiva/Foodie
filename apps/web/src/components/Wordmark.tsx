import { Link } from 'react-router-dom';
import { systemColors } from '../data/systemColors';

interface WordmarkProps {
  /** Tailwind size class for the wordmark text. */
  className?: string;
}

/** The brand plate dot — solid center, mid ring, pale rim — in any color/size. */
export function PlateDot({ color, size = '0.34em', className = '', style }: {
  color: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0 36%, ${color}8C 36% 60%, ${color}33 60% 100%)`,
        ...style,
      }}
    />
  );
}

/** The tomato plate dot that ends the wordmark. */
export function WordmarkDot() {
  return <PlateDot color={systemColors.tomato} style={{ marginLeft: '0.08em' }} />;
}

/** The "foodie." brand wordmark, linking back to the home page. */
export function Wordmark({ className = 'text-2xl' }: WordmarkProps) {
  return (
    <Link
      to="/"
      className={`wordmark font-bold lowercase leading-none inline-block ${className}`}
      style={{ color: systemColors.navy }}
    >
      foodie<WordmarkDot />
    </Link>
  );
}
