import styled from "styled-components";
import { Select } from "antd";

export const StyledSelect = styled(Select)`
.ant-select-selector {
    height: 68px !important;
    border-color: var(--border-color) !important;
    font-size: large !important;
}

.ant-select-selector .ant-select-selection-search-input {
    height: 64px !important;
}

.ant-select-selection-placeholder, .ant-select-selection-item {
    line-height: 64px !important;
}
`;