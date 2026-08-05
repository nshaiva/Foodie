import { useCarousel } from './CarouselProvider';

interface Tab {
  label: string;
  icon?: string;
}

interface CarouselTabsProps {
  tabs: Tab[];
  primaryColor: string;
  textColor: string;
}

export function CarouselTabs({ tabs, primaryColor, textColor }: CarouselTabsProps) {
  const { selectedIndex, scrollTo } = useCarousel();

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tabs.map((tab, index) => {
        const isActive = selectedIndex === index;
        return (
          <button
            key={tab.label}
            onClick={() => scrollTo(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isActive
                ? 'text-white shadow-sm transition-all'
                : 'btn-press bg-white/80'
            }`}
            style={{
              backgroundColor: isActive ? primaryColor : undefined,
              color: isActive ? 'white' : textColor,
              borderWidth: isActive ? 0 : 1,
              borderColor: `${primaryColor}30`,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = `${primaryColor}18`;
                e.currentTarget.style.borderColor = `${primaryColor}60`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.borderColor = `${primaryColor}30`;
              }
            }}
          >
            {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
