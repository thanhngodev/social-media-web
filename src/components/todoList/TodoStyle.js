import styled, { css } from "styled-components";
import Button from '@atlaskit/button';

const ButtonStyled = styled(Button)`
    width: 97%;
    margin-top: 5px;
    text-align: left;
    border-radius: 10px;
    margin-left: 6px;

    &, 
    &:hover {
        ${(p) => 
            p.isCompleted &&
            css `
                text-decoration: line-through;
            `
        };
    }

    &:hover {
        .check-icon-complete {
            display: inline-block;
        }
    }

    .check-icon-complete{
        display: none;

        &:hover{
            background-color: #00a08f;
            border-radius: 5px;
        }
    }
`;

export default ButtonStyled;