self.onmessage = (e: MessageEvent) => {
  const { data, width, height, depth, dx, dy, dz } = e.data;
  
  const inPlane = (dx + dy) / 2;
  const targetDz = inPlane;
  const scaleZ = dz / targetDz;
  const newDepth = Math.round(depth * scaleZ);
  const newData = new Int16Array(width * height * newDepth);
  const sliceSize = width * height;

  for (let z = 0; z < newDepth; z++) {
    const origZFloatVal = (z / (newDepth - 1)) * (depth - 1);
    const zIdx0 = Math.floor(origZFloatVal);
    const zIdx1 = Math.min(depth - 1, zIdx0 + 1);
    const zWeight = origZFloatVal - zIdx0;

    const offset0 = zIdx0 * sliceSize;
    const offset1 = zIdx1 * sliceSize;
    const newOffset = z * sliceSize;

    for (let i = 0; i < sliceSize; i++) {
      const val0 = data[offset0 + i];
      const val1 = data[offset1 + i];
      newData[newOffset + i] = Math.round(val0 * (1 - zWeight) + val1 * zWeight);
    }
  }

  self.postMessage({ data: newData, depth: newDepth, dz: targetDz }, [newData.buffer] as any);
};
export {};
