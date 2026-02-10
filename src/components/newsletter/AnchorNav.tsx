import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface AnchorNavProps {
  sections: Array<{ id: string; label: string; isReady: boolean }>;
}

const NavContainer = styled.nav`
  padding: 12px 8px;
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 12px 0;
  }

  @media (min-width: 769px) {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    align-self: flex-start;
  }
`;

const NavTitle = styled.div`
  font-family: "Playfair Display", serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;

  @media (min-width: 769px) {
    display: none;
  }
`;

const DesktopNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileSelect = styled.select`
  display: none;
  width: 100%;
  padding: 8px;
  font-family: "Playfair Display", serif;
  font-size: 14px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.newsBlue};
  }
`;

const NavLink = styled.a<{ $isActive: boolean; $isDisabled: boolean }>`
  display: block;
  padding: 6px 10px;
  font-family: "Playfair Display", serif;
  font-size: 13px;
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.neutral3 : theme.text};
  text-decoration: none;
  border-left: 3px solid
    ${({ theme, $isActive, $isDisabled }) =>
      $isDisabled
        ? "transparent"
        : $isActive
          ? theme.newsBlue
          : "transparent"};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.background : "transparent"};
  transition: all 0.2s ease;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};

  &:hover {
    ${({ $isDisabled, theme }) =>
      !$isDisabled &&
      `
      background: ${theme.background};
      border-left-color: ${theme.newsBlue};
    `}
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.newsBlue};
    outline-offset: -2px;
  }
`;

/**
 * AnchorNav - Navigation for newsletter sections
 *
 * Desktop: Sticky sidebar with links
 * Mobile: Dropdown select menu
 * Automatically tracks active section based on scroll position
 */
export const AnchorNav: React.FC<AnchorNavProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Find active section based on scroll position
      const scrollPosition = window.scrollY + 120; // Offset for sticky nav

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (!section.isReady) continue;

        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky nav
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const readySections = sections.filter((s) => s.isReady);

  if (readySections.length === 0) {
    return null; // Don't show nav if no sections are ready
  }

  return (
    <NavContainer aria-label="Section navigation">
      <NavTitle>Jump to Section</NavTitle>

      {/* Desktop: Vertical links */}
      <DesktopNav>
        {sections.map((section) => (
          <NavLink
            key={section.id}
            href={`#${section.id}`}
            $isActive={activeSection === section.id}
            $isDisabled={!section.isReady}
            onClick={(e) =>
              section.isReady ? handleNavClick(e, section.id) : e.preventDefault()
            }
            aria-current={activeSection === section.id ? "location" : undefined}
            aria-disabled={!section.isReady}
          >
            {section.label}
          </NavLink>
        ))}
      </DesktopNav>

      {/* Mobile: Dropdown */}
      <MobileSelect
        value={activeSection}
        onChange={handleSelectChange}
        aria-label="Navigate to section"
      >
        <option value="">Select a section...</option>
        {sections.map((section) => (
          <option
            key={section.id}
            value={section.id}
            disabled={!section.isReady}
          >
            {section.label}
            {!section.isReady ? " (Loading...)" : ""}
          </option>
        ))}
      </MobileSelect>
    </NavContainer>
  );
};
