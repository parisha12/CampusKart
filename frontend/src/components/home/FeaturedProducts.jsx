const products = [
  {
    id: 1,
    name: "Engineering Mathematics Book",
    price: "Rs. 700",
    condition: "Used",
  },
  {
    id: 2,
    name: "Dell Laptop",
    price: "Rs. 35,000",
    condition: "Used",
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: "Rs. 1,200",
    condition: "Like New",
  },
  {
    id: 4,
    name: "Study Table",
    price: "Rs. 2,500",
    condition: "Good",
  },
];

function FeaturedProducts() {
  return (
    <section className="bg-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <div className="bg-gray-200 h-40 rounded-lg mb-4 flex items-center justify-center">
                Product Image
              </div>

              <h3 className="font-bold">{product.name}</h3>

              <p className="text-blue-600 mt-2">{product.price}</p>

              <p className="text-sm text-gray-500">
                {product.condition}
              </p>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;