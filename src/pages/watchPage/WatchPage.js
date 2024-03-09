import React, { useEffect } from "react";
import "./watchPage.css";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import VideoRecommend from "../../components/videoRecommend/VideoRecommend";
import Comments from "../../components/comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // getRelatedVideos,
  getVideoById,
  getVideosBySearch,
} from "../../redux/actions/videosAction";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const WatchPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getVideosBySearch());
  }, [dispatch, id]);

  const { loading, video } = useSelector((state) => state.selectedVideo);

  const { loading: searchedVideosLoading, videos } = useSelector(
    (state) => state.searchedVideos
  );
  return (
    <Row>
      <Col lg={8}>
        <div className="watchPage_player">
          <iframe
            src={"https://www.youtube.com/embed/" + id}
            frameBorder="0"
            title={video?.snippet?.title}
            allowFullScreen
            height="100%"
            width="100%"
          ></iframe>
        </div>
        {!loading && video !== null ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h3>Loading...</h3>
        )}
        <Comments
          key={id}
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!searchedVideosLoading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoRecommend video={video} key={video.id.videoId} />
            ))
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchPage;
