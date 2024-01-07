// import React from 'react';
// import { ResponsiveBar } from '@nivo/bar';
// import { useTheme } from '@emotion/react';
// const BarChart = ({ data }) => {
//   const{theme} = useTheme();
//   // Map your data to the format expected by ResponsiveBar
//   const chartData = data.map(entry => ({
//     city: entry.city,
//     'Number of Patients': entry.totalPatients,
//   }));
  
//   return (
//     <div style={{ height: '400px' }}>
//       <ResponsiveBar
//         data={chartData}
//         keys={['Number of Patients']}
//         indexBy="city"
//         margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
//         padding={0.3}
//         valueScale={{ type: 'linear' }}
//         indexScale={{ type: 'band', round: true }}
//         colors={{ scheme: 'nivo' }}
//         defs={[
//           {
//             id: 'dots',
//             type: 'patternDots',
//             background: 'inherit',
//             color: '#38bcb2',
//             size: 4,
//             padding: 1,
//             stagger: true,
//           },
//           {
//             id: 'lines',
//             type: 'patternLines',
//             background: 'inherit',
//             color: '#eed312',
//             rotation: -45,
//             lineWidth: 6,
//             spacing: 10,
//           },
//         ]}
//         fill={[
//           {
//             match: {
//               id: 'Number of Patients',
//             },
//             id: 'dots',
//           },
//         ]}
//         borderColor={{
//           from: 'color',
//           modifiers: [['darker', 1.6]],
//         }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: 'City',
//           legendPosition: 'middle',
//           legendOffset: 32,
//           truncateTickAt: 0,
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: 'Number of Patients',
//           legendPosition: 'middle',
//           legendOffset: -40,
//           truncateTickAt: 0,
//         }}
//         labelSkipWidth={12}
//         labelSkipHeight={12}
//         labelTextColor={{
//           from: 'color',
//           modifiers: [['darker', 1.6]],
//         }}
//         legends={[
//           {
//             dataFrom: 'keys',
//             anchor: 'bottom-right',
//             direction: 'column',
//             justify: false,
//             translateX: 120,
//             translateY: 0,
//             itemsSpacing: 2,
//             itemWidth: 100,
//             itemHeight: 20,
//             itemDirection: 'left-to-right',
//             itemOpacity: 0.85,
//             symbolSize: 20,
//             effects: [
//               {
//                 on: 'hover',
//                 style: {
//                   itemOpacity: 1,
//                 },
//               },
//             ],
//           },
//         ]}
//         role="application"
//         ariaLabel="Nivo bar chart demo"
//         barAriaLabel={e =>
//           e.id + ': ' + e.formattedValue + ' in city: ' + e.indexValue
//         }
//       />
//     </div>
//   );
// };

// export default BarChart;
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@emotion/react';

const BarChart = ({ data }) => {
  
  const theme = useTheme();

  // Map your data to the format expected by ResponsiveBar
  const chartData = data.map(entry => ({
    city: entry.city,
    'Number of Patients': entry.totalPatients,
  }));

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={chartData}
        keys={['Number of Patients']}
        indexBy="city"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ id, data }) => theme.palette.secondary[100]} // Set the background color here
        defs={[
          // {
          //   id: 'dots',
          //   type: 'patternDots',
          //   background: 'inherit',
          //   color: theme.palette.secondary[300], // Set the text color here
          //   size: 4,
          //   padding: 1,
          //   stagger: true,
          // },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: theme.palette.secondary[300], // Set the text color here
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'Number of Patients',
            },
            // id: 'dots',
          },
        ]}
        borderColor={{
          from: theme.palette.secondary[100],
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'City',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Patients',
          legendPosition: 'middle',
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  color: theme.palette.background.alt,
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e =>
          e.id + ': ' + e.formattedValue + ' in city: ' + e.indexValue
        }
      />
    </div>
  );
};

export default BarChart;
