import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box height="4.5rem" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgcolor="ButtonShadow">
      <Typography width="100%" textAlign="center" color="textSecondary" fontSize={17}>מערכת דוחות בטיחות / דו"ב</Typography>
      <Typography width="100%" textAlign="center" color="textSecondary" fontSize={15}>פותח על ידי עומר סמורודינסקי, וייפר</Typography>
    </Box>
  )
}