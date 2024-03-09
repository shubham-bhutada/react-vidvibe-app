import React from "react";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./skeletonVideo.css";

const SkeletonVideo = () => {
  return (
    <div style={{ width: "100%", margin: "1rem 0" }}>
      {/* <SkeletonTheme color="#343a40" highlightColor="#3c4147">
        <Skeleton height={180} />
        <div>
          <Skeleton
            style={{ margin: "0.5rem" }}
            circle
            height={40}
            width={40}
          />
          <Skeleton height={40} width="75%" />
        </div>
      </SkeletonTheme> */}
      <div className="skeleton-video">
        <div className="skeleton-top-box"></div>
        <div className="skeleton-bottom-box">
          <div className="skeleton-circle"></div>
          <div className="skeleton-rec"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonVideo;
