// app/catalogue/page.tsx

import ProductsList from "@/components/productlist";
import pool from "@/lib/db";

// Define Product type
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
};

export default async function CataloguePage({ 
  searchParams 
}: { 
  searchParams: { 
    category?: string; 
    categories?: string; 
    minPrice?: string; 
    maxPrice?: string 
  } 
}) {
  // Get distinct categories
  const [categoryRows] = await pool.query('SELECT DISTINCT category FROM productss ORDER BY category') as any;
  const availableCategories: string[] = ['All', ...(categoryRows as {category: string}[]).map(c => c.category)];

  // Build product query
  let productQuery = 'SELECT * FROM productss WHERE 1=1';
  const productParams: any[] = [];

  if (searchParams.category && searchParams.category !== 'All') {
    productQuery += ' AND category = ?';
    productParams.push(searchParams.category);
  }

  const minPriceNum = parseFloat(searchParams.minPrice || '0');
  const maxPriceNum = parseFloat(searchParams.maxPrice || '999999');

  productQuery += ' AND price >= ? AND price <= ?';
  productParams.push(minPriceNum, maxPriceNum);

  const [rows] = await pool.query(productQuery, productParams) as [Product[], any];
  const products: Product[] = rows;

  return (
    <>
      <ProductsList 
        products={products} 
        categories={availableCategories}
        currentFilters={{
          category: searchParams.category || 'All',
          categories: searchParams.categories ? searchParams.categories.split(',') : [],
          minPrice: searchParams.minPrice || '',
          maxPrice: searchParams.maxPrice || ''
        }}
      />
    </>
  );
}
