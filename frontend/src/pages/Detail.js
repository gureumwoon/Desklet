import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styled from "styled-components";

import { MainBody } from "../components/commonStyle";

const Detail = () => {
  const [isOwner, setisOwner] = useState(false);

  const location = useLocation();
  const postId = location.state.postId;
  const post = useSelector((state) =>
    state.posts.posts.filter((post) => post.postId === postId)
  );

  return (
    <MainBody>
      <div>
        <span>{post[0].nickName}</span>
        {isOwner && (
          <>
            <button>수정</button>
            <button>삭제</button>
          </>
        )}
      </div>
      <PostImg src={post[0].imgUrl} alt="post image" />
      <div>{post[0].createdAt}</div>
      <div>{post[0].title}</div>
      <div>{post[0].content}</div>
      {/* <div>
        <input placeholder="댓글 달기..." />
        <button>입력</button>
      </div> */}
    </MainBody>
  );
};

const PostImg = styled.img`
  width: 100%;
  max-height: 800px;
  object-fit: scale-down;
`;

export default Detail;
