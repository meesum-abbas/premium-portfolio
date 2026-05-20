import { createElement } from 'react';

function ButtonIcon({ icon }) {
  if (icon === 'download') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 3v11" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 20h14" />
      </svg>
    );
  }

  if (icon === 'grid') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1.5" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" />
        <rect x="14" y="14" width="6" height="6" rx="1.5" />
      </svg>
    );
  }

  if (icon === 'mail') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <path d="m5 8 7 5 7-5" />
      </svg>
    );
  }

  if (icon === 'send') {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="m4 11 16-7-7 16-2-7-7-2Z" />
        <path d="m11 13 4-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function InteractiveHoverButton({ as: Element = 'a', children, className = '', icon = 'arrow', ...props }) {
  return createElement(
    Element,
    {
      className: `interactive-hover-button ${className}`.trim(),
      ...props,
    },
    <span className="interactive-hover-label">{children}</span>,
    <span className={`interactive-hover-icon icon-${icon}`} aria-hidden="true">
      <ButtonIcon icon={icon} />
    </span>,
  );
}
