import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export interface PageTitleProps {
  goBack?: boolean;
  title?: string;
  goPreviousPage?: () => void;
}
function PageTitle({ title, goBack = true, goPreviousPage }: PageTitleProps) {
  const handleNavigation = () => {
    if (goPreviousPage) {
      goPreviousPage();
    }
  };
  return (
    <Box display="flex" flexDirection="row">
      {goBack && (
        <IconButton onClick={handleNavigation}>
          <Icon>{"arrow_back"}</Icon>
        </IconButton>
      )}
      <Typography variant="h5" sx={{ color: "text.secondary", lineHeight: 2 }}>
        {title}
      </Typography>
    </Box>
  );
}

export default PageTitle;
