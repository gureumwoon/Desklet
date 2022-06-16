const app = require('../index.js');
const request = require('supertest');
// const makeApp = require('./app');

    describe("게시글 라우터 테스트", () => {
      const key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0Y29kZUBnbWFpbC5jb20iLCJpYXQiOjE2NTUzNjUwNDF9.4_tqXgNkp3KpU0UaZNJqnpyVOzs_IDaiQKeXoVvdTVc'
      
      test('/posts 로 get 요청할 시 한 개 이상의 글 목록이 응답되어야 한다.', async () => {

        const res = await request(app)
          .get("/posts")

          const { post } = res.body;
        expect(post[0]).toBeTruthy();

      });

      test('/posts/:postId 로 get 요청할 시 해당 게시글과 게시글의 댓글이 응답되어야 한다.', async () => {

        const res = await request(app)
          .get("/posts/1")

          const { post, comments } = res.body;
  
        expect(post).toBeTruthy();
        expect(comments).toBeTruthy();

      });

     /* test('/posts 로 post요청 시 status 200이 반환되어야 한다.', async () => {

        const res = await request(app)
            .post("/posts")
            .set(
                "authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0Y29kZUBnbWFpbC5jb20ifQ.U5H9LaiK1OcRx-s44SZxdWYFdSmD3PYrsLPVOaPnfzQ"
              )
            .field({
                "title": "테스트코드타이틀",
                "content": "테스트코드컨텐트",
            })
            .attach('imageTestCode',
            'testcode.png')

              .attach('imageTestCode',
            'testcode.png') 

            expect(res.statusCode).toBe(200);

          }); */

         /* s3.deleteObject(
            {
              Bucket: "desklet",
              Key: DeleteS3,
            },
            (err, data) => {
              if (err) {
                throw err;
              }
            }
          );  */
      });


      test('권한 없이 /posts 로 post요청 시 status 401이 반환되어야 한다.', async () => {

        const res = await request(app)
            .post("/posts")
            .set(
                "authorization", "Bearer nodeJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )
            .send({
                "title": "테스트코드타이틀",
                "content": "테스트코드컨텐트",
                "file": "/asdas/asd.jpeg"
            /* .attach('imageTestCode',
            'testcode.png') */

            })
           
            expect(res.statusCode).toBe(401);

            /* await s3.deleteObject(
              {
                Bucket: "desklet",
                Key: DeleteS3,
              },
              (err, data) => {
                if (err) {
                  throw err;
                }
              }
            ); */

      });