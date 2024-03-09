import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../../redux/actions/videosAction";
import { Container } from "react-bootstrap";
import VideoRecommend from "../../components/videoRecommend/VideoRecommend";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import HelmetCustom from "../../components/helmet/HelmetCustom";

const SearchPage = () => {
  const { q } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearch(q));
  }, [dispatch, q]);

  const { videos, loading } = useSelector((state) => state.searchedVideos);

  return (
    <Container>
      <HelmetCustom title={q} />
      {!loading ? (
        videos?.map((video) => (
          <VideoRecommend video={video} key={video.id.videoId} searchScreen />
        ))
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="180px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SearchPage;
