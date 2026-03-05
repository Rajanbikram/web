const SequelizeMock = require('sequelize-mock');
const bcrypt = require('bcrypt');

// ── Setup mock DB ──────────────────────────────────────────
const dbMock = new SequelizeMock();

// ── Define Mocked User Model ───────────────────────────────
const UserMock = dbMock.define('User', {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '9800000000',
  location: 'Kathmandu',
  bio: 'I love teaching',
  mode: 'Both Learn & Teach',
  password: 'hashedpassword123',
  averageRating: 0,
  role: 'user',
});

// ── Test Suite ─────────────────────────────────────────────
describe('User Model', () => {

  // ── TEST 1: Create a user with correct fields ─────────────
  it('should create a user with correct fields', async () => {
    const user = await UserMock.create({
      firstName: 'Ram',
      lastName: 'Sharma',
      email: 'ram@example.com',
      phone: '9811111111',
      location: 'Pokhara',
      bio: 'Eager to learn',
      mode: 'Learn Skills',
      password: 'password123',
      role: 'user',
    });

    expect(user.firstName).toBe('Ram');
    expect(user.lastName).toBe('Sharma');
    expect(user.email).toBe('ram@example.com');
    expect(user.phone).toBe('9811111111');
    expect(user.location).toBe('Pokhara');
    expect(user.mode).toBe('Learn Skills');
    expect(user.role).toBe('user');
  });

  // ── TEST 2: Find user by primary key ──────────────────────
  it('should find a user by primary key', async () => {
    const user = await UserMock.findByPk(1);

    expect(user).not.toBeNull();
    expect(user.id).toBe(1);
    expect(user.firstName).toBe('John');
    expect(user.email).toBe('john@example.com');
  });

  // ── TEST 3: Default role is 'user' ────────────────────────
  it('should have default role as user', async () => {
    const user = await UserMock.create({
      firstName: 'Sita',
      lastName: 'Rai',
      email: 'sita@example.com',
      password: 'pass1234',
    });

    expect(user.role).toBe('user');
  });

  // ── TEST 4: Default averageRating is a number ─────────────
  it('should have averageRating as a number', async () => {
    const user = await UserMock.findByPk(1);

    expect(typeof user.averageRating).toBe('number');
  });

  // ── TEST 5: Password hashing with bcrypt ──────────────────
  it('should hash password correctly using bcrypt', async () => {
    const plainPassword = 'mySecretPass';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // hashed password should not equal plain password
    expect(hashedPassword).not.toBe(plainPassword);

    // bcrypt compare should return true
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    expect(isMatch).toBe(true);
  });

  // ── TEST 6: Wrong password should not match ───────────────
  it('should return false for wrong password comparison', async () => {
    const plainPassword = 'correctPassword';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const isMatch = await bcrypt.compare('wrongPassword', hashedPassword);
    expect(isMatch).toBe(false);
  });

  // ── TEST 7: Update user location ──────────────────────────
  it('should update user location', async () => {
    const user = await UserMock.findByPk(1);
    await user.update({ location: 'Lalitpur' });

    expect(user.location).toBe('Lalitpur');
  });

  // ── TEST 8: Find all users ────────────────────────────────
  it('should return a list of users', async () => {
    const users = await UserMock.findAll();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  // ── TEST 9: Delete a user ─────────────────────────────────
  it('should delete a user', async () => {
    const user = await UserMock.findByPk(1);
    const result = await user.destroy();

    expect(result).toBeDefined();
  });

});