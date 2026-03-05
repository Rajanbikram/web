import * as adminController from '../Controller/Admin/adminController.js';
import { User, Skill, SkillRequest } from '../Model/User/index.js';
import AdminReport from '../Model/Admin/ReportModel.js';

// Mock Models
jest.mock('../Model/User/index.js', () => ({
    User: {
        count: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    },
    Skill: {
        count: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    },
    SkillRequest: {
        count: jest.fn(),
    }
}));

jest.mock('../Model/Admin/ReportModel.js', () => ({
    default: {
        count: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
    }
}));

describe('Admin Controller', () => {

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ── GET /api/admin/stats ────────────────────────────────
    describe('getStats', () => {
        it('should return all stats', async () => {
            const req = {};
            const res = mockResponse();

            User.count.mockResolvedValue(10);
            Skill.count.mockResolvedValue(20);
            SkillRequest.count.mockResolvedValue(5);
            AdminReport.count.mockResolvedValue(3);

            await adminController.getStats(req, res);

            expect(res.json).toHaveBeenCalledWith({
                totalUsers: 10,
                totalSkills: 20,
                activeRequests: 5,
                pendingReports: 3
            });
        });

        it('should return 500 if getStats fails', async () => {
            const req = {};
            const res = mockResponse();

            User.count.mockRejectedValue(new Error('Database error'));

            await adminController.getStats(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error fetching stats'
            }));
        });
    });

    // ── GET /api/admin/users ────────────────────────────────
    describe('getAllUsers', () => {
        it('should return all users mapped', async () => {
            const req = {};
            const res = mockResponse();

            User.findAll.mockResolvedValue([
                { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com', role: 'user', createdAt: new Date() }
            ]);

            await adminController.getAllUsers(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ id: 1, name: 'John Doe', email: 'john@test.com', status: 'active' })
            ]));
        });

        it('should return 500 if getAllUsers fails', async () => {
            const req = {};
            const res = mockResponse();

            User.findAll.mockRejectedValue(new Error('Database error'));

            await adminController.getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error fetching users'
            }));
        });
    });

    // ── PATCH /api/admin/users/:id/block ───────────────────
    describe('toggleBlockUser', () => {
        it('should block an active user', async () => {
            const req = { params: { id: 1 } };
            const res = mockResponse();

            const mockUser = {
                id: 1, firstName: 'John', lastName: 'Doe',
                email: 'john@test.com', role: 'user',
                save: jest.fn().mockResolvedValue(true)
            };
            User.findByPk.mockResolvedValue(mockUser);

            await adminController.toggleBlockUser(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'User blocked'
            }));
        });

        it('should unblock a blocked user', async () => {
            const req = { params: { id: 1 } };
            const res = mockResponse();

            const mockUser = {
                id: 1, firstName: 'John', lastName: 'Doe',
                email: 'john@test.com', role: 'blocked',
                save: jest.fn().mockResolvedValue(true)
            };
            User.findByPk.mockResolvedValue(mockUser);

            await adminController.toggleBlockUser(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'User unblocked'
            }));
        });

        it('should return 404 if user not found', async () => {
            const req = { params: { id: 99 } };
            const res = mockResponse();

            User.findByPk.mockResolvedValue(null);

            await adminController.toggleBlockUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should return 500 if toggleBlockUser fails', async () => {
            const req = { params: { id: 1 } };
            const res = mockResponse();

            User.findByPk.mockRejectedValue(new Error('Database error'));

            await adminController.toggleBlockUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error updating user'
            }));
        });
    });

    // ── GET /api/admin/skills ───────────────────────────────
    describe('getAllSkills', () => {
        it('should return all skills mapped', async () => {
            const req = {};
            const res = mockResponse();

            Skill.findAll.mockResolvedValue([
                { id: 1, name: 'JavaScript', category: 'Programming', User: { firstName: 'John', lastName: 'Doe' }, createdAt: new Date(), status: 'active' }
            ]);

            await adminController.getAllSkills(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ id: 1, title: 'JavaScript', postedBy: 'John Doe' })
            ]));
        });

        it('should return 500 if getAllSkills fails', async () => {
            const req = {};
            const res = mockResponse();

            Skill.findAll.mockRejectedValue(new Error('Database error'));

            await adminController.getAllSkills(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error fetching skills'
            }));
        });
    });

    // ── DELETE /api/admin/skills/:id ───────────────────────
    describe('removeSkill', () => {
        it('should delete a skill', async () => {
            const req = { params: { id: 1 } };
            const res = mockResponse();

            const mockSkill = { destroy: jest.fn().mockResolvedValue(true) };
            Skill.findByPk.mockResolvedValue(mockSkill);

            await adminController.removeSkill(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'Skill removed successfully' });
        });

        it('should return 404 if skill not found', async () => {
            const req = { params: { id: 99 } };
            const res = mockResponse();

            Skill.findByPk.mockResolvedValue(null);

            await adminController.removeSkill(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Skill not found' });
        });

        it('should return 500 if removeSkill fails', async () => {
            const req = { params: { id: 1 } };
            const res = mockResponse();

            Skill.findByPk.mockRejectedValue(new Error('Database error'));

            await adminController.removeSkill(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error removing skill'
            }));
        });
    });

    // ── GET /api/admin/reports ─────────────────────────────
    describe('getAllReports', () => {
        it('should return all reports', async () => {
            const req = {};
            const res = mockResponse();

            AdminReport.findAll.mockResolvedValue([
                { id: 1, status: 'pending' }
            ]);

            await adminController.getAllReports(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ id: 1, status: 'pending' })
            ]));
        });

        it('should return 500 if getAllReports fails', async () => {
            const req = {};
            const res = mockResponse();

            AdminReport.findAll.mockRejectedValue(new Error('Database error'));

            await adminController.getAllReports(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error fetching reports'
            }));
        });
    });

    // ── PATCH /api/admin/reports/:id ───────────────────────
    describe('resolveReport', () => {
        it('should resolve a report', async () => {
            const req = { params: { id: 1 }, body: { status: 'resolved' } };
            const res = mockResponse();

            const mockReport = {
                id: 1, status: 'pending',
                save: jest.fn().mockResolvedValue(true)
            };
            AdminReport.findByPk.mockResolvedValue(mockReport);

            await adminController.resolveReport(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Report resolved'
            }));
        });

        it('should return 404 if report not found', async () => {
            const req = { params: { id: 99 }, body: { status: 'resolved' } };
            const res = mockResponse();

            AdminReport.findByPk.mockResolvedValue(null);

            await adminController.resolveReport(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Report not found' });
        });

        it('should return 500 if resolveReport fails', async () => {
            const req = { params: { id: 1 }, body: { status: 'resolved' } };
            const res = mockResponse();

            AdminReport.findByPk.mockRejectedValue(new Error('Database error'));

            await adminController.resolveReport(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Error updating report'
            }));
        });
    });

});