# Pair Programming Workflow

## Overview

This document outlines our pair programming workflow for developing The Offensive Line fantasy football website. It ensures consistent process, proper testing, and knowledge capture as we work through the project plan.

## Story Workflow Process

### 1. Story Selection & Planning

**Claude's Actions:**

- Pick up the next ⏳ **Pending** story from the `project_plan` markdown file
- Review the story's acceptance criteria and testing requirements
- Create a brief implementation plan (2-3 bullet points)
- **Confirm plan with human before proceeding**

### 2. Implementation Preparation

**Claude's Actions:**

- After brief plan is approved by human, create a comprehensive implementation plan
- Build a detailed todo list for the story implementation using TodoWrite tool
- Review `CLAUDE.md` for project-specific commands and architecture notes
- Update todo list to mark story as "in_progress"
- Read any relevant existing files to understand current state

### 3. Implementation

**Claude's Actions:**

- Implement the story following acceptance criteria
- Write clean, well-structured code following established patterns
- Use proper error handling where needed

### 4. Testing & Verification

**Claude's Actions:**

- Run unit tests: `yarn test`
- Verify API integrations (Sleeper API, Firebase) work as expected

### 5. Human Verification Request

**Claude's Actions:**

- Summarize what was implemented
- **Provide specific testing steps for the human**
- **Prompt human to verify in testing environment**

**Required format:**

> "## Story X.Y Implementation Complete!
>
> **Changes made:**
>
> - [Bulleted list of key changes]
>
> **Expected results:**
>
> - [What UI changes should be visible]
> - [What functionality should work]
> - [Any specific user flows to test]
>
> **Testing performed:**
>
> - [List of tests run and results]
>
> **Ready for your verification!**"

### 6. Human Testing & Feedback

**Human's Actions:**

- Start the dev server with `yarn start`
- Navigate to relevant pages in the browser
- Check for console errors and warnings in browser
- Test the new functionality or UI changes
- Check for visual issues, console errors, or bugs
- Provide feedback: "Perfect! That worked!" or describe issues

**If Issues Found:**

- Human describes what went wrong (visual bugs, errors, incorrect behavior, etc.)
- Claude investigates and fixes the issues
- Return to step 4 (Testing & Verification) after fixes
- Repeat until verification succeeds

### 7. Story Completion

**Claude's Actions (after human confirms success):**

- Mark story as ✅ **Completed** in the `project_plan` markdown file
- Update todo list to completed
- Update progress tracking in the `project_plan` markdown file
- Update technical_considerations.md with lessons learned
- Suggest additions to allowed commands based on this session.

## Documentation Updates

### During Each Story

**Claude should update these files as needed:**

#### CLAUDE.md Updates

- Add new commands discovered during implementation
- Update architecture notes if patterns change
- Document any new dependencies or tools
- Note any gotchas or important considerations

#### technical_considerations.md Updates

- Document technical decisions and rationale
- Record issues encountered and solutions
- Note what works well and what to avoid
- Capture performance considerations
- Document testing strategies that work

## Quality Checks

### Before Marking Story Complete

- [ ] All acceptance criteria met
- [ ] All tests pass (`yarn test`)
- [ ] No new console errors or warnings in browser
- [ ] Code follows project conventions (see STYLE.md)
- [ ] UI renders correctly in light and dark themes
- [ ] Mobile responsiveness checked (if applicable)
- [ ] Error handling for API failures (Sleeper, Firebase)
- [ ] Loading states implemented where needed
- [ ] Relevant documentation updated
- [ ] Human verification completed in browser

### Code Quality Standards

- Use TypeScript types properly (no `any` without justification)
- Follow existing patterns for styled-components
- Use ColorConstants for theme colors (from [ColorConstants.ts](src/components/constants/ColorConstants.ts))
- Handle errors gracefully with user-friendly messages
- Validate external API data (Sleeper API, Firebase)
- Write clear, self-documenting code
- Keep components focused and reusable
- Add loading states for async operations
- Follow color scheme from STYLE.md

## Communication Patterns

### Starting a Story

Claude: "Ready for Story X.Y: [Title]. My plan: [brief plan]. Does this approach sound good?"

### During Implementation

Claude: [Work silently through implementation, testing, and verification]

### Requesting Verification

Claude: "Story X.Y implementation complete! Changes: [summary]. Please verify: [specific things to check]. Ready for your verification!"

### After Human Confirmation

Claude: "Great! Marking Story X.Y as completed. Moving to next story..."

## Emergency Procedures

### If Story Becomes Too Complex

- Break it down into smaller sub-tasks
- Document the breakdown in `aigen/technical_considerations.md`
- Get human approval for the new approach

### If Architecture Changes Needed

- Document the change rationale in `aigen/technical_considerations.md`
- Get human approval before major changes

### If Stuck on Technical Issue

- Document the issue in `aigen/technical_considerations.md`
- Propose 2-3 alternative approaches
- Ask human for guidance

### If External API Changes (Sleeper or Firebase)

- Document the API change or issue
- Update TypeScript type definitions in `/src/types/`
- Update API wrapper functions in `/src/utils/api/`
- Test with real API responses to verify changes
- Check that all affected components still work

## Success Metrics

- Stories completed per session
- Test success rate (should be 100%)
- No console errors or warnings
- Quality of human verification feedback
- UI/UX quality and consistency
- Documentation completeness
- Knowledge capture effectiveness

## Project-Specific Notes

### Styling Guidelines

- Always use ColorConstants from [ColorConstants.ts](src/components/constants/ColorConstants.ts)
- Follow newspaper aesthetic defined in [STYLE.md](STYLE.md)
- Use styled-components (existing pattern in codebase)
- Test theme switching between light and dark modes
- Background colors: `#ECECDF` (light), `#2E2E2E` (dark)

### API Integration

- **Sleeper API**: Use functions from [SleeperAPI.ts](src/utils/api/SleeperAPI.ts)
- **Firebase**: Use `db` from [firebase.js](src/firebase.js)
- **Discord**: Use discord webhook service in `/discord-webhook-service`
- Always handle loading states and errors
- Use react-query for caching and data fetching

---

This workflow ensures we maintain quality, capture knowledge, and make steady progress on The Offensive Line website development.
