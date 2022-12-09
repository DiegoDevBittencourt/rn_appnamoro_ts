import styled from 'styled-components/native';

export const YouHaveNoMatchesContainer = styled.View`
    height: 70%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const MatchItemContainer = styled.View`
    height: 100%;
    width: 80px;
    align-items: center;
    margin: 5px;
    flex-direction: column;
`;

export const MatchItemButton = styled.TouchableHighlight`
    height: 80px;
    width: 80px;
    border-radius: 80px;
    background-color: white;
    padding: 2px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.$primaryColor};
`;
