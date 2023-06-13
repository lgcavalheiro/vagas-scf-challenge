const usersService = require("../../src/services/UsersService");

describe("usersService", () => {
  describe("getByName", () => {
    test("should return entries that match the provided name", () => {
      const entries = usersService.getByName("oliv");

      expect(entries.length).toBe(1);
      expect(entries[0].name).toBe("João Oliveira");
    });

    test("should return empty array if no matches are found", () => {
      const entries = usersService.getByName("non-existant");

      expect(entries.length).toBe(0);
    });

    test("should return null if name is invalid", () => {
      const entries = usersService.getByName("    ");

      expect(entries.errors).toStrictEqual([
        "Field 'name' is invalid or was not provided",
      ]);
    });
  });

  describe("getAll", () => {
    test("should return all users", () => {
      const entries = usersService.getAll();

      expect(entries.length).toBe(1);
    });
  });

  describe("insertUser", () => {
    test("should be able to insert new user", () => {
      const newUser = usersService.insertUser("Test", "To Test");

      expect(newUser.name).toBe("Test");
    });

    test("should return errors if name or job are invalid", () => {
      const newUser = usersService.insertUser("    ", null);

      expect(newUser.errors).toBeDefined();
      expect(newUser.errors.length).toBe(2);
    });
  });

  describe("updateUser", () => {
    test("should be able to update user", () => {
      const updated = usersService.updateUser(0, "Updated", "Updated Job");

      expect(updated.name).toBe("Updated");
      expect(updated.job).toBe("Updated Job");
    });

    test("should return null if id is invalid", () => {
      const updated = usersService.updateUser(-1, "Updated", "Updated Job");

      expect(updated).toStrictEqual({
        errors: ["Field 'id' is invalid or was not provided"],
      });
    });

    test("should return null if name or job invalid", () => {
      const updated = usersService.updateUser(0, "    ", null);

      expect(updated).toStrictEqual({
        errors: [
          "Field 'name' is invalid or was not provided",
          "Field 'job' is invalid or was not provided",
        ],
      });
    });
  });

  describe("deleteUserByName", () => {
    test("should be able to delete user", () => {
      usersService.insertUser("Delete test", "Delete test");

      const deleted = usersService.deleteUserByName("Delete test");

      expect(deleted.name).toBe("Delete test");
    });

    test("should return null if name is invalid", () => {
      const deleted = usersService.deleteUserByName("      ");

      expect(deleted).toStrictEqual({
        errors: ["Field 'name' is invalid or was not provided"],
      });
    });
  });

  describe("getUserAccessByName", () => {
    test("should return user access by name", () => {
      usersService.insertUser("Access test", "Access test");

      const access = usersService.getUserAccessByName("Access test");

      expect(access).toBe(0);
    });

    test("should return null if name is invalid", () => {
      const access = usersService.getUserAccessByName();

      expect(access).toStrictEqual({
        errors: ["Field 'name' is invalid or was not provided"],
      });
    });
  });
});
