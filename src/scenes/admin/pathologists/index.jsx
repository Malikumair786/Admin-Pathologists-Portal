import React from 'react';
import { Box, useTheme, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useOrganization } from '@clerk/clerk-react';

const Pathologists = () => {
  const { membershipList, membership } = useOrganization({
    membershipList: {},
  });

  const theme = useTheme();

  if (!membershipList) {
    return null;
  }

  // Filter members whose role is 'admin'
  // const adminMembers = membershipList.filter((m) => m.role === 'admin');
  
  // Filter members whose role is 'basic_member'
  const basicMembers = membershipList.filter((m) => m.role === 'basic_member');

  // Combine both admin and basic members
  // const allMembers = [...adminMembers, ...basicMembers];

  const rows = basicMembers.map((m) => ({
    id: m.id,
    firstName: m.publicUserData.firstName,
    lastName: m.publicUserData.lastName,
    identifier: m.publicUserData.identifier,
    role: m.role,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 0.7 },
    { field: 'lastName', headerName: 'Last Name', flex: 0.7 },
    { field: 'identifier', headerName: 'Identifier', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 0.4 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={!membershipList}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
        />
      </Box>
    </Box>
  );
};

export default Pathologists;
