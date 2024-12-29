import React, { FC } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl = '', title }) => {
  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(videoUrl);

  return (
    <div style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          border: 0,
        }}
        allowFullScreen={true}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export default CoursePlayer;
