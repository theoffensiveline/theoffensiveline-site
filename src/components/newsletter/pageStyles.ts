/**
 * Shared page chrome for the dynamic-newsletter pages (#84 swarm review).
 * These were byte-identical copies in NewsletterHome/NewsletterSettings and
 * IssueBuilder/IssueReader after the pages were split — centralised so a
 * palette or layout tweak can't silently miss one copy. Components that
 * diverge per page stay local to that page.
 */
import styled from "styled-components";

/** Centered column layout for the newsletter home/settings pages. */
export const PageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

/** Page heading for the newsletter home/settings pages. */
export const PageTitle = styled.h1`
  font-size: 26px;
  margin-bottom: 4px;
  color: ${({ theme }: any) => theme.text};
`;

export const SectionLabel = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.5;
  margin: 20px 0 12px;
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }: any) => theme.newsBlue};
  color: ${({ theme }: any) => theme.background};
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

/** Narrow column wrapper for the builder/reader issue pages. */
export const IssuePage = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 8px;
`;

export const Centered = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }: any) => theme.text};
`;
