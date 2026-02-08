const authController = require('../controllers/authController');
const User = require('../Model/usermodel');

jest.mock('../Model/usermodel', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),

}));


describe('Auth Controller', () => {
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
}});


