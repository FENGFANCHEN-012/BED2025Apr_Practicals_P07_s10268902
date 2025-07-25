const User = require("../models/userModel");
const db = require("../db");

jest.mock("../db");

describe("User Model", () => {
  test("findByUsername should return user from DB", async () => {
    const mockUser = { username: "admin", password: "hashedpw" };
    db.query.mockResolvedValue({ recordset: [mockUser] });

    const user = await User.findByUsername("admin");
    expect(user).toEqual(mockUser);
  });

  test("findByUsername should return undefined if user not found", async () => {
    db.query.mockResolvedValue({ recordset: [] });

    const user = await User.findByUsername("ghost");
    expect(user).toBeUndefined();
  });
});
