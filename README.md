# CampusConnect — Your Campus, Connected

A modern, responsive web application designed as a smart campus and student life companion. Built with React, Tailwind CSS, Lucide icons, and React Router DOM.

## 🚀 Key Features

1. **Landing Page**: Modern hero section with feature highlights, workflow walkthrough, live interactive dashboard preview, and direct CTAs.
2. **Student Dashboard**: 
   - Welcome overview with dynamic profile completion percentage
   - Quick statistics (registered events, saved opportunities, active requests, community posts)
   - Algorithmic teammate recommendations
   - Upcoming campus workshops & hackathons
   - Curated opportunities based on profile interests
3. **Campus Event Hub**:
   - Filter by categories: Hackathons, Workshops, Technical Events, Cultural, Seminars, Sports
   - Real-time seat tracking and registration/cancellation with localStorage persistence
   - Search by keyword, organizer, or venue
   - Bookmarking and full modal inspection
4. **Smart Team Finder (AI-inspired Matching Engine)**:
   - Transparent deterministic formula calculating compatibility scores (0–100%)
   - Weighs complementary skills (Frontend ↔ Backend/AI/Design/Hardware), shared skills, interests, and non-overlapping project roles
   - Filter by department, academic year, and specific tech stack
   - Send, accept, decline, or withdraw team collaboration requests
5. **Opportunity Board**:
   - Summer internships, research programs, scholarships, and coding competitions
   - Deadline countdown tracking
   - "Apply Now" simulation with modal and status persistence
6. **Campus Community Feed**:
   - Discussion forum categorized by Technical, Events, Academics, Opportunities, and General
   - Real-time likes and threaded comments
   - Author deletion controls for own posts
7. **Student Profile**:
   - Editable student bio, department, academic year, skills tags, roles, and availability
   - Real-time profile strength meter
   - Reset Demo Data option with safe confirmation dialog
8. **Saved Items**:
   - Central repository for bookmarked events, opportunities, and prospective teammates

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Lucide React**
- **React Router DOM (v6)**
- **LocalStorage Storage Engine**

## 💻 Local Development

```bash
npm install
npm run dev
```

## 📦 Build for Production

```bash
npm run build
```
Optimized for deployment on Vercel with single-page app rewrite rule in `vercel.json`.

