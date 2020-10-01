import { getBoxToBoxArrow } from 'perfect-arrows';
import React from 'react';

interface Props {
  linkInPage: [HTMLAnchorElement, Element];
}

export const Arrow = (props: Props) => {
  const {
    linkInPage: [a, el],
  } = props;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const r1 = a.getBoundingClientRect();
  const r2 = el.getBoundingClientRect();
  const p1 = {
    x: r1.x + scrollX,
    y: r1.y + scrollY,
    w: r1.width,
    h: r1.height,
  };
  const p2 = {
    x: r2.x + scrollX,
    y: r2.y + scrollY,
    w: r2.width,
    h: r2.height,
  };
  const arrow = getBoxToBoxArrow(
    p1.x,
    p1.y,
    p1.w,
    p1.h,
    p2.x,
    p2.y,
    p2.w,
    p2.h,
    {
      bow: 0.1,
      stretch: 0.1,
      stretchMin: 40,
      stretchMax: 420,
      padStart: 0,
      padEnd: 12,
      flip: false,
      straights: true,
    }
  );
  const [sx, sy, cx, cy, ex, ey, ae] = arrow;
  const endAngleAsDegrees = ae * (180 / Math.PI);
  const maxX = Math.max(p1.x + p1.w, p2.x + p2.w);
  const maxY = Math.max(p1.y + p1.h, p2.y + p2.h);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
      }}
    >
      <svg
        viewBox={`0 0 ${maxX} ${maxY}`}
        style={{
          width: maxX,
          height: maxY,
        }}
        stroke="#000"
        fill="#000"
        strokeWidth={3}
      >
        <circle cx={sx} cy={sy} r={3} />
        <path d={`M${sx},${sy} Q${cx},${cy} ${ex},${ey}`} fill="none" />
        <polygon
          points="0,-4 8,0, 0,4"
          transform={`translate(${ex},${ey}) rotate(${endAngleAsDegrees})`}
        />
      </svg>
    </div>
  );
};
