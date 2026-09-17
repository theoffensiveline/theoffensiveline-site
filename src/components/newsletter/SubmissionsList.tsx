/**
 * SubmissionsList (#submit) — renders user-submitted blurbs at the bottom of
 * an issue in the reader. Each submission shows its title, author, and body.
 * A bare image URL in `text` renders as an <img>; a bare tweet URL renders
 * as an embedded tweet; otherwise plain text.
 */
import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getSubmissions } from "../../services/firestoreCrud";
import { isImageUrl, getTweetId } from "../../utils/submissionUtils";
import { TweetEmbed } from "./TweetEmbed";
import { ArticleSubheader } from "../newsletters/newsStyles";

const Wrapper = styled.div`
  margin-top: 32px;
`;

const SubmissionCard = styled.div`
  margin: 16px 0;
  padding: 12px 8px;
  border-top: 1px solid ${({ theme }) => theme.text}33;
`;

const SubmissionTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 4px;
`;

const SubmissionAuthor = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text}99;
  margin-top: 8px;
`;

const SubmissionBody = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  white-space: pre-wrap;
  word-break: break-word;
`;

const SubmissionImage = styled.img`
  max-width: 100%;
  width: 100%;
  margin-top: 4px;
`;

interface SubmissionsListProps {
  newsletterId: string;
  issueId: string;
}

export function SubmissionsList({
  newsletterId,
  issueId,
}: SubmissionsListProps): React.ReactElement | null {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["submissions", newsletterId, issueId],
    queryFn: () => getSubmissions(newsletterId, issueId),
  });

  if (isLoading || isError || !data || data.length === 0) return null;

  return (
    <Wrapper>
      <ArticleSubheader>Reader Submissions</ArticleSubheader>
      {data.map((s) => {
        const tweetId = getTweetId(s.text);
        return (
          <SubmissionCard key={s.id}>
            {s.title && <SubmissionTitle>{s.title}</SubmissionTitle>}
            {isImageUrl(s.text) ? (
              <SubmissionImage src={s.text.trim()} alt={s.title || "submission"} />
            ) : tweetId ? (
              <TweetEmbed tweetId={tweetId} url={s.text.trim()} />
            ) : (
              <SubmissionBody>{s.text}</SubmissionBody>
            )}
            <SubmissionAuthor>— {s.authorName}</SubmissionAuthor>
          </SubmissionCard>
        );
      })}
    </Wrapper>
  );
}
