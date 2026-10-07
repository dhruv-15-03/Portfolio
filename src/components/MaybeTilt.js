import React from "react";
import Tilt from "react-parallax-tilt";
import { isLitePerf } from "./LitePerf";

/**
 * MaybeTilt — react-parallax-tilt on capable devices; a plain rounded wrapper
 * in lite mode, which skips the pointer/gyroscope listeners and 3D transforms.
 */
export default function MaybeTilt({ children, ...tiltProps }) {
  if (isLitePerf()) {
    return <div style={{ borderRadius: 24, overflow: "hidden" }}>{children}</div>;
  }
  return <Tilt {...tiltProps}>{children}</Tilt>;
}
