const options = {
  method: "GET",
  mode: "cors",
};
const url =
  "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?&key=343455";

export  const fetchQuoteData = async () => {
  try {
    const response = await fetch(url, options);
    var quote = await response.text();
    const quoteObj = JSON.parse(quote.substring(2, quote.length - 1));

    return quoteObj;
  } catch (error) {
    console.log("The error is this => ", error);
  }
};

//TODO
/* export const fetchQuoteAuthorImage = async author => {
  try{

  }
}
 */