import React from "react";
import FormInput from "./FormInput";
import { Grid, GridItem } from "@chakra-ui/react";

const ItemArticle = ({ id, itemArticles, setItemArticles }) => {
  return (
    <Grid
      alignContent="center"
      rowGap="16px"
      columnGap="24px"
      templateRows="repeat(2,1fr)"
      templateColumns="1fr 1.56fr 1fr auto"
    >
      <GridItem colSpan={4}>
        <FormInput
          objKey={`${id}.itemName`}
          color="darkThemeWhite"
          label="Item Name"
          defaultValue=""
          type="text"
        ></FormInput>
      </GridItem>
      <GridItem>
        <FormInput
          objKey={`${id}.qty`}
          color="darkThemeWhite"
          label="Qty."
          defaultValue=""
          type="number"
        ></FormInput>
      </GridItem>
      <GridItem>
        <FormInput
          objKey={`${id}.price`}
          color="darkThemeWhite"
          label="Price"
          defaultValue=""
          type="number"
        ></FormInput>
      </GridItem>
      <GridItem>
        <FormInput
          objKey={`${id}.total`}
          color="darkThemeWhite"
          label="Total"
          defaultValue=""
          number=""
        ></FormInput>
      </GridItem>
      <GridItem alignSelf="center" transform="translateY(20px)">
        <svg
          onClick={() => {
            const articleCopy = [...itemArticles];
            if (articleCopy.length === 1) return;
            const articleIndex = articleCopy.indexOf(id);
            articleCopy.splice(articleIndex, 1);
            setItemArticles(articleCopy);
          }}
          width="12.44px"
          height="16px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
            fill="#888EB0"
            fillRule="nonzero"
          />
        </svg>
      </GridItem>
    </Grid>
  );
};

export default ItemArticle;
