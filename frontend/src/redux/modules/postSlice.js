import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = async () => {
  return async function (dispatch) {
    axios
      .get("http://localhost:5001/posts")
      .then((response) => console.log(response));
    // axios({
    //   method: "get",
    //   url: "http://localhost:5001/posts",
    // }).then((response) => {
    //   console.log(response);
    // });
    await dispatch(loadPosts);
  };
};

const postSlice = createSlice({
  name: "postReducer",
  initialState: {
    posts: [
      {
        postId: "aaaaaaaaaaaaa",
        createdAt: 1654873647230,
        title: "aaaaaaaa",
        content: "aaaaaaaaaaa",
        nickName: "aaaaaaaaaa",
        imgUrl:
          "https://i.pinimg.com/736x/4f/c2/3f/4fc23ff253848f18da5392b1d937789d.jpg",
      },
      {
        postId: "bbbbbbbbbbbb",
        createdAt: 1654873647430,
        title: "bbbbbbbbbbbb",
        content: "bbbbbbbbbbbbbbbbbbbbbbbb",
        nickName: "bbbbbbbbbbbb",
        imgUrl: "https://i.ytimg.com/vi/C-8sFlhfosM/maxresdefault.jpg",
      },
      {
        postId: "ccccccccccccc",
        createdAt: 1654873647530,
        title: "cccccc",
        content: "cccccccccccccccccccccccccccccccccccccccccccccccccccc",
        nickName: "ccccccccccccc",
        imgUrl: "https://i.ytimg.com/vi/C-8sFlhfosM/maxresdefault.jpg",
      },
    ],
  },
  reducers: {
    // 게시물 불러오기
    loadPosts: (state, { payload }) => {
      state.posts = payload;
    },

    loadOne: (state, { payload }) => {},

    // 저번 주차에 썼던 코드인데 혹시 참고되실까해서 남겨봅니다!
    //   // 게시물 추가하기
    //   addPost: (state, { payload }) => {
    //     state.post.unshift(payload);
    //   },
    //   // 게시물 수정하기
    //   editPost: (state, { payload }) => {
    //     state.post = state.post.map((post) => {
    //       if (post.uid === payload.uid) {
    //         return {
    //           ...post,
    //           text: payload.text,
    //           fileUrl: payload.fileUrl,
    //           layout: payload.layout,
    //         };
    //       } else return post;
    //     });
    //   },
    //   //게시물 삭제하기
    //   deletePost: (state, { payload }) => {
    //     state.post = state.post.filter((post) => {
    //       return payload.uid !== post.uid;
    //     });
    //   },
  },
});

export const { loadPosts } = postSlice.actions;
export default postSlice.reducer;
