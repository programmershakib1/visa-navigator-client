import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import VisaCard from "../VisaCard/VisaCard";

const AllVisas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("visa_type") || "All";
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://assignment-10-b10-server.vercel.app/visas?visa_type=${filter}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilteredVisas(data);
        setLoading(false);
      });
  }, [filter]);

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setSearchParams({ visa_type: selectedType });
  };

  return (
    <div className="mx-5 md:mx-0 mt-0 md:mt-10 lg:mt-0">
      <Helmet>
        <title>VN | All Visa</title>
      </Helmet>
      <div className="font-bold flex items-center gap-2 mb-10">
        <span>Filter by Visa Type:</span>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-black px-4 py-1 rounded-sm dark:bg-c"
        >
          <option value="All">All</option>
          <option value="Tourist visa">Tourist Visa</option>
          <option value="Student visa">Student Visa</option>
          <option value="Official visa">Official Visa</option>
          <option value="Business visa">Business Visa</option>
          <option value="Other visa">Other Visa</option>
        </select>
      </div>
      {loading ? (
        <div className="text-center mt-14">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredVisas.map((visa, idx) => (
            <VisaCard key={idx} visa={visa}></VisaCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVisas;
