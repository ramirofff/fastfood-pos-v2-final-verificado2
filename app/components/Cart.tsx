interface Props {
  cart: { name: string; price: number }[];
  removeFromCart: (index: number) => void;
  onPay: () => void;
}

export default function Cart({ cart, removeFromCart, onPay }: Props) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-100 p-4 rounded-lg h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Carrito</h2>
      <ul className="space-y-2 flex-grow overflow-y-auto">
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm"
          >
            <span>{item.name}</span>
            <button onClick={() => removeFromCart(index)} className="text-red-500">
              ✕
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <div className="text-right font-bold text-lg mb-2">Total: ${total}</div>
        <button
          onClick={onPay}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Pagar
        </button>
      </div>
    </div>
  );
}

