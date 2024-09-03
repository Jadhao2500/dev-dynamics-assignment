import { Box, Typography } from '@mui/material';
import noData from "../assets/noData.svg"

const NoDataComponent = ({ message = 'No records found' }) => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
        padding: '20px',
      }}
    >
      <img
        src={noData}
        alt="No Data"
      />
      <Typography
        style={{
          fontFamily: 'Roboto',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 2,
          letterSpacing: 0,
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default NoDataComponent;
