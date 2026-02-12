import Table from "@/app/components/home/Table/Table";

const sampleData = [
  {
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
  {
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
  {
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    gender: "Female",
  },
  {
    name: "Beth Smith",
    status: "Alive",
    species: "Human",
    gender: "Female",
  },
  {
    name: "Jerry Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
  {
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
  {
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
  {
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    gender: "Female",
  },
  {
    name: "Beth Smith",
    status: "Alive",
    species: "Human",
    gender: "Female",
  },
  {
    name: "Jerry Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
  {
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
  {
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
  {
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    gender: "Female",
  },
  {
    name: "Beth Smith",
    status: "Alive",
    species: "Human",
    gender: "Female",
  },
  {
    name: "Jerry Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
  },
];

export default function Home() {
  return (
    <div className="h-full overflow-y-auto p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Character List
        </h1>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6 flex-1 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0">
            <Table data={sampleData} />
          </div>
        </div>
      </div>
    </div>
  );
}
