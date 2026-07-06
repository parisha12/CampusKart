import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
          Product Image
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold">Engineering Mathematics Book</h1>

          <p className="text-2xl text-blue-600 font-semibold mt-4">Rs. 700</p>

          <p className="mt-4 text-gray-600">Condition: Used</p>

          <p className="mt-6">
            This engineering mathematics book is in good condition and is
            perfect for first-year students.
          </p>

          <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
