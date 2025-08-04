import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <Box sx={{ padding: "40px", maxWidth: "1060px", mx: "auto" }}>
        <div className="max-w-[1060px] mx-auto mt-4 relative">
          <picture className="relative w-full h-full bg-center bg-cover">
            {/* <source
              width={1280}
              media="(min-width: 1280px)"
              srcSet="https://iili.io/FOsm3In.webp"
            />
            <source
              width={1280}
              media="(max-width: 1280px)"
              srcSet="https://iili.io/FOsbm1R.webp"
            /> */}
            <source
              media="min-width: 751px"
              srcSet="https://iili.io/F4cr9n9.webp"
            />
            <source
              media="(max-width: 750px)"
              srcSet="https://iili.io/FOsbrgV.webp"
            />
            <img
              src="https://iili.io/FOsm3In.webp" // Fallback image
              alt="A pile of comics"
              className="w-full h-auto" // Ensure the image is responsive
            />
          </picture>
        </div>
        <div className="ml-4 font-bold ml-auto text-slate-100">
          picture source: Unsplash
        </div>
        <Typography sx={{ textAlign: "center" }}>
          Наша история началась в 2019 году за несколькими пинтами крафтового
          эля. Четверо парней обсуждали, как было бы здорово собирать и
          продавать свои любимые вещи в одном месте! Из этой идеи The Novel Town
          стал реальностью! С несколькими десятками лет покупки и чтения
          комиксов. Наша цель — стать вашим надежным независимым продавцом
          комиксов и графических новелл - как новых, так и давно вышедших из
          печати, всех возможных жанров и форматов. Мы будем продавать то, что
          нравится читать нашему сообществу, и обсуждать, почему мы считаем это
          крутым! Мы обещаем вам работать особенно усердно, чтобы подарить вам
          незабываемые впечатления, которые захочется пережить снова и снова!
          Сегодня у нас есть сообщества VK, Telegram и Discord The Novel Town
          стал реальностью #thenoveltown
        </Typography>
        <Typography
          sx={{ fontSize: "1.5em", fontWeight: "bold", textAlign: "center" }}
        >
          Мы - THE NOVEL TOWN
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          И мы обеспечим вам наилучшие впечатления от путешествия по бескрайнему
          миру рисованных историй
        </Typography>
        <Link to="/profile">
          <Typography
            sx={{
              fontSize: "1.5em",
              fontWeight: "bold",
              color: "maroon",
              textAlign: "center",
              ":hover": {},
            }}
          >
            Чего же вы ждёте? ПРИСОЕДИНЯЙТЕСЬ!
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default AboutPage;
