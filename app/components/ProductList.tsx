interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function ProductList({ products, addToCart }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Productos</h2>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => addToCart(product)}
            className="p-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg text-left"
          >
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm text-gray-600">${product.price}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
