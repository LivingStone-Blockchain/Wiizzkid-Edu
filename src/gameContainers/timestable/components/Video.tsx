import { useRef, useEffect, FC } from "react";

interface VideoProps {
  className: string;
  video: any;
}

const Video: FC<VideoProps> = (props) => {
  const videoRef: any = useRef(undefined);

  useEffect(() => {
    videoRef.current.defaultMuted = true;
  });

  return (
    <video
      className={props.className}
      ref={videoRef}
      loop
      autoPlay
      muted
      playsInline
    >
      <source src={props.video} type="video/mp4" />
    </video>
  );
};

export default Video;
