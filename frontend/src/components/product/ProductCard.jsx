const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      <h2 className="text-xl font-bold mt-2">{product.title}</h2>

      <p>Rs. {product.price}</p>

      <p>Category: {product.category}</p>

      <p>Condition: {product.condition}</p>
    </div>
  );
};

export default ProductCard;
