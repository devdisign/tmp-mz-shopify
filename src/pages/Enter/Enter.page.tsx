import type { FunctionComponent } from "preact";
import { useMemo, useState, useEffect, useCallback } from "preact/hooks";
import { FaCheckCircle } from "react-icons/fa";
import ReactPlayer from "react-player/vimeo";

import Form from "@components/Form";
import { Button } from "@components/styled";

import { useBoolean, useHistoryUrl } from "@utils/hooks";

import {
  BackgroundVideo,
  ContentContainer,
  MessageP,
  SuccessSpan
} from "./Enter.styles";

// TODO: not needed because it's imported in webpack build, and all pages share the share main.css
// make more explicit, preferable but creating separate css for each page
// export { default as GlobalCss } from "@utils/theme";
import register from "@utils/custom-element";

interface EnterProps {
  music?: string,
  video?: string,
  videoOverlay?: string;
  logo?: string;
  skipable: boolean;

  type: "signup" | "password",

  password: string,

  signUp: string,
  message?: string;
  successMessage?: string;
  emailPlaceholder?: string;
}
const logo_overlay = (
  <svg width="704.415" height="531.749" viewBox="0 0 704.415 531.749" version="1.1"
    xmlns="http://www.w3.org/2000/svg">
    <path
      id="Second_G"
      data-name="Second G"
      d="m 489.737,200.363 c 3.295,1.387 113.371,64.973 115.582,66.716 a 7.281,7.281 0 0 1 -2.533,1.75 q -18.6,10.762 -37.219,21.5 c -1.021,0.589 -2.023,1.2 -2.91,1.733 -0.371,2.7 -0.475,76.976 -0.135,81.157 a 12.536,12.536 0 0 0 1.721,0.395 c 0.746,0.073 1.508,0.022 2.262,0.022 q 30.551,0 61.1,0 c 1.166,0 2.338,-0.057 3.691,-0.093 a 18.3,18.3 0 0 0 0.3,-1.928 c 0.053,-0.968 0.021,-1.939 0.021,-2.91 V 77.725 c 0,-1.491 -0.033,-2.981 -0.053,-4.66 -1.018,-0.1 -1.84,-0.253 -2.662,-0.257 -6.252,-0.021 -12.5,-0.011 -18.754,-0.013 q -21.981,0 -43.967,0.01 a 8.755,8.755 0 0 0 -3.629,0.334 c -0.437,3.531 -0.15,7.07 -0.2,10.595 -0.055,3.556 -0.012,7.112 -0.012,10.668 v 86 c 0,3.538 -0.016,7.079 -0.027,10.894 a 9.681,9.681 0 0 1 -1.693,-0.54 c -3.471,-1.966 -6.922,-3.962 -10.371,-5.953 Q 530.515,173.415 510.78,162.026 c -1.117,-0.646 -2.25,-1.274 -3.328,-1.984 -11.232,-7.41 -17.2,-17.806 -17.7,-31.29 -0.027,-0.646 -0.02,-1.293 -0.02,-1.939 q 0,-45.265 -0.01,-90.527 a 37.836,37.836 0 0 1 1.41,-10.852 35.236,35.236 0 0 1 29.885,-25.091 c 1.719,-0.167 3.439,-0.321 5.158,-0.323 q 70.8,-0.028 141.6,-0.015 a 35.344,35.344 0 0 1 12.092,1.792 c 13.66,4.925 21.832,14.511 24.094,28.922 a 50.261,50.261 0 0 1 0.428,7.729 q 0.023,149.046 0.012,298.09 0,36.372 0.01,72.743 a 42.18,42.18 0 0 1 -1.125,10.25 35.227,35.227 0 0 1 -32.338,26.686 c -1.721,0.065 -3.441,0.08 -5.168,0.08 q -49.623,0.01 -99.248,0.012 a 10.494,10.494 0 0 0 -3.9,0.315 8.807,8.807 0 0 0 -0.279,3.5 q -0.029,17.944 -0.012,35.889 v 3.386 c -2.227,1.7 -69.008,40.314 -72.012,41.681 -0.7,-0.213 -0.562,-0.817 -0.582,-1.314 -0.029,-0.968 -0.016,-1.94 -0.016,-2.91 V 204.843 c 0.01,-1.382 0.01,-2.77 0.01,-4.48 z"
      fill="#ffffff"
    />
    <path
      id="Second_I"
      data-name="Second I"
      d="m 142.082,191.708 c -0.208,-5.044 -0.081,-9.432 -0.105,-13.816 -0.022,-4.31 0,-8.62 0,-12.934 V 99.319 c 0,-4.312 0.024,-8.623 -0.006,-12.934 -0.032,-4.392 0.143,-8.791 -0.1,-12.944 a 3.457,3.457 0 0 0 -0.435,-0.461 0.618,0.618 0 0 0 -0.311,-0.076 q -32.974,-0.057 -65.948,-0.1 c -0.64,0 -1.282,0.08 -2.084,0.134 a 15.25,15.25 0 0 0 -0.349,1.823 c -0.062,0.858 -0.02,1.724 -0.02,2.584 q 0,145.824 0,291.648 c 0,1.389 0.029,2.775 0.045,4.312 a 14.564,14.564 0 0 0 1.99,0.312 c 3.448,0.03 6.9,0.019 10.346,0.019 q 26.512,0 53.024,0 c 1.16,0 2.319,-0.081 3.211,-0.113 a 3.641,3.641 0 0 0 0.471,-0.465 0.741,0.741 0 0 0 0.071,-0.313 c 0.036,-0.536 0.091,-1.073 0.091,-1.608 0,-26.189 0,-52.378 0,-78.4 -0.709,-1.3 -1.908,-1.654 -2.906,-2.234 q -18.6,-10.777 -37.216,-21.509 c -0.925,-0.536 -1.83,-1.105 -2.71,-1.642 0.2,-1.163 1.175,-1.329 1.876,-1.734 q 18.039,-10.45 36.1,-20.86 36.945,-21.335 73.89,-42.666 c 1,-0.578 2.037,-1.1 3.311,-1.791 a 15.513,15.513 0 0 1 0.318,1.748 c 0.047,0.861 0.024,1.724 0.024,2.589 q 0,161.183 -0.013,322.364 c 0,1.343 0.292,2.747 -0.37,4.122 a 5.062,5.062 0 0 1 -1.012,-0.286 q -35.559,-20.492 -71.22,-41.063 c -0.024,-1.237 -0.066,-2.412 -0.066,-3.585 q -0.008,-17.946 -0.005,-35.891 c 0,-1.175 -0.032,-2.349 -0.05,-3.6 a 11.805,11.805 0 0 0 -1.706,-0.358 c -1.075,-0.053 -2.155,-0.028 -3.231,-0.028 q -49.791,0 -99.58,0 a 42,42 0 0 1 -12.143,-1.454 35.29,35.29 0 0 1 -25.1,-31.27 C 0.072,411.977 0.01,410.36 0.01,408.744 Q 0,223.151 0.002,37.557 A 42.092,42.092 0 0 1 1.554,25.101 35.257,35.257 0 0 1 31.377,0.35 c 1.927,-0.184 3.868,-0.321 5.8,-0.321 Q 107.336,0 177.495,0.008 a 37.416,37.416 0 0 1 10.881,1.257 c 14.319,4.319 22.952,13.887 25.829,28.554 a 35.449,35.449 0 0 1 0.433,6.764 q 0.039,45.108 0.036,90.212 a 38.924,38.924 0 0 1 -6.086,21.772 38.191,38.191 0 0 1 -13.31,12.484 q -11.771,6.76 -23.512,13.573 -13.014,7.518 -26.029,15.032 c -1.016,0.579 -2.039,1.143 -3.655,2.052 z"
      fill="#ffffff"
    />
    <path
      id="First_I"
      data-name="First I"
      d="m 340.848,531.42 a 11.345,11.345 0 0 1 -1.545,0.211 q -52.846,0.013 -105.543,0.01 c -0.756,-1.036 -0.049,-1.646 0.25,-2.253 q 5.432,-11.011 10.934,-21.991 a 49.368,49.368 0 0 0 4.6,-13.061 c 0.5,-2.64 0.838,-5.317 1.084,-7.993 0.184,-2.033 0.137,-4.091 0.137,-6.138 q 0.01,-214.377 0,-428.749 a 69.545,69.545 0 0 0 -0.623,-10.958 54.319,54.319 0 0 0 -5.1,-15.934 Q 239.78,14.008 234.53,3.445 c -0.467,-0.94 -0.869,-1.914 -1.244,-2.748 0.451,-0.8 1.041,-0.648 1.545,-0.672 0.756,-0.036 1.51,-0.015 2.266,-0.015 q 50.112,0 100.229,0 c 1.156,0 2.314,0.063 3.414,0.1 0.457,1.157 -0.234,1.845 -0.59,2.569 -3.432,6.955 -6.857,13.913 -10.367,20.828 a 55.454,55.454 0 0 0 -5.8,18.389 c -0.17,1.389 -0.307,2.787 -0.357,4.186 -0.076,2.045 -0.088,4.094 -0.088,6.142 q 0,213.728 -0.01,427.452 a 67.7,67.7 0 0 0 1.156,14.465 57.885,57.885 0 0 0 4.869,13.655 q 5.124,10.26 10.223,20.539 c 0.459,0.933 1.221,1.789 1.07,3.086 z"
      fill="#ffffff"
    />
    <path
      id="First_G"
      data-name="First G"
      d="m 470.876,531.383 a 8.353,8.353 0 0 1 -1.205,0.24 c -5.26,0.271 -103.691,0.059 -106.014,-0.218 -0.578,-0.812 0.1,-1.42 0.406,-2.032 3.58,-7.243 7.16,-14.484 10.8,-21.7 a 52.587,52.587 0 0 0 5.379,-16.847 c 0.367,-2.772 0.434,-5.581 0.6,-8.377 0.063,-1.072 0.018,-2.154 0.018,-3.232 q 0,-213.227 -0.027,-426.454 a 107.805,107.805 0 0 0 -0.687,-12.246 48.623,48.623 0 0 0 -5.18,-16.232 q -5.218,-10.4 -10.373,-20.823 c -0.469,-0.945 -0.869,-1.919 -1.25,-2.762 0.434,-0.785 1.02,-0.65 1.529,-0.678 0.646,-0.032 1.293,-0.012 1.941,-0.012 q 50.435,0 100.869,0 c 1.049,0 2.1,0.075 3.082,0.114 0.492,1.146 -0.209,1.835 -0.568,2.559 q -5.218,10.578 -10.51,21.116 a 52.3,52.3 0 0 0 -5.066,14.6 c -0.473,2.753 -0.744,5.545 -0.973,8.333 -0.148,1.822 -0.072,3.661 -0.072,5.494 q 0,213.712 -0.01,427.427 a 68.718,68.718 0 0 0 0.961,13.516 57.5,57.5 0 0 0 5.066,14.6 q 5.142,10.255 10.225,20.538 c 0.455,0.938 1.237,1.786 1.059,3.076 z"
      fill="#ffffff"
    />
  </svg>
);
const SignUp: FunctionComponent<EnterProps> = ({
  music,
  video,
  videoOverlay,
  logo,
  skipable,

  type,
  message,
  successMessage,
  emailPlaceholder,
}) => {
  const { url } = useHistoryUrl();

  const posted = useMemo(
    () => url.searchParams.get("customer_posted"),
    [url.searchParams]
  );

  const [complete, setComplete] = useState(!skipable);

  const { state: musicMuted, ...handleMusicMuted } = useBoolean(true);
  const { state: playing, ...handlePlaying } = useBoolean(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handlePlaying.off();
        handlePlaying.on();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    setTimeout(() => setComplete(true), 5000);
  }, []);

  const skip = useCallback(() => {
    // TODO:
    // animate fast
    setComplete(true);
  }, []);

  return (
    <main>
      {music && (
        <div className="backgrond__music" style={{ display: "none" }} aria-hidden>
          <ReactPlayer
            url={music}
            playsinline
            playing={playing}
            controls={false}
            loop
            muted={musicMuted}
            volume={musicMuted ? 0 : 0.5}
            style={{ display: "none" }}
            wrapper={"span"}
          />
        </div>
      )}
      {/* TODO: get aspect ratio from video */}
      {video && (
        <BackgroundVideo className="background__video" aspectRatio={16 / 9} aria-hidden>
          <ReactPlayer
            url={video}
            playsinline
            playing={playing}
            controls={false}
            loop
            muted
            onPause={handlePlaying.off}
            onPlay={handlePlaying.on}
          />
        </BackgroundVideo>
      )}
      <ContentContainer>
        <div className="logo">{logo_overlay}</div>
        <div className="formik" hidden={!complete}>
          <MessageP>Coming Soon <br />{message}</MessageP>
          <Form
            type={type}
            emailPlaceholder={emailPlaceholder}
          />
          {successMessage && posted === "true" && (
            <SuccessSpan>
              <FaCheckCircle />
              <p>{successMessage}</p>
            </SuccessSpan >
          )}
        </div>
        <div className="controls">
          <Button
            htmlProps={{
              hidden: music === undefined,
              className: "mute",
              onClick: handleMusicMuted.toggle,
            }}
            width={8}
          >
            {musicMuted ? "unmute" : "mute"}
          </Button>
          <Button
            htmlProps={{
              hidden: complete,
              className: "skip",
              onClick: skip,
            }}
            width={8}
          >
            skip
          </Button>
        </div>
      </ContentContainer>
    </main>
  );
};

register(SignUp);

// "music": "https:\/\/player.vimeo.com\/video\/648372250?h=afcd05e5f3"
