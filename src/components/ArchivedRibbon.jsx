import React from 'react';
import { Box } from "@mui/material";

export default function ArchivedRibbon() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 22,
        right: -36,
        transform: "rotate(45deg)",
        bgcolor: "warning.main",
        color: "warning.contrastText",
        px: 5,
        py: 0.5,
        fontSize: "0.8rem",
        fontWeight: 700,
        textTransform: "uppercase",
        boxShadow: 2,
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      Archived
    </Box>
  );
}
