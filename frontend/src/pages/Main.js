import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import PostCard from "../components/PostCard";
import { MainBody } from "../components/commonStyle";

const Main = () => {
  const mainImg = "https://i.ytimg.com/vi/C-8sFlhfosM/maxresdefault.jpg";
  const subImg =
    "https://i.pinimg.com/736x/4f/c2/3f/4fc23ff253848f18da5392b1d937789d.jpg";

  const posts = useSelector((state) => state.posts.posts);

  return (
    <MainBody>
      <MainGrid>
        <MainImg src={mainImg} />
        <SubImg src={subImg} />
        <div style={{ height: "30px", gridColumn: "1/-1" }}>
          <h2>다른 사람들 책상 구경하기 👇 같은 문구</h2>
        </div>
        {posts.map((post) => {
          return <PostCard post={post} key={post.createdAt} />;
        })}
      </MainGrid>
    </MainBody>
  );
};

const MainGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
`;

const MainImg = styled.img`
  width: 100%;
  height: 300px;
  grid-column: 1/-2;
  object-fit: cover;
`;
const SubImg = styled.img`
  width: 100%;
  height: 300px;
  grid-column: -2/-1;
  object-fit: cover;
`;

export default Main;
