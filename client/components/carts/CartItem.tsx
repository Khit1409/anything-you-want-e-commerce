import { CartItemResponse } from "@/interfaces/response/cart.response";
import Image from "next/image";
import Link from "next/link";

interface Props {
  items: CartItemResponse;
  createdAt: string;
}

export default function CartItem({ items }: Props) {
  return (
    <div className="flex flex-1 items-center">
      {/* thumbnai */}
      <div className="w-max">
        <Image
          src={items.thumbnail}
          alt="cart image"
          title="cart image"
          width={200}
          height={200}
          loading="lazy"
        />
      </div>
      {/* info */}
      <div className="ms-3">
        <div className="mb-3">
          <Link
            href={`/products/${items.productId}`}
            className="text-sm hover:underline hover:text-blue-500 mb-3"
          >
            #{items.productId}
          </Link>
          <div>{items.name}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="me-1">Thương hiệu:</span>
            {items.brand}
          </div>
          <div>
            <span className="me-1">Xuất xứ:</span>
            {items.origin}
          </div>
          <div>
            <span className="me-1">Giá gốc:</span>
            {items.originPrice.toLocaleString("vi-VN")} đ
          </div>
          <div>
            <span className="me-1">Tổng giá:</span>
            {items.totalPrice.toLocaleString("vi-VN")} đ
          </div>
          <div>
            <span className="me-1">Khuyến mại:</span>
            <span className="text-red-500 font-bold">{items.sale} %</span>
          </div>
          <div>
            <label htmlFor="quantity" className="me-1">
              Số Lượng:
            </label>
            <input
              className="outline-0 border border-gray-200 p-1 rounded max-w-[80px] text-center"
              type="number"
              defaultValue={Number(items.quantity)}
              id="quantity"
              name="quantity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
