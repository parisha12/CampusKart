const features = [
  {
    id: 1,
    title: "Affordable Deals",
    desc: "Get items at low prices from students.",
  },
  {
    id: 2,
    title: "Trusted Community",
    desc: "Buy and sell within verified campus users.",
  },
  {
    id: 3,
    title: "Easy Exchange",
    desc: "Sell, rent, or exchange items easily.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose CampusKart?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;