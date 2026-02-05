# Product Design

1. Quy tắc của stock trong products.

- stock của products là stock tổng = sum(varitant.stock)
- stock của mỗi varitants = tổng stock của attribute value + lại

ví dụ:

id:123,stock:1000

varitants (2):
sku: a -> stock: 500
(size)
L -> 50
XL -> 50
XXL ->50
M ->50
XXXL ->50
(color)
