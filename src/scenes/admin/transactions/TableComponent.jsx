// Reusable Table Component
import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const TableComponent = ({ title, subtitle, columns, data, onRowClick }) => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <h1 style={{ color: theme.palette.secondary[100] }}>{title}</h1>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={data.length === 0}
          getRowId={(row) => row.id}
          rows={data}
          columns={columns}
          onRowClick={onRowClick}
        />
      </Box>
    </Box>
  );
};

export default TableComponent;
