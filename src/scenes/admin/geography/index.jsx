
import React, { useState, useEffect } from "react";
import Header from "component/Header";
import { Box, useTheme } from "@mui/material";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { useGetGeographyQuery, useGetPakistanGeographyQuery } from "state/api";
import { ResponsiveChoropleth } from "@nivo/geo";
import BarChart from "./MyResponsiveBar";
import { geoData } from "state/geoData";
import MyResponsiveBar from "./MyResponsiveBar";

const Geography = () => {
  
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  const { data: pakistanData, isError: isPakistanError } = useGetPakistanGeographyQuery();

  const [view, setView] = useState("Pakistan");
  const [selectedData, setSelectedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (view === "Pakistan") {
          response = await fetch("http://localhost:8081/appointment/citypatients");
          const data = await response.json();
          console.log(data)
          setSelectedData(data);
        } else {
          // Handle World data fetching if needed
          // response = await axios.get("World API endpoint");
        }

        setLoading(false);
      } catch (error) {
        setError("Error loading data",error);
        setLoading(false);
      }
    };

    fetchData();
  }, [view]);


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="find where your users are located" />
      <FormControl sx={{ mt: "1rem" }}>
        <InputLabel>Country</InputLabel>
        <Select
          value={view}
          label="Country"
          onChange={(e) => setView(e.target.value)}
        >
          <MenuItem value="Pakistan">Pakistan</MenuItem>
          <MenuItem value="World">World</MenuItem>
        </Select>
      </FormControl>

      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {view === "Pakistan" ? (
          <Box>
            {isPakistanError ? (
              <>Error loading Pakistan data</>
            ) : (
              pakistanData ? (
                <MyResponsiveBar data = {selectedData} />
              ) : (
                <>Loading...</>
              )
            )}
          </Box>
        ) : (
          data ? (
            <ResponsiveChoropleth
            data={data}
            theme={{
                axis:{
                    domain:{
                        line:{
                            stroke: theme.palette.secondary[200]
                        }
                    },
                    legend:{
                        text:{
                            fill: theme.palette.secondary[200]
                        }
                    },
                    ticks:{
                        line:{
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        },
                        text:{
                            fill: theme.palette.secondary[200]
                        }
                    }
                },
                legends:{
                    text:{
                        fill: theme.palette.secondary[200]
                    }
                },
                tooltip:{
                    container:{
                        color: theme.palette.primary.main,
                    }
                }
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
          ) : (
            <>Loading...</>
          )
        )}
      </Box>
    </Box>
  );
};

export default Geography;
