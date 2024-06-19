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
      <main className="container mt-5 mb-5">
        <section>
          <div className="grid gap-14 grid-cols-1 md:grid-cols-2 xl:grid-cols-3  md:gap-24 xl:gap-x-48 mt-10 pb-20 strech">
            {data &&
              data.map(
                ({ id, title, description, images, price, rating, stock }) => {
                  return (
                    <div
                      key={id}
                      className="product flex justify-self-center items-stretch"
                    >
                      <div className="card w-[320px] bg-base-100 shadow-[0_3px_15px_0] shadow-primary">
                        <figure>
                          <img
                            className="w-[320px] h-[320px] object-cover object-center"
                            src={
                              images ? (
                                images[0]
                              ) : (
                                <div className="skeleton w-32 h-32"></div>
                              )
                            }
                            height={320}
                            width={320}
                            alt="Shoes"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">
                            {title}
                            <div className="badge badge-secondary">NEW</div>
                          </h2>
                          {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                          <div className="card-actions flex justify-center mt-5 gap-2">
                            <div className="badge badge-outline p-[7.5xp] bg-green-900">
                              Price - {price}💵
                            </div>
                            <div className="badge badge-outline p-[7.5px] bg-green-900">
                              Rating - {rating}⭐
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
