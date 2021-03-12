import styled from "styled-components";
const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  padding: 5rem;
  h1,
  h2 {
    margin: 0;
    color: #3949a0;
  }
`;

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
    textsSubstracted.textP = t.valueLang[lang];
  });

  const { textH1, textH2, textP } = textsSubstracted;
  return (
    <StyledMain>
      <h1>{textH1}</h1>
      <h2>{textH2}</h2>
      <p>{textP}</p>
    </StyledMain>
  );
}

export default MainContent;
