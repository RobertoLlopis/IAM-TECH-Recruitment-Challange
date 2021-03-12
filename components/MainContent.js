import React from "react";

function MainContent({ texts, lang }) {
  let textsSubstracted = {};
  texts.forEach((t) => {
    if (t.tag.includes("h1")) {
      textsSubstracted.textH1 = t.valueLang[lang];
      return;
    }
    if (t.tag.includes("h2")) {
      textsSubstracted.textH2 = t.valueLang[lang];
      return;
    }
    console.log(lang);
    textsSubstracted.textP = t.valueLang[lang];
    console.log(textsSubstracted.textP);
  });

  const { textH1, textH2, textP } = textsSubstracted;
  return (
    <main>
      <h1>{textH1}</h1>
      <h2>{textH2}</h2>
      <p>{textP}</p>
    </main>
  );
}

export default MainContent;
