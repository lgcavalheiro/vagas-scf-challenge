const UsersDB = require("../src/fakeData");

describe("UsersDB", () => {
  test("should return null if getByName is not provided a name", () => {
    const entry = UsersDB.getByName("     ");

    expect(entry).toBeUndefined();
  });

  test("should return null if getReadCountByName is not provided a name", () => {
    const entry = UsersDB.getReadCountByName();

    expect(entry).toBeUndefined();
  });

  test("should return null if insertEntry is not provided valid arguments", () => {
    const entry = UsersDB.insertEntry("    ", null);

    expect(entry).toBeUndefined();
  });

  test("should return null if updateEntry is not provided valid arguments", () => {
    const entry = UsersDB.updateEntry(undefined);

    expect(entry).toBeUndefined();
  });

  test("should return null if deleteByName is not provided a valid name", () => {
    const entry = UsersDB.deleteByName("      ");

    expect(entry).toBeUndefined();
  });
});
