import { systemColors } from '../data/systemColors';
import { Wordmark } from './Wordmark';

interface AppBarProps {
  /** Right-side controls (profile pill, wishlist, etc.). */
  actions?: React.ReactNode;
  /** Page-specific header content rendered under the bar (title, tagline). */
  children?: React.ReactNode;
  /** Edge to edge, for a page whose body is the whole viewport (the map):
   *  wordmark at the far left, actions at the far right, whatever the screen. */
  fullBleed?: boolean;
}

/**
 * The app bar every page shares: wordmark left, actions right, one container
 * width. The logo sits at the same size and the same x on every page and at
 * every breakpoint, which is what makes it read as one app rather than a set
 * of pages that happen to share a name. Page-specific header content (a
 * country title, a tagline) goes below in the same column, so the title's left
 * edge lines up with the logo whatever width the page body uses.
 */
export function AppBar({ actions, children, fullBleed = false }: AppBarProps) {
  const column = fullBleed ? 'px-4 md:px-6' : 'max-w-6xl mx-auto px-4';
  return (
    <header style={{ backgroundColor: systemColors.surface, borderBottom: `1px solid ${systemColors.border}` }}>
      <div className={`${column} pt-3 pb-3 md:pt-4 flex items-center justify-between gap-3`}>
        <Wordmark />
        {actions && (
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
            {actions}
          </div>
        )}
      </div>
      {children && (
        <div className={`${column} pb-4`}>
          {children}
        </div>
      )}
    </header>
  );
}
