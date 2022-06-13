import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import Comment from "../components/Comment";

import { MainBody } from "../components/commonStyle";
import { getCommentListDB, postCommentDB } from "../redux/modules/comment";
import { getPostOneDB } from "../redux/modules/post";

const Detail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOwner, setisOwner] = useState(true);
  const post = useSelector((state) => state.post.postOne);
  const comments = useSelector((state) => state.comment.commentList);
  const commentRef = useRef("");

  const postId = location.state.postId;

  const onClickWrite = () => {
    const commentObj = {
      postId: postId,
      userId: "userId",
      nickName: "nickName",
      commentId: "commentId",
      content: commentRef.current.value,
      createdAt: new Date(),
    };
    dispatch(postCommentDB(commentObj));
  };

  useEffect(() => {
    dispatch(getPostOneDB(postId));
    dispatch(getCommentListDB(postId));
  }, [dispatch, postId]);
  return (
    <MainBody>
      <div>
        <span>{post.nickName}</span>
        {isOwner && (
          <>
            <button>수정</button>
            <button>삭제</button>
          </>
        )}
      </div>

      <PostImg src={post.imgUrl} alt="post image" />

      <div>{post.createdAt}</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>
        <input ref={commentRef} placeholder="댓글 달기..." />
        <button onClick={onClickWrite}>입력</button>
      </div>
      <div>
        {comments.map((comment) => {
          return <Comment comment={comment} key={comment.commentId} />;
        })}
      </div>
    </MainBody>
  );
};

const PostImg = styled.img`
  width: 100%;
  max-height: 800px;
  object-fit: scale-down;
  background-color: #f2f2f2;
`;

export default Detail;