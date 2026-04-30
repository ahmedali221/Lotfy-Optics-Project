export interface ApiBrand {
  id: number;
  name: string;
}

export interface ApiProduct {
  id: number;
  name: string;
  brand: ApiBrand | null;
  category: 'frame' | 'lens' | 'accessory';
  gender: 'male' | 'female' | 'kids' | 'unisex';
  frame_shape: string | null;
  price: string;          // decimal string from BE e.g. "1200.00"
  stock_quantity: number;
  is_active: boolean;
  image: string;
}

export interface ApiProductPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiProduct[];
}

export interface ProductFilters {
  category?: string;
  gender?: string;
  brand?: number;
  frame_shape?: string;
  name?: string;
  min_price?: number;
  max_price?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
}
