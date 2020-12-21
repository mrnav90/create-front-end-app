import styled, { css } from 'styled-components';
import Modal from 'react-modal';
import Button from 'components/FormUI/Button';

const overrideStyles = {
  '.modal-xxx': `
      min-width: 650px;
  `,
};

const overrideStylesTransformed = Object.keys(overrideStyles)
  .map(className => `&${className}{${overrideStyles[className]}}`)
  .join('\n');

const placeStyles = {
  top: () => `
    top: 5% !important;
    transform: translate(-50%, 0) !important;
  `,
};

export const StyledModal = styled(Modal)`
  &.ReactModal {
    &__Content {
      &--after-open {
        ${props =>
          props.placement &&
          props.placement
            .split('-')
            .map(place => placeStyles[place](props))
            .join('\n')}
        ${overrideStylesTransformed}
      }
    }
  }
`;

export const Title = styled.h2`
  font-weight: 400;
  margin-top: 5px;
  text-align: center;
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin-top: ${props => (props.secondary ? '15px' : '25px')};

  ${Button} {
    margin: 0 10px;
  }
`;

export const FormLabel = styled.div`
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
  margin: 10px 20px 10px 0;
  width: ${props => (props.width ? `${props.width}` : '20%')};
  ${props =>
    props.required &&
    css`
      &:after {
        content: '*';
        color: #d90909;
      }
    `}
`;

export const FormRowContent = styled.div`
  flex-grow: 1;
  flex-basis: 1px;
  display: flex;
  justify-content: space-between;

  /**
    NOTE: Fix overflow hidden when content too long
    We can use width: 1px || overflow: hidden || min-width: 0
    But overflow: hidden make select options hidden
    And width: 1px caused bug layout in IE11
  */
  min-width: 0;
`;

export const FormNote = styled.small`
  color: #808080;
  display: block;
  font-size: 13px;
  margin-top: 8px;
`;

export const FormRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;

  ${FormLabel} {
    text-align: ${props => props.labelAlign || 'left'};
  }
`;

export const DangerAction = styled(Button).attrs({
  transparent: true,
  small: true,
  type: 'button',
})`
  align-items: center;
  display: inline-flex;
  color: #d90909;
  font-size: 13px;
`;
