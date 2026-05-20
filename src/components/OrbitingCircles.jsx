export function OrbitingCircles({ children, iconSize = 54, radius = 150, reverse = false, speed = 18 }) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div
      className={`orbiting-circles ${reverse ? 'is-reverse' : ''}`}
      style={{
        '--orbit-size': `${radius * 2}px`,
        '--orbit-radius': `${radius}px`,
        '--orbit-icon-size': `${iconSize}px`,
        '--orbit-speed': `${speed}s`,
      }}
      aria-hidden="true"
    >
      <div className="orbiting-circles-ring"></div>
      {items.map((child, index) => (
        <div
          className="orbiting-circles-item"
          style={{ '--orbit-angle': `${(360 / items.length) * index}deg` }}
          key={index}
        >
          <div className="orbiting-circles-icon">{child}</div>
        </div>
      ))}
    </div>
  );
}
