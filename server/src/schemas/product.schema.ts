import * as mongoose from 'mongoose';

/**
 * Product schema
 */
export const productSchema = new mongoose.Schema(
  {
    info: {
      type: {
        name: { type: String, required: true }, // Sản phẩm A
        description: { type: String, required: true }, // Mô tả sản phẩm A
        price: { type: Number, required: true }, // Giá sản phẩm A
        sale: { type: Number, required: true, default: 0 }, // Giá Khuyến mại
      },
      required: true,
    },
    stock: { type: Number, required: true },
    owner: {
      type: {
        seller_id: { type: String, required: true }, // id người sở hữu
        store_id: { type: String, required: true }, // id cửa hàng sở hữu
      },
      required: true,
    },
    images: {
      type: {
        thumbnail: { type: String, required: true }, // Ảnh bìa
        img_details: { type: [String], required: true }, // Ảnh chi tiết
      },
      required: true,
    },
    tags: { type: [String], required: true }, // Hashtag sản phẩm A
    brand: { type: String, required: false },
    varitants: {
      type: [
        {
          sku: { type: String, required: true }, // Mã SKU
          stock: { type: Number, required: true }, // Tổng số lượng mẫu
          attributes: [
            {
              attr_name: { type: String, required: true }, // tên thuộc tính (Size, Color)
              attr_value: [
                {
                  value_name: { type: String, required: true }, // giá trị thuộc tính (M, XL...)
                  value_stock: { type: Number, required: true }, // số lượng từng giá trị
                },
              ],
            },
          ],
        },
      ],
      required: true,
    },
    ship_support: { type: [String], required: true }, // hình thức vận chuyển
    total_rating: { type: Number, required: true }, // tổng đánh giá
    reviews: {
      type: [
        {
          rating: { type: Number, required: true }, // đánh giá
          comment: { type: String, required: true }, // bình luận
          reviewer_email: { type: String, required: true }, // email reviewer
          reviewer_name: { type: String, required: true }, // tên reviewer
          comment_at: { type: Date, required: true }, // ngày bình luận
        },
      ],
      default: [],
      required: false,
    },
  },
  {
    timestamps: true, // tự động tạo createdAt & updatedAt
  },
);
/**
 * Model inteface
 */
export interface Product extends mongoose.Document {
  info: {
    name: string;
    description: string;
    price: number;
    sale: number;
  };
  stock: number;
  owner: {
    seller_id: string;
    store_id: string;
  };
  images: {
    thumbnail: string;
    img_details: string[];
  };
  tags: string[];
  brand?: string;
  varitants: {
    sku: string;
    stock: number;
    attributes: {
      attr_name: string;
      attr_value: {
        value_name: string;
        value_stock: number;
      }[];
    }[];
  }[];
  ship_support: string[];
  total_rating: number;
  reviews:
    | {
        rating: number;
        comment: string;
        reviewer_email: string;
        reviewer_name: string;
        comment_at: Date;
      }[]
    | [];
  createdAt?: Date;
  updatedAt?: Date;
}
