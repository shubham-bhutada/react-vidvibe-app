import React, { useEffect } from "react";
import "./videoMetaData.css";
import moment from "moment";
import numeral from "numeral";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channelAction";
import HelmetCustom from "../helmet/HelmetCustom";

const VideoMetaData = ({ video: { snippet, statistics }, loading }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { likeCount, viewCount } = statistics;

  const dispatch = useDispatch();

  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.channelDetails.channel);

  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData py-2">
      <HelmetCustom title={title} description={description} />
      <div className="videoMetaData_top">
        <h5>{title}</h5>
      </div>
      <div className="videoMetaData_channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex align-items-center">
          <img src={channelSnippet?.thumbnails?.default?.url} alt="avatar" />
          <div className="d-flex flex-column channel_info">
            <span>{channelTitle}</span>
            <span>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              subscribers
            </span>
          </div>
        </div>
        <div className="subscribe d-flex align-items-center">
          <button
            className={`btn border-0 p-2 m-2 ${
              subscriptionStatus && "btn-gray"
            }`}
          >
            {subscriptionStatus ? "Subscribed" : "Subscribe"}
          </button>
          <span className="mr-3">
            <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}
          </span>
          <span className="mr-3">
            <MdThumbDown size={26} />
            {/* {numeral(dislikeCount).format("0.a")} */}
          </span>
        </div>
      </div>
      <div className="videoMetaData_description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          <span>
            {numeral(viewCount).format("0.a")} views •{" "}
            {moment(publishedAt).fromNow()}
          </span>
          <br />
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
