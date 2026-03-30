import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useHealthStats } from '../hooks/useHealthStats';
import { systemColors } from '../data/systemColors';

// Health score color
function getHealthScoreColor(score: number): string {
  if (score >= 7) return '#4F6A4C'; // herb green
  if (score >= 5) return '#E2B857'; // saffron
  return '#B44A3C'; // tomato
}

// Health score label
function getHealthScoreLabel(score: number): string {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Moderate';
  return 'Indulgent';
}

// Pie chart colors
const PIE_COLORS = ['#4F6A4C', '#6B8E68', '#E2B857', '#B44A3C', '#8B6914', '#1F2D3D'];

export function Stats() {
  const {
    averageHealthScore,
    totalDishesLogged,
    healthiestDishes,
    dietaryBreakdown,
    categoryBreakdown,
    healthyRecommendations,
    hasEnoughData,
  } = useHealthStats();

  // Prepare dietary data for pie chart
  const dietaryData = [
    { name: 'Vegan', value: dietaryBreakdown.vegan },
    { name: 'Vegetarian', value: dietaryBreakdown.vegetarian },
    { name: 'Other', value: dietaryBreakdown.other },
  ].filter(d => d.value > 0);

  // Prepare category data for bar chart
  const categoryData = categoryBreakdown.slice(0, 6).map(c => ({
    name: c.category === 'street-food' ? 'Street Food' :
          c.category.charAt(0).toUpperCase() + c.category.slice(1),
    count: c.count,
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: systemColors.seaSalt }}>
      <header style={{ backgroundColor: systemColors.navy }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm transition-colors hover:opacity-80"
              style={{ color: systemColors.seaSalt }}
            >
              ← Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: systemColors.seaSalt }}>
                Health & Stats
              </h1>
              <p className="mt-1" style={{ color: `${systemColors.seaSalt}99` }}>
                Your food journey insights
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!hasEnoughData ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <p className="text-gray-500">Log some dishes to see your health stats!</p>
            <Link
              to="/"
              className="inline-block mt-4 px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: systemColors.herb }}
            >
              Explore Cuisines
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Health Score */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div
                  className="text-3xl font-bold"
                  style={{ color: getHealthScoreColor(averageHealthScore) }}
                >
                  {averageHealthScore}
                </div>
                <div className="text-xs text-gray-500 mt-1">Avg Health Score</div>
                <div
                  className="text-xs font-medium mt-1"
                  style={{ color: getHealthScoreColor(averageHealthScore) }}
                >
                  {getHealthScoreLabel(averageHealthScore)}
                </div>
              </div>

              {/* Total Dishes */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-3xl font-bold" style={{ color: systemColors.navy }}>
                  {totalDishesLogged}
                </div>
                <div className="text-xs text-gray-500 mt-1">Dishes Logged</div>
              </div>

              {/* Vegan/Vegetarian Count */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-3xl font-bold" style={{ color: systemColors.herb }}>
                  {dietaryBreakdown.vegan + dietaryBreakdown.vegetarian}
                </div>
                <div className="text-xs text-gray-500 mt-1">Plant-Based Dishes</div>
              </div>

              {/* Gluten-Free Count */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <div className="text-3xl font-bold" style={{ color: systemColors.saffron }}>
                  {dietaryBreakdown.glutenFree}
                </div>
                <div className="text-xs text-gray-500 mt-1">Gluten-Free</div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Healthiest Dishes */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span style={{ color: systemColors.herb }}>🥗</span>
                  Your Healthiest Dishes
                </h2>
                {healthiestDishes.length > 0 ? (
                  <div className="space-y-3">
                    {healthiestDishes.map((dish, index) => (
                      <div
                        key={dish.userDish.id}
                        className="flex items-center gap-3 p-2 rounded-lg"
                        style={{ backgroundColor: index === 0 ? `${systemColors.herb}10` : 'transparent' }}
                      >
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                          style={{
                            backgroundColor: getHealthScoreColor(dish.healthScore),
                            color: 'white',
                          }}
                        >
                          {dish.healthScore}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {dish.staticDish?.name || dish.userDish.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {dish.countryName}
                          </div>
                        </div>
                        {index === 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            Healthiest
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No dish data available yet.</p>
                )}
              </div>

              {/* Dietary Breakdown */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span style={{ color: systemColors.saffron }}>🥧</span>
                  Dietary Breakdown
                </h2>
                {dietaryData.length > 0 ? (
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dietaryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {dietaryData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-2">
                      {dietaryData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                          />
                          <span className="text-sm text-gray-700">{entry.name}</span>
                          <span className="text-sm text-gray-400 ml-auto">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No dietary data available.</p>
                )}
              </div>
            </div>

            {/* Category Distribution */}
            {categoryData.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span style={{ color: systemColors.tomato }}>📊</span>
                  What You Eat
                </h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={80}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill={systemColors.herb}
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Healthy Recommendations */}
            {healthyRecommendations.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span style={{ color: systemColors.herb }}>💡</span>
                  Healthy Dishes to Try
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Based on cuisines you've explored, here are some healthy options you haven't tried yet:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {healthyRecommendations.map((rec) => (
                    <Link
                      key={`${rec.countryId}-${rec.dish.name}`}
                      to={`/country/${rec.countryId}`}
                      className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{
                            backgroundColor: getHealthScoreColor(rec.healthScore),
                            color: 'white',
                          }}
                        >
                          {rec.healthScore}
                        </span>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {rec.dish.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rec.countryName}
                          </div>
                          {rec.dish.dietary?.isVegan && (
                            <span className="inline-block mt-1 text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                              Vegan
                            </span>
                          )}
                          {rec.dish.dietary?.isVegetarian && !rec.dish.dietary?.isVegan && (
                            <span className="inline-block mt-1 text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                              Vegetarian
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
