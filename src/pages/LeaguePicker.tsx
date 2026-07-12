/**
 * LeaguePicker.tsx — Landing page: your newsletters + platform entry (#108).
 *
 * Two main sections:
 * 1. **Your Newsletters** (auth) — newsletters you edit, co-edit, or
 *    subscribe to, deduped, with role chips. The newsletter replaced the
 *    league as the top-level entity in #103.
 * 2. **Add a newsletter / browse** — platform picker cards routing to the
 *    login/entry flows, which lead to a league's home and its newsletter
 *    discovery page.
 *
 * This is the first page users see (mounted at `/league-picker`, with `/`
 * redirecting here). Anonymous visitors get the platform cards only —
 * public newsletters stay reachable via shared /n/{id} links.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import {
  getNewsletter,
  getNewslettersByEditor,
  getNewslettersByCoEditor,
} from "../services/firestoreCrud";
import { setSelectedNewsletter } from "../utils/selectedNewsletter";
import { seasonRange } from "./LeagueNewsletters";
import type { NewsletterDoc } from "../types/firestore";

/* ------------------------------------------------------------------ */
/*  Styled Components                                                  */
/* ------------------------------------------------------------------ */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 20px 10px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 8px;
  color: ${({ theme }: any) => theme.text};
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.7;
  margin-bottom: 32px;
  max-width: 500px;
  line-height: 1.5;
`;

const SectionLabel = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.5;
  margin-bottom: 16px;
  margin-top: 0;
`;

const PlatformGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PlatformCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: any) => theme.background};
  border: 2px solid ${({ theme }: any) => theme.neutral3}44;
  border-radius: 12px;
  padding: 24px 32px;
  cursor: pointer;
  width: 200px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme.neutral3};
    transform: translateY(-2px);
  }
`;

const PlatformIcon = styled.span`
  font-size: 36px;
  margin-bottom: 12px;
`;

const PlatformName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.text};
  margin-bottom: 4px;
`;

const PlatformHint = styled.span`
  font-size: 13px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.6;
`;

const Divider = styled.hr`
  width: 100%;
  max-width: 400px;
  border: none;
  border-top: 1px solid ${({ theme }: any) => theme.neutral3}33;
  margin: 8px 0 24px;
`;

const LeagueList = styled.div`
  width: 100%;
  max-width: 400px;
`;

const NewsletterCard = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }: any) => theme.background};
  border: 1px solid ${({ theme }: any) => theme.neutral3}44;
  border-radius: 10px;
  padding: 16px 18px;
  margin: 8px 0;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme.neutral3};
  }
`;

const NewsletterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  min-width: 0;
  text-align: left;
`;

const NewsletterName = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${({ theme }: any) => theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const NewsletterMeta = styled.span`
  font-size: 12px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.5;
`;

const RoleChip = styled.span`
  font-size: 11px;
  color: ${({ theme }: any) => theme.newsBlue};
  border: 1px solid ${({ theme }: any) => theme.newsBlue}66;
  border-radius: 10px;
  padding: 2px 8px;
  margin-left: 8px;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SignInHint = styled.p`
  font-size: 13px;
  color: ${({ theme }: any) => theme.text};
  opacity: 0.5;
  margin-top: 16px;
  line-height: 1.5;
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/** A newsletter card on the landing page, with the viewer's role attached. */
type MyNewsletter = NewsletterDoc & { id: string; role: "editor" | "co-editor" | "subscriber" };

function LeaguePicker(): React.ReactElement {
  const navigate = useNavigate();
  const { currentUser, profile, updateProfile } = useAuth();

  const subscribedIds = React.useMemo(
    () => profile?.subscribedNewsletterIds ?? [],
    [profile?.subscribedNewsletterIds]
  );

  // "Your Newsletters" = edit ∪ co-edit ∪ subscribed, deduped (role
  // precedence: editor > co-editor > subscriber). Dangling subscription IDs
  // (deleted newsletters) are dropped and lazily pruned from the profile.
  const { data: myNewsletters, isLoading: newslettersLoading } = useQuery({
    queryKey: ["myNewsletters", currentUser?.uid, subscribedIds.join(",")],
    enabled: !!currentUser,
    queryFn: async (): Promise<MyNewsletter[]> => {
      const [edited, coEdited] = await Promise.all([
        getNewslettersByEditor(currentUser!.uid),
        getNewslettersByCoEditor(currentUser!.uid),
      ]);
      const byId = new Map<string, MyNewsletter>();
      edited.forEach((nl) => byId.set(nl.id, { ...nl, role: "editor" }));
      coEdited.forEach((nl) => {
        if (!byId.has(nl.id)) byId.set(nl.id, { ...nl, role: "co-editor" });
      });
      const dangling: string[] = [];
      await Promise.all(
        subscribedIds
          .filter((id) => !byId.has(id))
          .map(async (id) => {
            const nl = await getNewsletter(id);
            if (nl) byId.set(id, { ...nl, id, role: "subscriber" });
            else dangling.push(id);
          })
      );
      if (dangling.length > 0) {
        updateProfile({
          subscribedNewsletterIds: subscribedIds.filter((id) => !dangling.includes(id)),
        });
      }
      return [...byId.values()];
    },
  });

  const openNewsletter = (nl: MyNewsletter): void => {
    setSelectedNewsletter(nl.id, nl.activeLeagueId);
    navigate(`/n/${nl.id}`);
  };

  return (
    <Container>
      <Title>The Offensive Line</Title>
      <Subtitle>
        Weekly fantasy football recaps for any league. Pick your platform to get started — no
        account required.
      </Subtitle>

      {/* --- Your Newsletters (signed-in users only) --- */}
      {currentUser && (myNewsletters?.length ?? 0) > 0 && (
        <>
          <SectionLabel>Your Newsletters</SectionLabel>
          <LeagueList>
            {myNewsletters!.map((nl) => (
              <NewsletterCard key={nl.id} onClick={() => openNewsletter(nl)}>
                <NewsletterInfo>
                  <NewsletterName>{nl.name}</NewsletterName>
                  <NewsletterMeta>
                    {seasonRange(nl)} · ed. {nl.editorName || "unknown"}
                  </NewsletterMeta>
                </NewsletterInfo>
                <RoleChip>{nl.role}</RoleChip>
              </NewsletterCard>
            ))}
          </LeagueList>
          <Divider />
        </>
      )}
      {currentUser && newslettersLoading && <SignInHint>Loading your newsletters…</SignInHint>}

      {/* --- Platform picker: the path to a league's newsletters --- */}
      <SectionLabel>
        {currentUser && (myNewsletters?.length ?? 0) > 0 ? "Add a Newsletter" : "Get Started"}
      </SectionLabel>
      <PlatformGrid>
        <PlatformCard onClick={() => navigate("/sleeper-login")}>
          <PlatformIcon>😴</PlatformIcon>
          <PlatformName>Sleeper</PlatformName>
          <PlatformHint>Enter username or league ID</PlatformHint>
        </PlatformCard>
        <PlatformCard onClick={() => navigate("/espn-login")}>
          <PlatformIcon>🏈</PlatformIcon>
          <PlatformName>ESPN</PlatformName>
          <PlatformHint>Enter league ID</PlatformHint>
        </PlatformCard>
        <PlatformCard onClick={() => navigate("/yahoo-login")}>
          <PlatformIcon>🟣</PlatformIcon>
          <PlatformName>Yahoo</PlatformName>
          <PlatformHint>Sign in with Yahoo</PlatformHint>
        </PlatformCard>
      </PlatformGrid>

      {/* --- Sign-in nudge for anonymous users --- */}
      {!currentUser && (
        <SignInHint>
          Want to save your leagues?{" "}
          <a href="/profile" style={{ color: "inherit", textDecoration: "underline" }}>
            Sign in with Google
          </a>{" "}
          to keep them synced across devices.
        </SignInHint>
      )}
    </Container>
  );
}

export default LeaguePicker;
