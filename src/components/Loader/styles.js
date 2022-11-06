import styled from 'styled-components/native';

export const LoaderContainer = styled.View`
    height: 100%;
    width: 100%;
    position: absolute;
    justify-content: center;
    align-items: center;
    elevation: 99999;/*this is because elevation are working like z-index*/
    background-color: ${({ theme }) => theme.$opaqueBlackBackgroundColor};
    flex-direction: row;
`;
