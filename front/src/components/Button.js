
import styled, { css } from "styled-components";

const StyledButton = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    ${props => css`
        width: ${props.width};
        height: ${props.height};
        color: ${props.color};
        font-size: ${props.font_size};
        font-weight:${props.font_weight};
    `}

    ${props=> props.border &&
        css`border: solid 1px;`
    }
`;

function Button({ onClick, width, height, color, font_size, font_weight, border, children, ...rest }){
    return(
        <StyledButton onClick={onClick} width={width} height={height} color={color} font_size={font_size} font_weight={font_weight} border={border} {...rest}>
            {children}
        </StyledButton>
    );
}
export default Button