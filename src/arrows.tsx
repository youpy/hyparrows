import { useState, useMemo, useEffect } from 'react';
import React from 'react';
import { Arrow } from './arrow';
import { Rect } from './interfaces';

interface Props {
  root: Element;
}

interface BothEndsOfArrow {
  from: Rect;
  to: Rect;
}

const elementToRect = (
  element: Element,
  scrollX: number,
  scrollY: number
): Rect => {
  const r = element.getBoundingClientRect();

  return {
    x: r.x + scrollX,
    y: r.y + scrollY,
    w: r.width,
    h: r.height,
  };
};

export const Arrows = ({ root }: Props) => {
  const [bothEndsOfArrows, setBothEndsOfArrows] = useState<BothEndsOfArrow[]>(
    []
  );
  const [rev, setRev] = useState<number>(0);

  useEffect(() => {
    const observer = new MutationObserver((_mutations) => {
      setRev(rev + 1);

      // _mutations.forEach((mutation) => {
      //   console.log(mutation.type);
      // });
    });

    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    };

    observer.observe(root, config);

    return () => {
      observer.disconnect();
    };
  });

  useMemo(() => {
    const links = root.querySelectorAll('a');
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const items: BothEndsOfArrow[] = [];

    links.forEach(
      (link) => {
        const href = link.getAttribute('href');

        if (href && href.match(/^#/)) {
          const id = href.replace(/^#/, '');
          const destination = root.querySelector(`[id="${id}"]`);

          if (destination) {
            items.push({
              from: elementToRect(link, scrollX, scrollY),
              to: elementToRect(destination, scrollX, scrollY),
            });
          }
        }
      },
      [rev]
    );

    setBothEndsOfArrows(items);
  }, [rev]);

  return (
    <>
      {bothEndsOfArrows.map(({ from, to }) => (
        <Arrow p1={from} p2={to} />
      ))}
    </>
  );
};
