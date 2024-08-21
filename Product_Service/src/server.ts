import expressApp from "./expressApp";

const PORT = process.env.PORT || 8000;
export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log(`http://localhost:${PORT}/product`);
});
