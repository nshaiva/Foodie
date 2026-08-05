import { Link } from 'react-router-dom';
import { systemColors } from '../data/systemColors';

interface WordmarkProps {
  /** Tailwind size class for the wordmark text. */
  className?: string;
}

/** The tomato plate dot that ends the wordmark — solid center, mid ring, pale rim. */
export function WordmarkDot() {
  return (
    <span
      aria-hidden
      className="inline-block rounded-full"
      style={{
        width: '0.34em',
        height: '0.34em',
        marginLeft: '0.08em',
        background: `radial-gradient(circle, ${systemColors.tomato} 0 36%, ${systemColors.tomato}8C 36% 60%, ${systemColors.tomato}33 60% 100%)`,
      }}
    />
  );
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
