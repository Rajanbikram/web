const SequelizeMock = require('sequelize-mock');

// ── Setup mock DB ──────────────────────────────────────────
const dbMock = new SequelizeMock();

// ── Define Mocked Skill Model ──────────────────────────────
const SkillMock = dbMock.define('Skill', {
  id: 1,
  name: 'Python Programming',
  category: 'Technology',
  description: 'Learn Python from scratch',
  experience: 'Intermediate',
  rating: 4.5,
  reviewCount: 10,
  userId: 1,
});

// ── Test Suite ─────────────────────────────────────────────
describe('Skill Model', () => {

  // ── TEST 1: Create a skill ────────────────────────────────
  it('should create a skill with correct fields', async () => {
    const skill = await SkillMock.create({
      name: 'Guitar Basics',
      category: 'Music',
      description: 'Learn basic guitar chords',
      experience: 'Beginner',
      rating: 4.0,
      reviewCount: 5,
      userId: 2,
    });

    expect(skill.name).toBe('Guitar Basics');
    expect(skill.category).toBe('Music');
    expect(skill.description).toBe('Learn basic guitar chords');
    expect(skill.experience).toBe('Beginner');
    expect(skill.rating).toBe(4.0);
    expect(skill.reviewCount).toBe(5);
    expect(skill.userId).toBe(2);
  });

  // ── TEST 2: Find a skill by ID ────────────────────────────
  it('should find a skill by primary key', async () => {
    const skill = await SkillMock.findByPk(1);

    expect(skill).not.toBeNull();
    expect(skill.id).toBe(1);
    expect(skill.name).toBe('Python Programming');
  });

  // ── TEST 3: Default values are numbers ───────────────────
  it('should have default rating and reviewCount as numbers', async () => {
    const skill = await SkillMock.create({
      name: 'Spanish Language',
      category: 'Languages',
      userId: 3,
    });

    expect(typeof skill.rating).toBe('number');
    expect(typeof skill.reviewCount).toBe('number');
  });

  // ── TEST 4: Update a skill ────────────────────────────────
  it('should update skill name', async () => {
    const skill = await SkillMock.findByPk(1);
    await skill.update({ name: 'Advanced Python' });

    expect(skill.name).toBe('Advanced Python');
  });

  // ── TEST 5: Find all skills ───────────────────────────────
  it('should return a list of skills', async () => {
    const skills = await SkillMock.findAll();

    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  // ── TEST 6: Delete a skill ────────────────────────────────
  it('should delete a skill', async () => {
    const skill = await SkillMock.findByPk(1);
    const result = await skill.destroy();

    expect(result).toBeDefined();
  });

});