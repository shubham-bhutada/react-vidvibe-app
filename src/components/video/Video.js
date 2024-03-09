import React, { useEffect, useState } from "react";
import "./video.css";
import request from "../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";

import moment from "moment";
import numeral from "numeral";
import { useNavigate } from "react-router-dom";

const Video = ({ video, channelScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const navigate = useNavigate();

  const seconds = moment.duration(duration).asSeconds();
  const format_duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails, statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [_videoId]);

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

  function handleVideoClick() {
    navigate(`/watch/${_videoId}`);
  }

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video_top">
        {/* <img src={medium.url} alt="thumbnail" /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video_duration">{format_duration}</span>
      </div>
      <div className="video_title">{title}</div>
      <div className="video_detail">
        <span>{numeral(views).format("0.a")} views </span>
        <span>• {moment(publishedAt).fromNow()}</span>
      </div>
      {!channelScreen && (
        <div className="video_channel">
          {/* <img src={channelIcon?.url} alt="channel icon" /> */}
          <LazyLoadImage src={channelIcon?.url} effect="blur" />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
