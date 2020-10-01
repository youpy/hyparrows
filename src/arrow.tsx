import { getBoxToBoxArrow } from 'perfect-arrows';
import React from 'react';
import { Rect } from './interfaces';

interface Props {
  p1: Rect;
  p2: Rect;
}

export const Arrow = React.memo(
  (props: Props) => {
    const { p1, p2 } = props;
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
  },
  (a, b) => {
    return (
      a.p1.x === b.p1.x &&
      a.p1.y === b.p1.y &&
      a.p1.w === b.p1.w &&
      a.p1.h === b.p1.h &&
      a.p2.x === b.p2.x &&
      a.p2.y === b.p2.y &&
      a.p2.w === b.p2.w &&
      a.p2.h === b.p2.h
    );
  }
);
