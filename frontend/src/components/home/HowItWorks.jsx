import { FaUpload, FaSearch, FaHandshake } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Upload Item",
      desc: "List your books, electronics or items easily.",
      icon: <FaUpload size={35} className="text-blue-600" />,
    },
    {
      id: 2,
      title: "Find Buyer",
      desc: "Students can search and discover items they need.",
      icon: <FaSearch size={35} className="text-blue-600" />,
    },
    {
      id: 3,
      title: "Complete Deal",
      desc: "Connect and complete safe exchange or purchase.",
      icon: <FaHandshake size={35} className="text-blue-600" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        How CampusKart Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition"
          >
            <div className="flex justify-center mb-4">
              {step.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2">
              {step.title}
            </h3>

            <p className="text-gray-600">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;