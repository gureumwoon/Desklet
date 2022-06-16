const authMiddleware = require("../routes/comments.js");
const DB_CONNECTION = require("../schemas/connect_db.js");
const request = require("supertest");

DB_CONNECTION();

//회원가입
describe("auth-middleware check", () => {

  const auth = (email, nickName, password) => {
    return request(authMiddleware)
      .send({
        userId: email,
        nickName: nickName,
        password: password
      });
  }

  const correct_key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MTEyM0BlbWFpbC5jb20iLCJpYXQiOjE2NTUzNjMyNDF9.U71lla_5TIwiTu3LJ69XB-Nc6qZ9h07ybVBTgLdfYdM";
  const wrong_key = "Bearer "

  // describe("given a userId, password and nickName", () => {

  //   test('Check undefined should status 400', async () => {
  //     const res = await signup(undefined, undefined, "12311qwer");
  //     expect(res.status).toBe(400);
  //   });

  //   test('Check wrong *userId* form: status 400', async () => {
  //     const res = await signup("test9il.com", "tes1t11dd123", "12311qwer");
  //     expect(res.status).toBe(400);
  //   });

  //   test('Check wrong *password* form: status 400', async () => {
  //     const res = await signup("tes@aw@a@t9il.com", "tss1t11dd123", "123@!qwer");
  //     expect(res.status).toBe(400);
  //   });

  //   test('Check wrong *nickName* form: status 400', async () => {
  //     const res = await signup("tes@t9ilco.m", "tss1t11dd123", "12134qwe1r");
  //     expect(res.status).toBe(400);
  //   });
  // });

  // describe("duplicated signup test", () => {

  //   test('duplicated *userId*: status 400', async () => {
  //     const res = await signup("test9@email.com", "tes1t11123", "12134qwe1r");
  //     expect(res.status).toBe(400);
  //   });

  //   test('duplicated *nickName*: status 400', async () => {
  //     const res = await signup("test1239@email.com", "tes1t11123", "12134qwe1r");
  //     expect(res.status).toBe(400);
  //   });
  // });
});