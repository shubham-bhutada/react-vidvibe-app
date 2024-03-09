import React, { useEffect, useState } from "react";
import "./comments.css";
import Comment from "../Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideosById,
} from "../../redux/actions/commentsAction";

const Comments = ({ videoId, totalComments }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideosById(videoId));
  }, [dispatch, videoId]);

  const comments = useSelector((state) => state.commentList.comments);
  const { photoURL } = useSelector((state) => state.auth?.user);

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  function handleComment(e) {
    e.preventDefault();
    if (text.length === 0) return;
    dispatch(addComment(videoId, text));
    setText("");
  }
  return (
    <div className="comments mt-2">
      <p>{totalComments} comments</p>
      <div className="comments_form d-flex w-100 my-3">
        <img src={photoURL} alt="avatar" className="comment-avatar" />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="comments_list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
