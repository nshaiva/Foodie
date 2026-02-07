import { Link } from 'react-router-dom';
import type { ColorPalette } from '../../data/types';

interface CountryHeaderProps {
  name: string;
  capital: string;
  region: string;
  colors: ColorPalette;
}

export function CountryHeader({ name, capital, region, colors }: CountryHeaderProps) {
  return (
    <header
      className="border-b"
      style={{
        backgroundColor: colors.primary,
        borderColor: `${colors.primary}40`
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Link
          to="/"
          className="text-sm mb-2 inline-block opacity-80 hover:opacity-100 transition-opacity"
          style={{ color: colors.background }}
        >
          ← Back to all countries
        </Link>
        <h1 className="text-3xl font-bold" style={{ color: colors.background }}>
          {name}
        </h1>
        <p className="mt-1 opacity-90" style={{ color: colors.background }}>
          {capital} · {region}
        </p>
      </div>
    </header>
  );
}
