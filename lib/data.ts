export type MenuItem = { name: string; note: string; price: number };
export type MenuSection = { id: string; title: string; items: MenuItem[] };

export const menu: MenuSection[] = [
  {
    id: "grill",
    title: "From the fire",
    items: [
      { name: "Beef suya", note: "Yaji-rubbed, charcoal-grilled, raw onion, tomato", price: 6500 },
      { name: "Grilled catfish", note: "Whole fish, pepper sauce, fried plantain", price: 14500 },
      { name: "Half chicken", note: "Overnight scotch bonnet and ginger marinade", price: 11000 },
      { name: "Ram kebab skewers", note: "Three skewers, suya spice, cabbage slaw", price: 8000 },
    ],
  },
  {
    id: "pots",
    title: "From the pot",
    items: [
      { name: "Jollof rice", note: "Party-style smoky base, with fried plantain", price: 5000 },
      { name: "Egusi with pounded yam", note: "Melon seed, spinach, assorted meat", price: 9500 },
      { name: "Ofada rice and ayamase", note: "Green pepper stew, boiled egg, ponmo", price: 9000 },
      { name: "Pepper soup", note: "Goat or catfish, uziza, calabash nutmeg", price: 7500 },
    ],
  },
  {
    id: "sweet",
    title: "To finish",
    items: [
      { name: "Chin chin", note: "Crisp, nutmeg-scented, served warm", price: 2500 },
      { name: "Puff puff with chocolate", note: "Six pieces, dark chocolate dip", price: 3500 },
      { name: "Zobo", note: "Hibiscus, ginger, pineapple, over ice", price: 2000 },
    ],
  },
];

export const hours = [
  { days: "Tuesday to Friday", time: "12:00 to 22:00" },
  { days: "Saturday and Sunday", time: "11:00 to 23:00" },
  { days: "Monday", time: "Closed" },
];

export const formatNaira = (n: number) => "₦" + n.toLocaleString("en-NG");
