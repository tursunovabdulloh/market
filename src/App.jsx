import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "./store";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
function App() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["select"],
    queryFn: async () => {
      const req = await fetch("https://dummyjson.com/products");
      const res = await req.json();
      return res?.products;
    },
  });
  return (
    <>
      <Header />
      <main></main>
      <Footer />
    </>
  );
}

export default App;
