import styled from 'styled-components/native';
import H2 from '../H2';

export const MainContainer = styled.View`
    flex: 1; 
    justify-content: center;
    margin: 10px 0;
    flex-direction: column;
    width: 100%;
`;

export const ModalContainer = styled.View`
    margin: 10px;
    padding-bottom: 5px;
    max-height: 100%;
    width: auto;
    background-color: white;
    border-radius: ${({ theme }) => theme.$mediumBorderRadius}px;
`;

export const HeaderContainer = styled.View`
    padding: 10px;
    width: auto;
`;

export const H2Custom = styled(H2)`
    text-align: center;
`;

export const ScrollViewCustom = styled.ScrollView`
    padding: 0 10px 0;
`;
