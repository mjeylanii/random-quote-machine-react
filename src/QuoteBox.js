import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/system";
import { Avatar, Card } from "@mui/material";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BottomNavigation from "@mui/material/BottomNavigation";
import { fetchQuoteData, fetchQuoteAuthorImage } from "./api/api";
import RefreshIcon from "@mui/icons-material/Refresh";
export default function QuoteBox(props) {
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("Rick Astley");
  const [quoteAuthorImage, setQuoteAuthorImage] = useState("");

  useEffect(() => {
    fetchQuoteData().then((response) => {
      setQuoteText(response.quoteText);
      if (response.quoteAuthor != "") {
        setQuoteAuthor(response.quoteAuthor);
      } else {
        setQuoteAuthor("Unknown Author");
      }
      fetchQuoteAuthorImage(response.quoteAuthor).then((url) => {
        setQuoteAuthorImage(url);
      });
    });
  }, []);
  return (
    <div>
      <Container maxWidth="md" background>
        <Card sx={{ boxShadow: "4", padding: "3" }}>
          <Avatar
            sx={{ height: 200, width: 200 }}
            alt={quoteAuthor}
            src={quoteAuthorImage}
          ></Avatar>
          <Container sx={{ width: "100%" }}>
            <p>“{quoteText}”</p>
          </Container>
          <label>{quoteAuthor}</label>
          <br />
          <Button sx={{ boxShadow: "4" }} variant="contained">
            New Quote
          </Button>
          <BottomNavigation>
            <BottomNavigationAction label="Refresh" icon={<RefreshIcon />} />
          </BottomNavigation>
        </Card>
      </Container>
    </div>
  );
}
