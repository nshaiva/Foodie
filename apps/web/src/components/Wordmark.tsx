import { Link } from 'react-router-dom';
import { systemColors } from '../data/systemColors';

interface WordmarkProps {
  /** Tailwind size class for the wordmark text. */
  className?: string;
}

/** The "foodie." brand wordmark, linking back to the home page. */
export function Wordmark({ className = 'text-2xl' }: WordmarkProps) {
  return (
    <Link
      to="/"
      className={`wordmark font-bold lowercase leading-none inline-block ${className}`}
      style={{ color: systemColors.navy }}
    >
      foodie<span style={{ color: systemColors.tomato }}>.</span>
    </Link>
  );
}
