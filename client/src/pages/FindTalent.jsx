import { useEffect, useState } from "react";
import API from "../utils/api";

const FindTalent = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const { data } = await API.get("/recruiters");
        setRecruiters(data);
      } catch (err) {
        console.error("Error fetching recruiters:", err);
      }
    };
    fetchRecruiters();
  }, []);

  return (
    <div className="p-6 bg-light min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Recruiters</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recruiters.map((rec) => (
          <div key={rec._id} className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold">{rec.name}</h2>
            <p className="text-gray-600">{rec.company}</p>
            <p className="mt-2">{rec.hiringNeeds}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTalent;
