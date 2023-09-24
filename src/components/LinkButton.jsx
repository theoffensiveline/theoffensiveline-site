import { styled } from "styled-components";

export default function LinkButton({destination, styles, text}) {
    const StyledLinkButton = styled.Button`
        ${styles}
    `;

    // return (
    //     <StyledLinkButton
    //         onClick={() => window.location.href = destination}
    //     >
    //         {text}
    //     </StyledLinkButton>
    // );


}