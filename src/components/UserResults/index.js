import {
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableCellLayout,
    Avatar,
    Button,
    useArrowNavigationGroup,
} from "@fluentui/react-components";
import * as React from "react";
import {
    EditRegular,
    PersonArrowLeftFilled,
    PersonAvailableFilled
} from "@fluentui/react-icons";
import { Spinner } from "@fluentui/react-components";
import { StyledUserResults } from "./styles";

const columns = [
    { columnKey: "actions", label: "ACTIONS" },
    { columnKey: "user", label: "FULL NAME" },
    { columnKey: "username", label: "USERNAME" },
    { columnKey: "following", label: "FOLLOWING" },
    { columnKey: "followers", label: "FOLLOWERS" },
    { columnKey: "private", label: "PRIVATE" },
    { columnKey: "banned", label: "BANNED" },
    { columnKey: "restricted", label: "RESTRICTED" },
    { columnKey: "joined", label: "JOINED DATE" },
];

const UserResults = ({ results, loading }) => {
    const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });

    if (!results.length) {
        return <div></div>;
    }

    return (
        <StyledUserResults>
            {loading ? <Spinner /> :
                <Table
                    {...keyboardNavAttr}
                    role="grid"
                    size="medium"
                >
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHeaderCell key={column.columnKey}>
                                    {column.label}
                                </TableHeaderCell>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {results.map((user) => (
                            <TableRow>
                                <TableCell role="gridcell">
                                    <TableCellLayout>
                                        <Button appearance="primary" icon={<EditRegular />}>Edit</Button>
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell role="gridcell">
                                    <TableCellLayout
                                        media={
                                            <Avatar
                                                aria-label={user.firstName}
                                                name={user.firstName + " " + user.lastName}
                                            />
                                        }
                                    >
                                        {user.firstName + " " + user.lastName}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell role="gridcell">
                                    <TableCellLayout>
                                        {user.username}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell role="gridcell">
                                    <TableCellLayout media={<PersonAvailableFilled />}>
                                        {user.followingCount || "No Following"}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell role="gridcell">
                                    <TableCellLayout media={<PersonArrowLeftFilled />}>
                                        {user.followersCount || "No Followers"}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell role="gridcell">
                                    <TableCellLayout>
                                        {user.isPrivate ? "YES" : "NO"}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell role="gridcell">
                                    <TableCellLayout>
                                        {user.isBanned ? "YES" : "NO"}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell role="gridcell">
                                    <TableCellLayout>
                                        {user.isRestricted ? "YES" : "NO"}
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell role="gridcell">
                                    {user.createdAt || "NA"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
        </StyledUserResults>
    );
};

export default UserResults;