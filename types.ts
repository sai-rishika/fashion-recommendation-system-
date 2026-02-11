
export type Gender = 'Male' | 'Female' | 'Non-binary';

export interface StylingRecommendation {
  occasion: string;
  outfit: {
    top: string;
    bottom: string;
    shoes: string;
  };
  accessories: string[];
  hairstyle: string;
  maintenanceTip: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ShoppingLink {
  product: string;
  retailer: string;
  url: string;
  imageUrl?: string;
}

export interface StyleAnalysis {
  skinTone: {
    category: string;
    description: string;
    hex: string;
  };
  recommendations: StylingRecommendation[];
  colorPalette: ColorPalette;
  reasoning: string;
  shoppingLinks: ShoppingLink[];
}
