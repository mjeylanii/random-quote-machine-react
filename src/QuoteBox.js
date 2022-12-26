import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import { Avatar, Card, Paper, Link, Grid, Fade } from "@mui/material";
import { fetchQuoteData, fetchQuoteAuthorImage } from "./api/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AnimatePresence, motion } from "framer-motion";
const textVariants = {
  initial: {
    opacity: 0,
    x: -50,
  },
  in: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  out: {
    opacity: 0,
    x: 50,
    transition: { duration: 0.5 },
  },
};
export default function QuoteBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("Rick Astley");
  const [quoteAuthorImage, setQuoteAuthorImage] = useState("");

  async function fetchNewQuote() {
    console.log("Clicked");
    // Add animation to the text element to fade out
    setQuoteText("");
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await fetchQuoteData();
    // Add animation to the text element to fade in
    setQuoteText(response.quoteText);
    if (response.quoteAuthor !== "") {
      setQuoteAuthor(response.quoteAuthor);
    } else {
      setQuoteAuthor("Unknown Author");
    }
    const url = await fetchQuoteAuthorImage(response.quoteAuthor);
    setQuoteAuthorImage(url);
  }
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
    setIsOpen(true);
  }, []);
  return (
    <div>
      <Container>
        <Paper
          sx={{
            padding: "2%",
            maxWidth: "40vw",
            minWidth: "40vw",
            borderRadius: "10px",
          }}
          variant="outlined"
          square="true"
          id="quote-box"
          elevation={24}
        >
          <Avatar
            in
            sx={{ height: 200, width: 200, overflow: "hidden" }}
            alt={quoteAuthor}
            src={quoteAuthorImage}
            variant="circle"
          ></Avatar>
          <Grid
            direction={"column"}
            container
            alignItems="center"
            justifyContent="space-around"
            sx={{ padding: "3%", width: "auto" }}
          >
            <AnimatePresence>
              {quoteText && (
                <motion.p
                  id="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {quoteText}
                </motion.p>
              )}
            </AnimatePresence>
            <p id="author" sx={{ fontFamily: "Roboto" }}>
              - {quoteAuthor}
            </p>
          </Grid>

          <Grid
            padding={"2%"}
            container
            direction="row"
            justifyContent="space-around"
          >
            <Link id="tweet-quote">
              <span class="mdi mdi-repeat-variant"></span>
            </Link>
            <Button
              id="new-quote"
              onClick={fetchNewQuote}
              variant="contained"
              RefreshIcon
            >
              <RefreshIcon />
            </Button>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
