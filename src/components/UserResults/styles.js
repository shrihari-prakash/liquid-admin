import styled from "styled-components";

export const StyledUserResults = styled.div`
    width: 100%;

    table: {
        width: 100%;
    }

    .fui-TableRow {
        border-bottom: none;

        .fui-TableCell {
            padding: 24px 8px;
            text-overflow: ellipsis;
        }
    }
`;