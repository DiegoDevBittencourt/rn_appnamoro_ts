import styled from 'styled-components/native';

export const LineTextLineContainer = styled.View`
    width: auto;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const Line = styled.View`
    display: flex;
    width: 40%;
    margin-top: 4px;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.$lightTextColor};
`;
