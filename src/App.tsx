import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { itemType } from "./parser";
import "./parser";

const menuObj: Record<number, itemType> = {
  0: {
    id: -1,
    name: "root",
    type: "root",
    children: [1, 7],
  },
  4: {
    id: 4,
    type: "DISH",
    name: "Spaghetti",
    price: 10.95,
    children: [2, 3],
  },
  1: {
    id: 1,
    type: "CATEGORY",
    name: "Pasta",
    children: [4, 5],
  },
  2: {
    id: 2,
    type: "OPTION",
    name: "Meatballs",
    price: 1.0,
  },
  3: {
    id: 3,
    type: "OPTION",
    name: "Chicken",
    price: 2.0,
  },
  5: {
    id: 5,
    type: "DISH",
    name: "Lasagna",
    price: 12.0,
  },
  6: {
    id: 6,
    type: "DISH",
    name: "Caesar Salad",
    price: 9.75,
    children: [3],
  },
  7: {
    id: 7,
    type: "CATEGORY",
    name: "Salad",
    children: [6],
  },
};

const MenuItem = ({ itemId }: { itemId: number }) => {
  const item = menuObj[itemId];

  return (
    <div className={`menu-item ${item.type.toLowerCase()}`}>
      <div className="menu-item-header">
        <span className="item-name">{item.name}</span>
        {item.price && (
          <span className="item-price">${item.price.toFixed(2)}</span>
        )}
      </div>
      {item.children && (
        <div className="menu-item-children">
          {item.children.map((childId) => (
            <MenuItem key={childId} itemId={childId} />
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const rootChildren = menuObj[0].children || [];

  // Get categories directly from root's children
  const categories = rootChildren.map((id) => menuObj[id]);

  const displayedItems = selectedCategory ? [selectedCategory] : rootChildren;

  return (
    <div className="menu-container">
      <nav className="category-nav">
        <button
          className={`category-button ${!selectedCategory ? "active" : ""}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${
              selectedCategory === category.id ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </nav>
      <h1>Our Menu</h1>
      {displayedItems.map((childId) => (
        <MenuItem key={childId} itemId={childId} />
      ))}
    </div>
  );
}

export default App;
