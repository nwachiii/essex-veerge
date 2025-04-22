import React from "react";

export function TrackComp({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: "absolute",
        height: 6,
        zIndex: 1,
        marginTop: 33,
        backgroundColor: "#1d1d1d",
        borderRadius: 5,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {
      ...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */
      }
    />
  );
}
