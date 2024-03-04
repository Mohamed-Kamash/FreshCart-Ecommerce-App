export interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageCover: string;
  category: category ;
  ratingsAverage: string;
  images?: any[];
}

interface category {
  image: string;
  name: string;
  slug: string;
  _id: string;
}
