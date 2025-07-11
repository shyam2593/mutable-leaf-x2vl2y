import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Form from "./Form";
import "./styles.css";
import Chart from "./Chart";
import { getCategories } from "./service";

function App() {
  const [categories, setCategories] = useState<{}[]>([]);
  const [chartInput, setChartinput] = useState<{
    title: string;
    data: {}[];
    type: string;
  }>({
    title: "",
    data: [],
    type: "",
  });
  const [noInfo, setNoInfo] = useState<boolean>(false);
  const handleChange = (data: {}[]) => {
    if (data.length !== 0)
      setChartinput({
        title: "Products in selected category",
        data,
        type: "column",
      });
    else
      setChartinput({ title: "All Categories", data: categories, type: "pie" });
  };

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      setChartinput({ title: "All Categories", data, type: "pie" });
    });
  }, []);
  return (
    <Box>
      {categories.length !== 0 && (
        <Grid
          container
          spacing={2}
          alignItems="center"
          className="flex-container"
        >
          <Grid item sm={4} md={4} lg={4}>
            <Form categories={categories} submitData={handleChange} />
          </Grid>
          <Grid item sm={8} md={8} lg={8}>
            <Chart chartInput={chartInput} />
          </Grid>
        </Grid>
      )}
      {noInfo && <div>No InfoFound</div>}
    </Box>
  );
}

export default App;
