import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/system";
import { Avatar, Card } from "@mui/material";
import { fetchQuoteData, fetchQuoteAuthImage } from "./api/api";

export default function QuoteBox(props) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetchQuoteData().then((quote) => {
      setQuote(quote);
    });
  }, []);
  return (
    <div>
      <Container maxWidth="sm" background>
        <Card sx={{ boxShadow: "" }}>
          <Avatar></Avatar>
          <Container sx={{ width: "100%" }}>
            <p>{quote.quoteText}</p>
          </Container>
          <label>{quote.quoteAuthor}</label>
          <br />
          <Button
            variant="contained"
            onClick={() =>
              fetchQuoteData().then((quote) => {
                setQuote(quote);
              })
            }
          >
            New Quote
          </Button>
        </Card>
      </Container>
    </div>
  );
}
