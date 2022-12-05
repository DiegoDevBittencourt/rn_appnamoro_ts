import styled from 'styled-components/native';

import { P } from '@components/index';

export const LoginCardContainer = styled.View`
    padding: 30px 15px 15px;
    border-radius: ${({ theme }) => theme.$mediumBorderRadius}px;
    text-align: center;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    elevation: 10;
    margin: 10px 0 30px;
`;

export const ForgotPasswordContainer = styled.View`
    margin-top: 15px;
    justify-content: flex-end;      
    width: 100%;
    flex-direction: row;
`;

export const ForgotPasswordText = styled(P)`
    font-size: 14px;
    color: ${({ theme }) => theme.$green};
`;

export const SignUpNowContainer = styled.View`
    margin-top: 30px;
    justify-content: center;
    flex-direction: row;
    width: 100%;  
`;

export const SignUpNowText1 = styled(P)`
    font-size: 13px;
`;

export const SignUpNowText2 = styled(P)`
    color: ${({ theme }) => theme.$green};
    font-size: 14px;
`;