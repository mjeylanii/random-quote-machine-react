export const fetchQuoteData = async () => {
  const QUOTES_OPTIONS = {
    method: "GET",
    mode: "cors",
  };
  const QUOTES_URL =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?&key=1";

  const response = await fetch(QUOTES_URL, QUOTES_OPTIONS).catch((error) => {
    console.error(error);
  });
  const tempData = await response.text();
  console.log(tempData.substring(2, tempData.length - 1));
  const cleanedQuoteString = tempData.replace(/[^\x00-\x7F]/g, "");
  try {
    const quoteObj = JSON.parse(
      cleanedQuoteString.substring(2, cleanedQuoteString.length - 1)
    );
    return quoteObj;
  } catch (error) {
    console.log(error);
  }
};

export const fetchQuoteAuthorImage = async (author) => {
  const IMAGE_URL = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${author}&prop=pageimages&piprop=original`;
  const response = await fetch(IMAGE_URL).catch((error) => {
    console.error(error);
  });
  const data = await response.json();
  let imageUrl = "";
  if (data.query.pages[Object.keys(data.query.pages)].original) {
    imageUrl = data.query.pages[Object.keys(data.query.pages)].original.source;
  }
   else {
    if (author == "Buddha") {
      imageUrl =
        "https://upload.wikimedia.org/wikipedia/commons/a/a2/086_Buddha_and_Sangha_in_a_Cave_at_Siripada_%2820443444405%29.jpg";
    }
  }

  return imageUrl;
};
