import styled from 'styled-components';
import {
  Card as CardMaterial,
  Avatar as AvatarMaterial,
  CardActions as CardActionsMaterial,
} from '@material-ui/core';

const DivMain = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-start;
  background: url('https://source.unsplash.com/random/1600x900');
  background-repeat: no-repeat;
  background-size: cover;
`;

const Card = styled(CardMaterial)`
  min-width: 300;
  margin-top: 6em;
`;

const Avatar = styled.div`
  margin: 1em;
  display: flex;
  justify-content: center;
`;

const AvatarIcon = styled(AvatarMaterial)`
  background: grey;
`;

const Hint = styled.div`
  padding: 0 1em 1em 1em;
`;

const FormDiv = styled.div`
  padding: 0 1em 1em 1em;
`;

const InputDiv = styled.div`
  padding: 0 1em 1em 1em;
`;

const CardActions = styled(CardActionsMaterial)`
  padding: 0 1em 1em 1em;
`;

export {
  DivMain,
  Card,
  Avatar,
  AvatarIcon,
  Hint,
  FormDiv,
  InputDiv,
  CardActions,
};
