import * as skillController from '../Controller/User/skillController.js';
import { Skill, User } from '../Model/User/index.js';

// Mock path must match EXACTLY what controller imports
jest.mock('../Model/User/index.js', () => ({
    Skill: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    },
    User: {}
}));

describe('Skill Controller', () => {

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── GET all skills ──────────────────────────────────────
    it('should return all skills', async () => {
        const req = {};
        const res = mockResponse();

        Skill.findAll.mockResolvedValue([
            { id: 1, name: 'JavaScript', category: 'Programming' }
        ]);

        await skillController.getAllSkills(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ id: 1, name: 'JavaScript' })
        ]));
    });

    it('should return 500 if getAllSkills fails', async () => {
        const req = {};
        const res = mockResponse();

        Skill.findAll.mockRejectedValue(new Error('Database error'));

        await skillController.getAllSkills(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

    // ── GET skills by userId ────────────────────────────────
    it('should return skills for a specific user', async () => {
        const req = { params: { userId: 1 } };
        const res = mockResponse();

        Skill.findAll.mockResolvedValue([
            { id: 1, name: 'JavaScript', userId: 1 }
        ]);

        await skillController.getUserSkills(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ userId: 1 })
        ]));
    });

    it('should return 500 if getUserSkills fails', async () => {
        const req = { params: { userId: 1 } };
        const res = mockResponse();

        Skill.findAll.mockRejectedValue(new Error('Database error'));

        await skillController.getUserSkills(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

    // ── POST add skill ──────────────────────────────────────
    it('should create a new skill', async () => {
        const req = {
            body: {
                name: 'JavaScript',
                category: 'Programming',
                description: 'JS language',
                experience: 3,
                userId: 1
            }
        };
        const res = mockResponse();

        Skill.create.mockResolvedValue(req.body);

        await skillController.addSkill(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'JavaScript' }));
    });

    it('should return 500 if addSkill fails', async () => {
        const req = { body: { name: 'JavaScript', category: 'Programming', userId: 1 } };
        const res = mockResponse();

        Skill.create.mockRejectedValue(new Error('Database error'));

        await skillController.addSkill(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

    // ── PUT update skill ────────────────────────────────────
    it('should update a skill', async () => {
        const req = { params: { id: 1 }, body: { name: 'Updated JS' } };
        const res = mockResponse();

        const mockSkill = {
            update: jest.fn().mockResolvedValue(true),
            ...req.body
        };
        Skill.findByPk.mockResolvedValue(mockSkill);

        await skillController.updateSkill(req, res);

        expect(res.json).toHaveBeenCalledWith(mockSkill);
    });

    it('should return 404 if skill not found on update', async () => {
        const req = { params: { id: 99 }, body: { name: 'Updated JS' } };
        const res = mockResponse();

        Skill.findByPk.mockResolvedValue(null);

        await skillController.updateSkill(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Skill not found' });
    });

    it('should return 500 if updateSkill fails', async () => {
        const req = { params: { id: 1 }, body: { name: 'Updated JS' } };
        const res = mockResponse();

        Skill.findByPk.mockRejectedValue(new Error('Database error'));

        await skillController.updateSkill(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

    // ── DELETE skill ────────────────────────────────────────
    it('should delete a skill', async () => {
        const req = { params: { id: 1 } };
        const res = mockResponse();

        const mockSkill = { destroy: jest.fn().mockResolvedValue(true) };
        Skill.findByPk.mockResolvedValue(mockSkill);

        await skillController.deleteSkill(req, res);

        expect(res.json).toHaveBeenCalledWith({ message: 'Skill deleted successfully' });
    });

    it('should return 404 if skill not found on delete', async () => {
        const req = { params: { id: 99 } };
        const res = mockResponse();

        Skill.findByPk.mockResolvedValue(null);

        await skillController.deleteSkill(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Skill not found' });
    });

    it('should return 500 if deleteSkill fails', async () => {
        const req = { params: { id: 1 } };
        const res = mockResponse();

        Skill.findByPk.mockRejectedValue(new Error('Database error'));

        await skillController.deleteSkill(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

});