import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import { Container, Chip, Grid, Typography, TextField, Stack, CircularProgress, TableFooter, FormGroup, Menu, MenuItem, Pagination, TablePagination, Divider } from '@mui/material';
import moment from 'moment';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import { makeStyles } from "@mui/styles";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles((theme) => ({
    actions: {
        display: "none",
    },
    caption: {
        display: "none",
    },
    input: {
        marginLeft: -24,
    },
    tableCol: {
        color: "rgba(0, 0, 0, 0.87)",
        fontWeight: 525,
        fontSize: "1rem",
    },
    tableIdCol: {
        cursor: "pointer",
        color: "rgb(3, 25, 129)",
        fontWeight: 600,
    },
    tableDateCol: {
        color: "red",
    },
}));


function DateFormatFunction(date) {
    return moment(date).format('yyyy-MM-DD')
}
function DateTimeFormatFunction(dateTime) {
    return moment(dateTime).format('yyyy-MM-DD HH:mm a')
}



const TableHeader = ({ columns }) => {
    return (
        <TableHead>
            <TableRow>
                {
                    columns?.map(({ name, label, headerLabelAlign, disablePadding }, index) => {
                        return (
                            <TableCell
                                padding={disablePadding ? 'none' : 'normal'}
                                align={!!headerLabelAlign ? headerLabelAlign : 'left'}
                                key={name}
                                sx={{ fontWeight: 'bolder', fontSize: '1rem' }}
                            >
                                {label}
                            </TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    )
}


export default function DataTable({
    columns,
    rows,
    rowsPerPageOptions = [10, 20, 30],
    tableHeading,
    searchLabel,
    searchKeyWord = 'title',
    menu,
    hideSearch = false,
    loading = false,
    ...rest
}) {
    const classes = useStyles()
    const theme = useTheme()
    const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [data, setData] = useState(rows)
    const [search, setSearch] = useState('')


    useEffect(() => {
        setPage(0)
        if (!!search) {
            setData(rows.filter(row => (row[searchKeyWord]).toLowerCase().match(search.toLowerCase())))
        }
        if (search === '') {
            setData(rows)
        }
    }, [search, rows])

    const [renderColumns, setRenderColumns] = useState(columns.filter((col) => typeof col.isView === 'boolean' ? col.isView : true))

    return (
        <Container {...rest}>
            <Card sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems='center' sx={{ p: 2, pr: 3 }}>
                    <Grid item xs={12} md={6} >
                        <Typography variant='h5' noWrap>
                            {tableHeading}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
                            {!hideSearch &&
                                <TextField
                                    type={'search'}
                                    variant="standard"
                                    placeholder={searchLabel}
                                    margin="none"
                                    size='small'
                                    onChange={(e) => { setSearch(e.target.value) }}
                                    InputProps={{
                                        disableUnderline: true,
                                        endAdornment: <SearchIcon />
                                    }}
                                    sx={{ borderRadius: 2, p: 1, backgroundColor: '#eee', borderColor: 'none' }}
                                />
                            }
                            {menu}
                        </Stack>
                    </Grid>
                </Grid>
            </Card>
            <TableContainer component={Card} sx={{ boxShadow: 2 }}>
                <Table sx={{ minWidth: isUpLg ? 650 : '' }} aria-label="simple table">
                    {isUpLg ?
                        <React.Fragment>
                            <TableHeader columns={renderColumns} />
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={columns?.length} align="center">
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : data.length > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {
                                            renderColumns?.map((column, dataIndex) => (
                                                <TableCell
                                                    key={dataIndex}
                                                    align={!!column.headerLabelAlign ? column.headerLabelAlign : 'left'}
                                                >
                                                    {
                                                        !!column.fieldRenderType ?
                                                            column.fieldRenderType === 'status' ?
                                                                <Chip
                                                                    label={
                                                                        row[column.name] &&
                                                                        (row[column.name])
                                                                    }
                                                                    variant="outlined"
                                                                    style={{
                                                                        width: "100%",
                                                                        border: "none",
                                                                        backgroundColor:
                                                                            row[column.name] === "New"
                                                                                ? "#66a103"
                                                                                : row[column.name] === "Close"
                                                                                    ? "red"
                                                                                    : "orange",
                                                                        color: "#FFF",
                                                                    }}
                                                                />
                                                                : column.fieldRenderType === 'date' ?
                                                                    DateFormatFunction(row[column.name]) : column.fieldRenderType === 'dateTime' ?
                                                                        DateTimeFormatFunction(row[column.name]) : ''
                                                            :
                                                            !!column.render ? column.render(row, dataIndex) : row[column.name] || '-'
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                                    : <TableRow><TableCell align='center' colSpan={columns?.length}>No records found</TableCell></TableRow>
                                }
                            </TableBody>
                        </React.Fragment>
                        :
                        <TableBody style={{ width: '100%' }}>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={2} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : data.length > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <React.Fragment key={index}>
                                    {
                                        renderColumns.map((column, id) => (
                                            <TableRow key={id}>
                                                <TableCell>{column.label}</TableCell>
                                                <TableCell
                                                    key={index}
                                                    align={!!column.headerLabelAlign ? column.headerLabelAlign : 'left'}
                                                >
                                                    {
                                                        !!column.fieldRenderType ?
                                                            column.fieldRenderType === 'date' ?
                                                                DateFormatFunction(row[column.name]) : column.fieldRenderType === 'dateTime' ?
                                                                    DateTimeFormatFunction(row[column.name]) : ''
                                                            :
                                                            !!column.render ? column.render(row, id) : row[column.name] || '-'
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    <TableRow ><TableCell colSpan={2} sx={{ p: 0 }}><Divider key={index} /></TableCell></TableRow>
                                </React.Fragment>
                            ))
                                : <TableRow><TableCell align='center' colSpan={2}>No records found</TableCell></TableRow>
                            }
                        </TableBody>
                    }
                </Table>
                <TableFooter style={{ display: "flex", justifyContent: "flex-end", }} component='div'>
                    <TableRow
                        style={{
                            borderBottomLeftRadius: "5px",
                            borderBottomRightRadius: "5px",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                        component='div'
                    >
                        <TablePagination
                            component='div'
                            rowsPerPageOptions={rowsPerPageOptions}
                            count={data.length || 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            classes={{
                                actions: classes.actions,
                                caption: classes.caption,
                                input: classes.input,
                            }}
                            style={{ padding: 6 }}
                            SelectProps={{
                                native: true,
                            }}
                        />

                        <TableCell component='div'>
                            <Pagination
                                component='div'
                                count={Math.ceil((data.length || 0) / rowsPerPage)}
                                showFirstButton
                                showLastButton
                                onChange={handleChangePage}
                                page={page + 1}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </TableContainer>
        </Container>
    );
}
