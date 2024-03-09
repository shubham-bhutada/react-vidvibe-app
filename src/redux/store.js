import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import {
  channelVideosReducer,
  homeVideosReducer,
  relatedVideosReducer,
  searchedVideosReducer,
  selectedVideoReducer,
} from "./reducers/videosReducer";
import { channelDetailsReducer } from "./reducers/channelReducer";
import { commentListReducer } from "./reducers/commentsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideosReducer,
  searchedVideos: searchedVideosReducer,
  channelVideos: channelVideosReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
