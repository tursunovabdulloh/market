import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "./store";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { useState } from "react";
function App() {
  const queryClient = useQueryClient();
  const [select, setSelect] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: [select, search],
    queryFn: async () => {
      let url = "https://dummyjson.com/products";
      if (select !== "all") {
        url = `https://dummyjson.com/products/category/${select}`;
      }
      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}`;
      }
      const req = await fetch(url);
      const res = await req.json();
      return res?.products;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const req = await fetch("https://dummyjson.com/products/categories");
      const res = await req.json();
      return res;
    },
  });

  return (
    <>
      <Header />
      <main className="container mt-5 mb-5">
        <section>
          <div className="flex gap-24">
            <div className="flex">
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-5.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Type here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered input-accent w-full max-w-xs"
              />
            </div>
            <div className="flex">
              {categories && (
                <select
                  value={select}
                  onChange={(e) => setSelect(e.target.value)}
                  className="select select-info w-full max-w-xs"
                >
                  <option value="all">Filter by category</option>
                  {categories.map(({ slug, name, url }) => (
                    <option key={slug} value={slug}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
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
                            className="w-[320px] h-[320px] object-center object-scale-down"
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
