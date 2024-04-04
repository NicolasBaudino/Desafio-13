import { expect } from "chai";
import supertest from "supertest";
import bcrypt from "bcrypt";

const requester = supertest("http://localhost:8080");


let createdUser;
describe("Testing jwt router", () => {
    describe("Create a new account", () => {
        it("Register account successfully using email and password", async function () {
          const mockUser = {
            first_name: "John",
            last_name: "Test",
            email: "test@example.com",
            role: "user",
            password: "test1234",
          };
    
          const response = await requester
            .post("/api/jwt/register")
            .send(mockUser);
          console.log(response)
        //   expect(statusCode).is.equals(200);
        //   expect(ok).is.equals(true);
        //   expect(_body.success).is.equals(true);

          createdUser = _body.data;
          
        });
    
        it("The password should be stored encrypted", async function () {
          const isMatch = await bcrypt.compare("test1234", createdUser.password);
    
          expect(createdUser.password).to.not.equal("test1234");
          expect(isMatch).is.equals(true);
        });
    
        it("New user should have 'user' role", async function () {
          expect(createdUser.role).to.be.equals("user");
          expect(createdUser.role).to.be.a("string");
        });
    });
})