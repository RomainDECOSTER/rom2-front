import { ArrayUtils } from './array';

const MathUtils = {
  divideLineByNSpots: (lineCoordinates, n, callback) => {
    const ax = lineCoordinates[0][0];
    const ay = lineCoordinates[0][1];
    const bx = lineCoordinates[1][0];
    const by = lineCoordinates[1][1];
    const xOffset = (bx - ax) / n;
    const yOffset = (by - ay) / n;

    ArrayUtils.loop(n, i => {
      const px = ax + xOffset / 2 + xOffset * i;
      const py = ay + yOffset / 2 + yOffset * i;

      callback(px, py, i);
    });
  },
};

export { MathUtils };
