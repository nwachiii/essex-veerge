import React from 'react';

import {useWindowSize} from '@react-hook/window-size';

export default function useLagRadar() {
  const [width, height] = useWindowSize();

  React.useEffect(() => {
    return lagRadar({
      frames: 60, // number of frames to draw, more = worse performance
      speed: 0.0017, // how fast the sweep moves (rads per ms)
      size: Math.min(width, height) / 3, // outer frame px
      inset: 3, // circle inset px
      parent: document.body, // DOM node to attach to
    });
  }, [width, height]);
}
