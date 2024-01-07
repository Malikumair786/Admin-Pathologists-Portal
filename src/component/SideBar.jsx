import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
// import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
// import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
// import profileImage from "assets/profile.jpg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  // {
  //   text: "Products",
  //   icon: <ShoppingCartOutlined />,
  // },
  {
    text: "Tests",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Patients",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Stats",
    icon: <PublicOutlined />,
  },
  // {
  //   text: "Sales",
  //   icon: null,
  // },
  // {
  //   text: "Overview",
  //   icon: <PointOfSaleOutlined />,
  // },
  // {
  //   text: "Daily",
  //   icon: <TodayOutlined />,
  // },
  // {
  //   text: "Monthly",
  //   icon: <CalendarMonthOutlined />,
  // },
  // {
  //   text: "Breakdown",
  // //   icon: <PieChartOutlined />,
  // },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admins",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "pathologists",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Reviews",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Organization",
    icon: null,
  },
  {
    text: "Profile",
    icon: <AdminPanelSettingsOutlined />,
  },
  // {
  //   text: "pathologists",
  //   icon: <AdminPanelSettingsOutlined />,
  // },

  // {
  //   text: "Disease Detection",
  //   icon: null,
  // },
  // {
  //   text: "Leukemia",
  //   icon: <BiotechOutlinedIcon />,
  // },
  // {
  //   text: "Malaria",
  //   icon: <BiotechOutlinedIcon />,
  // },
];

const Sidebar = ({
  // user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useUser();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    CELLSCOPE
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box m="1.5rem 2rem 0 3rem">
            <Divider />
            <FlexBetween textTransform="none" mt="1.5rem" gap="1rem">
              <Box>
                <UserButton />
              </Box>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.fullName}
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
