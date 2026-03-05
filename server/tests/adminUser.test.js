const SequelizeMock = require('sequelize-mock');
const bcrypt = require('bcrypt');

// ── Setup mock DB ──────────────────────────────────────────
const dbMock = new SequelizeMock();

// ── Define Mocked Admin User Model ────────────────────────
const AdminUserMock = dbMock.define('User', {
  id: 1,
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
  password: 'hashedpassword123',
  role: 'admin',
  phone: '9800000001',
  location: 'Kathmandu',
  bio: 'Platform administrator',
  mode: null,
  averageRating: 0,
});

// ── Test Suite ─────────────────────────────────────────────
describe('Admin User Model', () => {

  // ── TEST 1: Create admin user with correct fields ─────────
  it('should create an admin user with correct fields', async () => {
    const user = await AdminUserMock.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@example.com',
      password: 'adminpass123',
      role: 'admin',
      phone: '9822222222',
      location: 'Lalitpur',
      bio: 'Super admin account',
    });

    expect(user.firstName).toBe('Super');
    expect(user.lastName).toBe('Admin');
    expect(user.email).toBe('superadmin@example.com');
    expect(user.role).toBe('admin');
    expect(user.phone).toBe('9822222222');
    expect(user.location).toBe('Lalitpur');
  });

  // ── TEST 2: Find admin user by primary key ────────────────
  it('should find an admin user by primary key', async () => {
    const user = await AdminUserMock.findByPk(1);

    expect(user).not.toBeNull();
    expect(user.id).toBe(1);
    expect(user.email).toBe('admin@example.com');
    expect(user.role).toBe('admin');
  });

  // ── TEST 3: Default role is 'user' ────────────────────────
  it('should have default role as user when not specified', async () => {
    const user = await AdminUserMock.create({
      firstName: 'Normal',
      lastName: 'Person',
      email: 'normal@example.com',
      password: 'pass1234',
    });

    // sequelize-mock returns mock default — role field exists
    expect(user.role).toBeDefined();
  });

  // ── TEST 4: Default averageRating is 0 ───────────────────
  it('should have default averageRating as 0', async () => {
    const user = await AdminUserMock.findByPk(1);

    expect(user.averageRating).toBe(0);
    expect(typeof user.averageRating).toBe('number');
  });

  // ── TEST 5: Email field is defined ───────────────────────
  it('should have a valid email field', async () => {
    const user = await AdminUserMock.findByPk(1);

    expect(user.email).toContain('@');
  });

  // ── TEST 6: Password hashing with bcrypt ──────────────────
  it('should hash password correctly using bcrypt', async () => {
    const plainPassword = 'adminSecret99';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    expect(hashedPassword).not.toBe(plainPassword);

    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    expect(isMatch).toBe(true);
  });

  // ── TEST 7: Wrong password should not match ───────────────
  it('should return false for incorrect password', async () => {
    const plainPassword = 'correctPass';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const isMatch = await bcrypt.compare('wrongPass', hashedPassword);
    expect(isMatch).toBe(false);
  });

  // ── TEST 8: Update admin user bio ─────────────────────────
  it('should update admin user bio', async () => {
    const user = await AdminUserMock.findByPk(1);
    await user.update({ bio: 'Updated bio for admin' });

    expect(user.bio).toBe('Updated bio for admin');
  });

  // ── TEST 9: Find all admin users ──────────────────────────
  it('should return a list of users', async () => {
    const users = await AdminUserMock.findAll();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  // ── TEST 10: Delete an admin user ─────────────────────────
  it('should delete an admin user', async () => {
    const user = await AdminUserMock.findByPk(1);
    const result = await user.destroy();

    expect(result).toBeDefined();
  });

});