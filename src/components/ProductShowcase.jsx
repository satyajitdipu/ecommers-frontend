import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, HeartOff, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"; // <-- import useCart

export default function ProductShowcase({ onOpenCart }) { // <-- accept prop to open drawer
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); // <-- get addToCart from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to cart handler
  const handleAddToCart = (product) => {
    addToCart(product);
    if (onOpenCart) onOpenCart();
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="bg-white dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Explore Our Products
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <motion.div
            key={product.id || product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden p-4 relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {product.description.slice(0, 60)}...
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                ₹{product.price}
              </span>
              <span className={`text-sm px-2 py-1 rounded-full ${
                product.inventory > 0
                  ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
              }`}>
                {product.inventory > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                onClick={() => handleAddToCart(product)}
                disabled={product.inventory <= 0}
                title={product.inventory <= 0 ? "Out of Stock" : "Add to Cart"}
              >
                <ShoppingCart size={20} />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                onClick={() => {
                  setProducts((prev) =>
                    prev.map((p) =>
                      (p.id || p._id) === (product.id || product._id)
                        ? { ...p, favorite: !p.favorite }
                        : p
                    )
                  );
                }}
              >
                {product.favorite ? (
                  <Heart className="text-red-500" size={20} />
                ) : (
                  <HeartOff className="text-gray-500" size={20} />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
