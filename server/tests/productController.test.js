import * as productController from '../Controller/productcontroller.js';
import { Product } from '../Model/productModel.js';

// Mock path must match EXACTLY what controller imports
jest.mock('../Model/productModel.js', () => ({
    Product: {
        findAll: jest.fn(),
        create: jest.fn(),
    }
}));

describe('Product Controller', () => {

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── GET all products ────────────────────────────────────
    it('should return all products', async () => {
        const req = {};
        const res = mockResponse();

        Product.findAll.mockResolvedValue([
            { id: 1, name: 'Test Product', price: 99.99 }
        ]);

        await productController.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            message: "Products retrieved successfully",
            data: expect.arrayContaining([
                expect.objectContaining({ id: 1, name: 'Test Product' })
            ])
        }));
    });

    it('should return 500 if getAll fails', async () => {
        const req = {};
        const res = mockResponse();

        Product.findAll.mockRejectedValue(new Error('Database error'));

        await productController.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Database error'
        });
    });

    // ── POST create product ─────────────────────────────────
    it('should create a new product', async () => {
        const req = {
            body: { name: 'Test Product', price: 99.99, description: 'Test Desc' }
        };
        const res = mockResponse();

        Product.create.mockResolvedValue(req.body);

        await productController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            message: "Product created successfully",
            data: expect.objectContaining({ name: 'Test Product', price: 99.99 })
        }));
    });

    it('should return 400 if save fails', async () => {
        const req = {
            body: { name: 'Test Product', price: 99.99 }
        };
        const res = mockResponse();

        Product.create.mockRejectedValue(new Error('Validation error'));

        await productController.save(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Validation error'
        });
    });

});