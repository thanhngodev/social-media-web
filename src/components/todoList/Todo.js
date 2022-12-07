import React from 'react';
import ButtonStyled from './TodoStyle';
import { Check } from '@mui/icons-material';

export default function Todo({ todo, onCheckBtnClick, onCheckBtnClickRemove }) {
    return (
        <ButtonStyled 
            isCompleted={todo.isCompleted}
            shouldFitContainer 
            iconAfter={
                !todo.isCompleted && (
                    <>
                        <span 
                            className='check-icon-complete' 
                            onClick={() => onCheckBtnClick(todo.id)}>
                            <Check/>
                        </span>
                    </>
                )
            }>
                {todo.name}
        </ButtonStyled>
    )
};