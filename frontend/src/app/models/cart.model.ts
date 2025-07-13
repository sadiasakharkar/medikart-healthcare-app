export interface CartItem {
  id?: number;
  userId: number;
  productId: number;
  productName?: string;
  brand?: string; // ✅ Add this line
  price?: number;
  quantity: number;
}
