const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth-middleware");
const Post = require("../schemas/post");
const Comment = require("../schemas/comment");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const path = require("path");
aws.config.loadFromPath(__dirname + "/awsconfig.json"); // 사용자 인증 keyId, Secret KeyId
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3, // 사용자 인증권한이 담긴다.
    bucket: "desklet", // 버킷이름
    acl: "public-read-write", // 액세스 제어 목록( Access control for the file)
    key: function (req, file, cb) {
      const url = path.extname(file.originalname);
      cb(null, Date.now() + url);
    },
  }),
  limits: {
    fileSize: 1000 * 1000 * 10,
  },
});

// 게시물 작성
// upload.single('postImage')에서 'image'는 변수명
// auth추가
// const field = upload.fields([{ name: "title"}, {name: "content"}, {name: "postImage"}]);

router.post("/", auth, upload.single("postImage"), async (req, res) => {
  //posts
  try {
    console.log("req.file:", req.file);
    console.log(req.body);
    // req.file내에는 fieldname, originalname,
    //encoding, destination, filename 등의 정보가 저장
    // 저장 성공시 asw s3 버킷에 저장
    const imageUrl = req.file.location;
    const createdAt = new Date().toLocaleString();

    const { userId, nickName } = res.locals.user;
    const { title, content } = req.body; // userId 추가해야합니다.
    const postExist = await Post.find().sort("-postId").limit(1);
    let postId = 0;

    if (postExist.length) {
      postId = postExist[0]["postId"] + 1;
    } else {
      postId = 1;
    }
    await Post.create({
      title,
      content,
      nickName,
      imageUrl,
      userId,
      createdAt,
      postId,
    });

    res.json({ success: "msg" });
  } catch (err) {
    console.log(err);
    response(res, 500, "서버 에러");
  }
});

//전체 게시물 조회
router.get("/", async (req, res) => {
  //posts

  const post = await Post.find().sort("-postId");

  res.send({ post: post });
});

//postId=6297c444c14824e8f5a484ff
//상세 페이지 조회
router.get("/:postId", async (req, res) => {
  //posts/:postId
  const { postId } = req.params;
  const post = await Post.findOne({ postId: postId });
  const comments = await Comment.findOne({ postId: postId });
  console.log(post);
  res.json({ post, comments }); //comments
});

//게시글 삭제
router.delete("/:postId", auth, async (req, res) => {
  const { postId } = req.params;
  const { userId } = res.locals.user;

  const existPost = await Post.find({ postId: postId });
  const [existImage] = await Post.find({ postId: postId });
  const Image = existImage.imageUrl;
  console.log("이미지:", Image);
  const DeleteS3 = Image.split("/")[3];
  console.log("딜리트:", DeleteS3);

  const existComment = await Comment.find({ postId: postId });

  if (userId === existPost[0]["userId"]) {
    if (existPost && existComment) {
      await Post.deleteOne({ postId: postId });
      await Comment.deleteMany({ postId: postId });
      s3.deleteObject(
        {
          Bucket: "desklet",
          Key: DeleteS3,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
        }
      );
      res.send({ result: "success" });
    } else if (existPost) {
      await Post.deleteOne({ postId: postId });
      s3.deleteObject(
        {
          Bucket: "desklet",
          Key: DeleteS3,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
        }
      );
      res.send({ result: "success" });
    }
  } else {
    res.status(401).send({ result: "fail" });
  }
});

//게시글 수정
router.put("/:postId", auth, upload.single("postImage"), async (req, res) => {
  ///posts/:postId
  const { postId } = req.params;
  const user = res.locals.user;
  const userId = user.userId;
  const { title, content } = req.body;

  const existPost = await Post.findOne({ postId: postId });
  const [existUrl] = await Post.find({ postId: postId });
  const UrlImage = existUrl.imageUrl;
  console.log("URL입니다:", UrlImage);
  const DeleteS3 = UrlImage.split("/")[3];
  console.log("DELETE입니다:", DeleteS3);
  s3.deleteObject(
    {
      Bucket: "desklet",
      Key: DeleteS3,
    },
    (err, data) => {
      if (err) {
        throw err;
      }
    }
  );

  const imageUrl = req.file.location;
  console.log(imageUrl);

  if (!imageUrl) {
    return res.status(400).send({
      msg: "사진을 추가해 주세요",
    });
  }

  if (userId === existPost.userId) {
    if (existPost) {
      await Post.updateOne(
        { postId: postId },
        { $set: { title, content, imageUrl } }
      );
      res.send({ result: "success" });
    } else {
      res.status(400).send({ result: "fail" });
    }
  } else {
    res.send({ result: "fail " });
  }
});

module.exports = router;
