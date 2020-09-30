import { useState, useMemo, useEffect } from 'react';
import { Arrow } from './arrow';
import React from 'react';

type LinksInPage = [HTMLAnchorElement, Element][];

export const Arrows = () => {
  const [linksInPage, setLinksInPage] = useState<LinksInPage>([]);
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

    observer.observe(document.body, config);

    return () => {
      observer.disconnect();
    };
  });

  useMemo(() => {
    const links = document.querySelectorAll('a');
    const lip: LinksInPage = [];

    links.forEach(
      (link) => {
        const href = link.getAttribute('href');

        if (href && href.match(/^#/)) {
          const id = href.replace(/^#/, '');
          const destination = document.querySelector(`[id="${id}"]`);

          if (destination) {
            lip.push([link, destination]);
          }
        }
      },
      [rev]
    );

    setLinksInPage(lip);
  }, [rev]);

  return (
    <>
      {linksInPage.map((l) => (
        <Arrow linkInPage={l} />
      ))}
    </>
  );
};
