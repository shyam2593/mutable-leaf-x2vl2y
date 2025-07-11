import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getProducts } from "./service";
import { Button } from "@mui/material";

type props = {
  categories: {}[];
  submitData: (data: {}[]) => void;
};

const Form = ({ categories, submitData }: props) => {
  const [input, setInput] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [products, setProducts] = useState<{}[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setInput(event.target.value as string);
  };

  const handleChangeP = (event: SelectChangeEvent<typeof selectedProducts>) => {
    const {
      target: { value },
    } = event;
    setSelectedProducts(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleClear = () => {
    setInput("");
    setIsDisabled(true);
    setProducts([]);
    setSelectedProducts([]);
    submitData([]);
  };
  const handleSubmit = () => {
    if (selectedProducts.length !== 0) {
      submitData(
        products
          .filter((value: any) => {
            return selectedProducts.includes(value.title);
          })
          .map((value: any) => {
            return { name: value.title, price: value.price };
          })
      );
    } else if (products.length === 0) submitData(products);
    else
      submitData(
        products.map((value: any) => {
          return { name: value.title, price: value.price };
        })
      );
  };
  useEffect(() => {
    if (input !== "")
      getProducts(input).then((data: any) => {
        setProducts(() => [...data.products]);
        setIsDisabled(false);
      });
  }, [input]);
  return (
    <Box className="input-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Filters</h2>
        <p
          style={{ alignSelf: "center", cursor: "pointer" }}
          onClick={handleClear}
        >
          Clear
        </p>
      </div>
      <FormControl fullWidth sx={{ marginBottom: "5px" }}>
        <InputLabel htmlFor="select">Categories</InputLabel>
        <Select
          id="select"
          value={input}
          label="Categories"
          onChange={handleChange}
        >
          {categories.map((data: any, index) => {
            return (
              <MenuItem key={index} value={data.name}>
                {data.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="products">Products</InputLabel>
        <Select
          id="products"
          multiple
          value={selectedProducts}
          onChange={handleChangeP}
          label="Products"
          disabled={isDisabled}
        >
          {products.map((data: any) => (
            <MenuItem key={data.id} value={data.title}>
              {data.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        sx={{ alignItems: "center", position: "absolute", bottom: 10, left: 0 }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};
export default Form;
