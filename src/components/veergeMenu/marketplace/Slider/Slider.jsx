import {
  Slider as CSlider,
  Rail,
  Handles,
  Tracks,
} from "react-compound-slider";
import { FilterHandle } from "./components/handle";
import { TrackComp } from "./components/track";

const sliderStyle = {
  // Give the slider some width
  position: "relative",
  width: "100%",
  height: 80,
  // backgroundColor: '#1d1d1d'
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 2,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: "#1d1d1d77",
};

export const FilterSlider = ({ domain, selectedRange, onRangeUpdate }) => {
  return (
    <CSlider
      rootStyle={sliderStyle}
      step={1000}
      mode={2}
      domain={domain}
      values={selectedRange}
      onUpdate={onRangeUpdate}
    >
      <Rail>
        {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <FilterHandle
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }) => (
              <TrackComp
                key={id}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            ))}
          </div>
        )}
      </Tracks>
    </CSlider>
  );
};
