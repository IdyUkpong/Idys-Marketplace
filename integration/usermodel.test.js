const User = require('../src/model/users');
const { fakeUserData } = require('./unit.test');
const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require('./utils.test');
const {
  dbConnect,
  dbDisconnect,
} = require('./test.db');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('User Model Test Suite', () => {
  test('should validate saving a new student user successfully', async () => {
    const validStudentUser = new User({
      local: fakeUserData,
      fullname: fakeUserData.fullname,
    });
    const savedStudentUser = await validStudentUser.save();

    validateNotEmpty(savedStudentUser);

    validateStringEquality(savedStudentUser.fullname, fakeUserData.fullname);
    validateStringEquality(savedStudentUser.local.email, fakeUserData.email);
    validateStringEquality(
      savedStudentUser.local.username,
      fakeUserData.username
    );
    validateStringEquality(
      savedStudentUser.local.password,
      fakeUserData.password
    );
    validateStringEquality(
      savedStudentUser.local.firstName,
      fakeUserData.firstName
    );
    validateStringEquality(
      savedStudentUser.local.lastName,
      fakeUserData.lastName
    );
  });

  test('should validate MongoError duplicate error with code 11000', async () => {
    expect.assertions(4);
    const validStudentUser = new User({
      local: fakeUserData,
      fullname: fakeUserData.fullname,
    });

    try {
      await validStudentUser.save();
    } catch (error) {
      const { name, code } = error;
      validateMongoDuplicationError(name, code);
    }
  });
});