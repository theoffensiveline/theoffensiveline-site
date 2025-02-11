import styled from 'styled-components';
import { colorsByPosition } from '../constants/ColorConstants';

export const Container = styled.div`
  padding: 20px;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.newsBlue};
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 15px;
`;

export const PlayerPhoto = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 0%;
  object-fit: cover;

  &:error {
    display: none;
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

export const PlayerName = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.text};
`;

export const PlayerPosition = styled.span<{ position: string }>`
  background-color: ${({ position }) => colorsByPosition[position] || colorsByPosition.FLEX};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 1em;
  margin-right: 8px;
  min-width: 25px;
  text-align: center;
  height: 25px;
`;

export const PlayerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
`;
