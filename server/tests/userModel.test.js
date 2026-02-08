const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();


const UserMock = dbMock.define('User', {
  id: 1,
  username: 'testuser',
  email: 'rajanbikram@gmail.com',
  password: 'hashedpassword',
  phone : 9827245000,
    address : "ktm"
});


describe('User Model', () => {
    it('should create a user with valid data', async () => {
        const user = await UserMock.create({
            username: 'testuser',
            email: 'rajanbikram@gmail.com',
            password: 'Password123',
            phone : 9827245000,
            address : "ktm"
        });
        
expect(user.username).toBe('testuser');
        expect(user.email).toBe('rajanbikram@gmail.com');
        expect(user.password).toBe('Password123'); 
       expect(user.phone).toBe(9827245000);
       expect(user.address).toBe("ktm");
    });

    it('should create a user with valid data', async () => { 
        await expect(UserMock.create({})).rejects.toThrow(); 
    });
});