import {
  FaBook,
  FaLaptop,
  FaChair,
  FaBicycle,
  FaFileAlt,
  FaBoxOpen,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Books",
    icon: <FaBook size={40} className="text-blue-600" />,
  },
  {
    id: 2,
    name: "Electronics",
    icon: <FaLaptop size={40} className="text-blue-600" />,
  },
  {
    id: 3,
    name: "Furniture",
    icon: <FaChair size={40} className="text-blue-600" />,
  },
  {
    id: 4,
    name: "Bicycle",
    icon: <FaBicycle size={40} className="text-blue-600" />,
  },
  {
    id: 5,
    name: "Notes",
    icon: <FaFileAlt size={40} className="text-blue-600" />,
  },
  {
    id: 6,
    name: "Others",
    icon: <FaBoxOpen size={40} className="text-blue-600" />,
  },
];

function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Browse Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
          >
            {category.icon}
            <h3 className="mt-4 font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;