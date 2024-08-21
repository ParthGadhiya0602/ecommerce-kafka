import express from "express";
import productRouter from "./api/product.routes";

const app = express();

app.use(express.json());

// app.use("/", (req, res) => {
//   res.json({ msg: "message" });
// });

app.use("/product", productRouter);

export default app;
