import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Category Mapping
const categoryMap = {
  eggs: "Protein",
  pulses: "Protein",
  milk: "Protein",

  rice: "Grains",
  wheat: "Grains",
  bread: "Grains",
  poha: "Grains",

  fruits: "Fruits & Veggies",
  vegetables: "Fruits & Veggies",

  biscuit: "Snacks",

  sugar: "Sweeteners",
  jam: "Sweeteners",
};

const categoryColors = {
  Protein: "#ef4444",
  Grains: "#f59e0b",
  "Fruits & Veggies": "#22c55e",
  Snacks: "#8b5cf6",
  Sweeteners: "#ec4899",
  Others: "#6b7280",
};

const getCategory = (item) => {
  return categoryMap[item.toLowerCase()] || "Others";
};

const ViewMonthlyExpenses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/expenses/viewCategoryWiseMonthlyExpenses`
      );

      // group by category
      console.log("res is:", res);
      const rawData = res.data?.data?.flat();

      const transformed = rawData.map((month) => {
        const categoryTotals = {};

        month.categories.forEach((item) => {
          const category = getCategory(item.category);

          if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
          }

          categoryTotals[category] += item.totalSpent;
        });

        const newCategories = Object.keys(categoryTotals).map((cat) => ({
          category: cat,
          totalSpent: categoryTotals[cat],
        }));

        return {
          ...month,
          categories: newCategories,
        };
      });

      setData(transformed);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!data.length) {
    return <div className="text-center mt-10">No data available</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Monthly Expenses
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((monthData, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-5 border"
          >
            {/* Header */}
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {monthData.month}
              </h3>
              <span className="font-bold text-indigo-600">
                ₹{monthData.monthlyTotal}
              </span>
            </div>

            {/* Pie Chart */}
            <div className="w-full h-48 mb-4">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={monthData.categories}
                    dataKey="totalSpent"
                    nameKey="category"
                    outerRadius={70}
                  >
                    {monthData.categories.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={categoryColors[entry.category]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category List */}
            <div className="space-y-2">
              {monthData.categories.map((cat, i) => {
                const percentage = (
                  (cat.totalSpent / monthData.monthlyTotal) *
                  100
                ).toFixed(1);

                return (
                  <div
                    key={i}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            categoryColors[cat.category],
                        }}
                      />
                      <span>{cat.category}</span>
                    </div>

                    <span>
                      ₹{cat.totalSpent} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMonthlyExpenses;