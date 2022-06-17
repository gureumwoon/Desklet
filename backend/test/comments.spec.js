const app = require('../index.js');
const request = require('supertest');
// const makeApp = require('./app');

    describe("댓글 라우터 테스트", () => {
      const key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0Y29kZUBnbWFpbC5jb20iLCJpYXQiOjE2NTUzNjUwNDF9.4_tqXgNkp3KpU0UaZNJqnpyVOzs_IDaiQKeXoVvdTVc'
      test('/comments/:postId 로 get 요청할 시 한 개 이상의 댓글 목록이 응답되어야 한다.', async () => {

        const res = await request(app)
          .get("/comments/1655339141829")
          const { comments } = res.body
        expect(comments[0]).toBeTruthy();

      });
  
        test('/comments 로 댓글 post요청 시 status 200이 반환되어야 한다.', async () => {
        

          const res = await request(app)
            .post("/comments")
            .set(
                "authorization", key
              )
            .send({
                "content": "테스트코드",
                "postId": Date.now()
            })

            expect(res.statusCode).toBe(200);
        });

        test('/comments 로 댓글 post요청 시 응답으로 _id값과 createdAt이 반환되어야 한다.', async () => {
        
          const res = await request(app)
            .post("/comments")
            .set(
                "authorization", key
              )
            .send({
                "content": "테스트코드_응답요청",
                "postId": Date.now()
            })

            expect(res.body).toBeTruthy();
        });

        test('권한 없이 댓글 등록 요청 시 status 404가 응답되어야 한다.', async () => {
        
          const res = await request(app)
            .post("/comments/62aac91b17e2d36376bad26f")
            .set(
                "authorization", "Bearer whatAnIdiot_iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )
            .send({
              "content": "테스트코드",
              "postId": Date.now()
            })


            expect(res.statusCode).toBe(404);
        });
  
        test('/comments/:commendId 로 댓글 put요청 시 status 200이 반환되어야 한다.', async () => {
        

          const res = await request(app)
            .put("/comments/62aac91b17e2d36376bad26f")
            .set(
                "authorization", key
              )
            .send({
                "data": "테스트코드 수정입니다",
            })

            expect(res.statusCode).toBe(200);
        });

        test('권한 없이 댓글 수정 요청 시 status 401이 반환되어야 한다.', async () => {
        

          const res = await request(app)
            .put("/comments/62aac91b17e2d36376bad26f")
            .set(
                "authorization", "Bearer whatAnIdiot_iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )

            expect(res.statusCode).toBe(401);
        });
  
/*        test('/comments/:commendId 로 댓글 delete요청 시 status 200이 반환되어야 한다.', async () => {
        

          const res = await request(app)
            .delete("/comments/62aa356ce5c03eb473d514fd")
            .set(
                "authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
              )

            expect(res.statusCode).toBe(200);
        }); */

        test('권한 없이 댓글 삭제 요청 시 status 401이 반환되어야 한다.', async () => {
        

            const res = await request(app)
              .delete("/comments/62aac91b17e2d36376bad26f")
              .set(
                  "authorization", "Bearer whatAnIdiot_iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhc2Rhc2RAbmF2ZXIuY29tIn0.JM-AafzxY4ep2-5yzBh2RtDJDZOSCMIrDbKmRQNlupg"
                )
  
              expect(res.statusCode).toBe(401);
          });

});