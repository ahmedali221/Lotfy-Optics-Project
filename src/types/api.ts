export interface ApiBrand {
  id: number;
  name: string;
}

export interface ApiProduct {
  id: number;
  name: string;
  brand: ApiBrand | null;
  category: 'glasses' | 'lens' | 'artificial_eyes' | 'light_filters';
  gender: 'male' | 'female' | 'kids' | 'unisex';
  frame_shape: string | null;
  lens_type: 'medical' | 'sunglasses' | null;
  price: string;          // decimal string from BE e.g. "1200.00"
  previous_price: string | null;
  stock_quantity: number;
  is_active: boolean;
  images: { id: number; image: string; sort_order: number; colour: string }[];
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
