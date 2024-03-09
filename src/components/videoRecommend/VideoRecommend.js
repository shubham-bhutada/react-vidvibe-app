import React, { useEffect, useState } from "react";
import "./videoRecommend.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import moment from "moment";
import numeral from "numeral";
import { Col, Row } from "react-bootstrap";
import request from "../../api";
import { useNavigate } from "react-router-dom";

const VideoRecommend = ({ video, searchScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const isVideo = id?.kind === "youtube#video";

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (isVideo) get_video_details();
  }, [id, isVideo]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    get_channel_icon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const format_duration = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();

  const _channelId = resourceId?.channelId || channelId;

  function handleClick() {
    isVideo
      ? navigate(`/watch/${id.videoId}`)
      : navigate(`/channel/${_channelId}`);
  }

  const thumbnail = !isVideo && "videoRecommend_thumbnail-channel";

  return (
    <Row
      className="videoRecommend m-1 my-2 py-2 align-items-center border border-dark"
      onClick={handleClick}
      key={id || _channelId} 
    >
      <Col xs={6} md={searchScreen ? 4 : 6} className="videoRecommend_left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoRecommend_thumbnail ${thumbnail}`}
          wrapperClassName="videoRecommend_thumbnail_wrapper"
        />
        {isVideo && (
          <span
            className={
              searchScreen ? "video_duration_searchScreen" : "video_duration"
            }
          >
            {format_duration}
          </span>
        )}
      </Col>
      <Col
        xs={6}
        md={searchScreen ? 8 : 6}
        className={
          searchScreen
            ? "videoRecommend_right_searchScreen p-0"
            : "videoRecommend_right p-0"
        }
      >
        <p
          className={
            searchScreen
              ? "videoRecommend_right_title_searchScreen"
              : "videoRecommend_right_title"
          }
        >
          {title}
        </p>

        <div className="videoRecommend_right_details d-flex align-items-center my-1">
          {isVideo && <LazyLoadImage src={channelIcon?.url} effect="blur" />}

          <p className="mb-0">{channelTitle}</p>
        </div>
        {searchScreen && (
          <p className="mt-1 mb-1 videoRecommend_desc">{description}</p>
        )}

        {isVideo && (
          <div className="videoRecommend_right_details fw-semibold">
            {numeral(views).format("0.a")} views •{" "}
            {moment(publishedAt).fromNow()}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default VideoRecommend;
