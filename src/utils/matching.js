/**
 * Calculates a transparent, deterministic compatibility score (0 - 100)
 * between the logged-in user profile and a candidate student.
 * 
 * Weights breakdown:
 * 1. Complementary Skill Synergy (max 40 pts):
 *    Recognizes classic synergistic pairings:
 *    - Frontend (React, Vue, Web) <-> Backend (Node, Python, Go, SQL, Docker)
 *    - Software Dev <-> AI/ML/Data Science (PyTorch, TensorFlow, NLP, Scikit)
 *    - Engineering <-> UI/UX / Product Design (Figma, Wireframing)
 *    - Technical <-> Product Management / Pitching
 *    - Software <-> Hardware / IoT / Robotics
 * 
 * 2. Shared Skills / Common Language (max 20 pts):
 *    Shared foundational tech stack (e.g. both know JavaScript, Python, or Git).
 * 
 * 3. Shared Interests (max 25 pts):
 *    Overlap in hackathons, web dev, open source, robotics, fintech, etc.
 * 
 * 4. Complementary Project Roles (max 15 pts):
 *    Different preferred roles (e.g., Frontend Lead vs Backend Lead or UI/UX Designer)
 *    avoiding role contention and ensuring a balanced team structure.
 */

const COMPLEMENTARY_MAP = {
  "React.js": ["Node.js", "Express", "FastAPI", "Python", "Go", "PostgreSQL", "Docker", "UI/UX", "Figma", "NLP"],
  "JavaScript": ["Python", "Node.js", "Docker", "C++", "SQL"],
  "Node.js": ["React.js", "Next.js", "Tailwind CSS", "Figma", "Flutter"],
  "Tailwind CSS": ["FastAPI", "Node.js", "Go", "Docker", "PostgreSQL"],
  "Python": ["React.js", "JavaScript", "Next.js", "Figma", "Flutter"],
  "PyTorch": ["React.js", "Next.js", "Tailwind CSS", "Flutter", "Product Management"],
  "NLP": ["React.js", "Frontend Lead", "UI/UX", "Next.js"],
  "FastAPI": ["React.js", "Next.js", "Tailwind CSS", "UI/UX"],
  "Figma": ["React.js", "Next.js", "Node.js", "Python", "Flutter"],
  "UI/UX": ["React.js", "Node.js", "Python", "Flutter", "Backend Lead"],
  "C++": ["React.js", "Python", "UI/UX", "Web3.js"],
  "Arduino": ["React.js", "Node.js", "Python", "Flutter"],
  "Flutter": ["Node.js", "FastAPI", "Go", "PostgreSQL", "Figma"],
  "Solidity": ["React.js", "Next.js", "UI/UX", "Node.js"],
  "Product Management": ["React.js", "Node.js", "Python", "PyTorch", "UI/UX"]
};

export const calculateCompatibility = (userProfile, student) => {
  if (!userProfile || !student) {
    return {
      score: 50,
      matchingSkills: [],
      complementarySkills: [],
      sharedInterests: [],
      reason: "Profiles have baseline academic compatibility."
    };
  }

  const userSkills = (userProfile.skills || []).map(s => s.toLowerCase());
  const userInterests = (userProfile.interests || []).map(i => i.toLowerCase());
  const userRoles = (userProfile.preferredRoles || []).map(r => r.toLowerCase());

  const studentSkills = student.skills || [];
  const studentInterests = student.interests || [];
  const studentRoles = student.preferredRoles || [];

  // 1. Shared Skills (Direct overlap)
  const sharedSkills = studentSkills.filter(s => 
    userSkills.includes(s.toLowerCase())
  );
  const sharedSkillScore = Math.min(sharedSkills.length * 7, 20);

  // 2. Complementary Skills (Synergistic pairings)
  const complementarySkillsSet = new Set();
  (userProfile.skills || []).forEach(uSkill => {
    const synergizeWith = COMPLEMENTARY_MAP[uSkill] || [];
    studentSkills.forEach(sSkill => {
      if (synergizeWith.some(target => target.toLowerCase() === sSkill.toLowerCase())) {
        complementarySkillsSet.add(sSkill);
      }
    });
  });
  const complementarySkills = Array.from(complementarySkillsSet);
  const complementarySkillScore = Math.min(complementarySkills.length * 12, 40);

  // 3. Shared Interests
  const sharedInterests = studentInterests.filter(interest =>
    userInterests.includes(interest.toLowerCase())
  );
  const interestScore = Math.min(sharedInterests.length * 9, 25);

  // 4. Role Complementarity
  // If their preferred roles are diverse and non-overlapping, team has better coverage
  const hasRoleOverlap = studentRoles.some(r => userRoles.includes(r.toLowerCase()));
  const roleScore = !hasRoleOverlap && studentRoles.length > 0 ? 15 : 7;

  // Base score 10 to ensure no student feels zeroed out
  let rawScore = 10 + sharedSkillScore + complementarySkillScore + interestScore + roleScore;
  const finalScore = Math.min(Math.max(rawScore, 35), 98); // Bound realistically between 35% and 98%

  // Build transparent human explanation
  let reason = "";
  if (complementarySkills.length > 0 && sharedInterests.length > 0) {
    reason = `Pairs ${complementarySkills.slice(0, 2).join(' & ')} with your frontend stack, plus shared passion for ${sharedInterests[0]}.`;
  } else if (complementarySkills.length > 0) {
    reason = `Brings high-demand complementary skills (${complementarySkills.slice(0, 2).join(', ')}) that round out your tech stack.`;
  } else if (sharedInterests.length > 0) {
    reason = `Aligns strongly on interests: ${sharedInterests.slice(0, 2).join(', ')}.`;
  } else {
    reason = `Versatile profile from ${student.department} with active collaboration availability.`;
  }

  return {
    score: finalScore,
    matchingSkills: sharedSkills,
    complementarySkills,
    sharedInterests,
    reason
  };
};

export const calculateProfileCompletion = (profile) => {
  if (!profile) return 0;
  let score = 0;
  if (profile.name) score += 15;
  if (profile.department) score += 15;
  if (profile.year) score += 10;
  if (profile.bio && profile.bio.length > 20) score += 15;
  if (profile.skills && profile.skills.length >= 3) score += 20;
  if (profile.interests && profile.interests.length >= 2) score += 15;
  if (profile.preferredRoles && profile.preferredRoles.length >= 1) score += 10;
  return Math.min(score, 100);
};

