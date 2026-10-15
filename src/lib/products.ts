export const categories = [
  { slug: 'english-exotic', name: 'English & Exotic Vegetables', shortName: 'English & exotic', description: 'Explore broccoli, green and yellow zucchini, asparagus, baby carrots, and pea eggplant. Choose ingredients for roasting, grilling, curries, and everyday cooking.', image: '/images/broccoli.webp' },
  { slug: 'capsicum-chillies', name: 'Capsicum & Chillies', shortName: 'Capsicum & chillies', description: 'Colourful red and yellow capsicum, red chilli peppers, and green jalapeño peppers. Find the flavour and colour for your next dish, and enquire about quantities and packing.', image: '/images/red-capsicum.webp' },
  { slug: 'salad-greens', name: 'Salad Vegetables & Greens', shortName: 'Salads & greens', description: 'Cucumber, cherry tomatoes, iceberg lettuce, red cabbage, and pak choi bring crunch and colour to salads, sandwiches, and quick cooked dishes.', image: '/images/iceberg-lettuce.webp' },
  { slug: 'herbs-aromatics', name: 'Herbs & Aromatics', shortName: 'Herbs & aromatics', description: 'Discover thyme and rosemary for roasted vegetables, fragrant sauces, breads, and marinades. Enquire directly for current availability and the supplied form.', image: '/images/rosemary.webp' },
] as const;
export type CategorySlug = typeof categories[number]['slug'];
export type ProductImage = { src: string; alt: string };
export type Product = {
  id: string; slug: string; name: string; aliases: string[]; category: CategorySlug;
  description: string; culinaryUses: string[]; image: string; imageAlt: string;
  availabilityNote: string; featured: boolean; relatedProductSlugs: string[];
  imageNote?: string; gallery: ProductImage[];
};
type ProductRow = {
  slug: string; name: string; category: CategorySlug; description: string;
  culinaryUses: string[]; aliases?: string[]; extraPhotos?: {file:string;alt:string}[];
};
const rows: ProductRow[] = [
  { slug: 'red-capsicum', name: 'Red capsicum', category: 'capsicum-chillies', aliases: ['red bell pepper'], description: 'Bright red bell peppers with thick, crisp flesh. Slice into salads, roast until tender, or add colour to stir-fries and vegetable skewers.', culinaryUses: ['Roasted pepper sauces', 'Vegetable skewers', 'Salads and stir-fries'], extraPhotos: [{file:'red-capsicum-2',alt:'A large assortment of red capsicum'}] },
  { slug: 'yellow-capsicum', name: 'Yellow capsicum', category: 'capsicum-chillies', aliases: ['yellow bell pepper'], description: 'Golden yellow bell peppers that bring gentle sweetness and crunch to the plate. Pair with red capsicum in colourful salads, grilled dishes, and rice preparations.', culinaryUses: ['Grilled vegetables', 'Fresh salads', 'Rice and noodle dishes'], extraPhotos:[{file:'yellow-capsicum-2',alt:'An assortment of yellow capsicum with green patches'}] },
  { slug: 'green-zucchini', name: 'Green zucchini', category: 'english-exotic', aliases: ['courgette'], description: 'Smooth, dark-green zucchini with a mild flavour. Cut into rounds for grilling, slice into ribbons, or add to a quick sauté with herbs and garlic.', culinaryUses: ['Grilled zucchini', 'Vegetable pasta', 'Herbed sautés'] },
  { slug: 'yellow-zucchini', name: 'Yellow zucchini', category: 'english-exotic', aliases: ['golden courgette'], description: 'Golden yellow summer squash that adds a sunny colour to your menu. Cook gently with green zucchini, roast in chunks, or use in vegetable bakes.', culinaryUses: ['Mixed zucchini sautés', 'Roasted vegetable trays', 'Vegetable bakes'] },
  { slug: 'broccoli', name: 'Broccoli', category: 'english-exotic', description: 'Green florets with a firm bite, suitable for hot wok cooking, roasting, and soups. Pair with garlic or a light sauce and cook to your preferred texture.', culinaryUses: ['Garlic stir-fries', 'Roasted broccoli', 'Soups and pasta'], extraPhotos:[{file:'broccoli-2',alt:'A broccoli head surrounded by leaves'},{file:'broccoli-3',alt:'Broccoli growing among broad green leaves'}] },
  { slug: 'cucumber', name: 'Cucumber', category: 'salad-greens', aliases: ['salad cucumber'], description: 'Crisp green cucumbers for cool salads, sandwiches, and quick pickles. Slice into rounds, cut into batons, or combine with tomatoes and herbs.', culinaryUses: ['Fresh salads', 'Sandwiches', 'Quick pickles and raita'] },
  { slug: 'red-cabbage', name: 'Red cabbage', category: 'salad-greens', aliases: ['purple cabbage'], description: 'Purple-red cabbage with tightly layered leaves and a satisfying crunch. Shred for colourful slaws, pickle into a condiment, or braise for a warm side.', culinaryUses: ['Colourful slaws', 'Quick pickles', 'Braised cabbage'], extraPhotos:[{file:'red-cabbage-2',alt:'A red cabbage head with outer leaves'}] },
  { slug: 'red-chillies', name: 'Red chilli peppers', category: 'capsicum-chillies', aliases: ['red chili', 'red chillies', 'fresh red chilli'], description: 'Red chilli peppers for adding colour and heat to sauces, stir-fries, and curry pastes. Confirm the available variety and your preferred heat level when enquiring.', culinaryUses: ['Chilli sauces', 'Curry pastes', 'Stir-fries'], extraPhotos:[{file:'red-chillies-2',alt:'Long red chilli peppers held together'},{file:'red-chillies-3',alt:'Red and green chilli peppers'}] },
  { slug: 'green-jalapeno', name: 'Green jalapeño peppers', category: 'capsicum-chillies', aliases: ['jalapeno', 'green chilli', 'green chili'], description: 'Plump green chilli peppers for pickles, salsas, and filled pepper dishes. Discuss variety, size, and heat preferences directly with Vegmax.', culinaryUses: ['Pickled peppers', 'Salsas', 'Stuffed peppers'], extraPhotos:[{file:'green-jalapeno-2',alt:'Green jalapeño peppers packed together'}] },
  { slug: 'baby-carrot', name: 'Baby carrot', category: 'english-exotic', aliases: ['baby carrots'], description: 'Slender small carrots with leafy tops, shown in the supplied photograph. Roast, glaze, or gently cook for vegetable sides; confirm sizing and preparation when ordering.', culinaryUses: ['Glazed carrots', 'Roasted sides', 'Soups and stews'] },
  { slug: 'cherry-tomatoes', name: 'Cherry tomatoes', category: 'salad-greens', aliases: ['cherry tomato', 'small tomatoes'], description: 'Small oval tomatoes for salads, roasting, and quick sauces. Use whole or halved, and ask about available ripeness and packing for your kitchen.', culinaryUses: ['Fresh salads', 'Roasted tomatoes', 'Quick pasta sauces'] },
  { slug: 'iceberg-lettuce', name: 'Iceberg lettuce', category: 'salad-greens', aliases: ['lettuce'], description: 'Compact lettuce heads with crisp, pale-green leaves. Add refreshing crunch to burgers and sandwiches, or use the broad leaves for salad cups.', culinaryUses: ['Wedge salads', 'Burgers and sandwiches', 'Lettuce cups'] },
  { slug: 'pak-choi', name: 'Pak choi / bok choy', category: 'salad-greens', aliases: ['bok choy', 'pak choy'], description: 'Broad green leaves and pale, crisp stems for simple steamed sides and stir-fries. Cook the stems first, then add the leaves towards the end.', culinaryUses: ['Ginger and garlic stir-fries', 'Noodle soups', 'Steamed greens'], extraPhotos:[{file:'pak-choi-2',alt:'Pak choi heads arranged in a box'}] },
  { slug: 'asparagus', name: 'Asparagus', category: 'english-exotic', aliases: ['asparagus spears'], description: 'Green asparagus spears bundled together, with a distinctive flavour suited to simple cooking. Grill, sauté, or chop into risotto and pasta dishes.', culinaryUses: ['Grilled asparagus', 'Risotto', 'Quick sautés'] },
  { slug: 'thyme', name: 'Thyme', category: 'herbs-aromatics', aliases: ['thyme sprigs'], description: 'Small-leaved aromatic sprigs for building flavour in roasted vegetables, soups, and sauces. Enquire about the available form and packing.', culinaryUses: ['Roast vegetables', 'Stocks and stews', 'Herb sauces'] },
  { slug: 'rosemary', name: 'Rosemary', category: 'herbs-aromatics', aliases: ['rosemary sprigs'], description: 'Needle-like aromatic leaves that pair well with potatoes, breads, and roasted dishes. Use sparingly and confirm the available form when enquiring.', culinaryUses: ['Roasted potatoes', 'Focaccia', 'Marinades'] },
  { slug: 'pea-eggplant', name: 'Pea eggplant (Turkey berry)', category: 'english-exotic', aliases: ['turkey berry', 'pea aubergine', 'Thai pea eggplant', 'sundakkai'], description: 'Small round green eggplants carried in clusters, often used whole in curries. Ask Vegmax about the available variety, quantity, and preparation for your recipe.', culinaryUses: ['Thai-style curries', 'Vegetable curries', 'Savoury side dishes'] },
];
const featured = ['red-capsicum','yellow-capsicum','green-zucchini','broccoli','cherry-tomatoes','pak-choi'];
export const products: Product[] = rows.map(row => ({
  id: row.slug, slug: row.slug, name: row.name, aliases: row.aliases ?? [],
  category: row.category, description: row.description, culinaryUses: row.culinaryUses,
  image: `/images/${row.slug}.webp`, imageAlt: `${row.name} — photograph supplied by Vegmax`,
  availabilityNote: 'Enquire for current availability and pricing.',
  featured: featured.includes(row.slug), imageNote: 'Photograph supplied by Vegmax. Confirm current availability, quantities, and packing directly.',
  relatedProductSlugs: rows.filter(r=>r.category===row.category && r.slug!==row.slug).slice(0,3).map(r=>r.slug),
  gallery: (row.extraPhotos ?? []).map(photo=>({src:`/images/${photo.file}.webp`,alt:photo.alt})),
}));
export function getProduct(slug:string){return products.find(p=>p.slug===slug);}
export function getCategory(slug:string){return categories.find(c=>c.slug===slug);}
