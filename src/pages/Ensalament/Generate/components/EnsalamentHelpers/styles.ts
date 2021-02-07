import styled, { css } from 'styled-components';

interface DivTeamProps {
  onRomm: boolean;
  isDragging: boolean;
}

const DivTeam = styled.div`
  background-color: ${(props: DivTeamProps) =>
    props.onRomm ? '#f0f1f2' : '#e1e8f2'};
  border: 1px solid rgb(0, 0, 0);
  cursor: pointer;
  ${(props: DivTeamProps) =>
    props.isDragging &&
    css`
      border: 1px dashed rgba(0, 0, 0, 0.5);
      background: transparent;
      color: transparent;
    `}
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { DivTeam, ModalContent, ModalHeader };
