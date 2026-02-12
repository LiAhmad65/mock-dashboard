export default function Home() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Welcome to Dashboard
        </h1>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 lg:p-8">
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            This is your dashboard home page. The navbar is displayed at the top
            for all dashboard pages.
          </p>
        </div>
      </div>
    </div>
  );
}
