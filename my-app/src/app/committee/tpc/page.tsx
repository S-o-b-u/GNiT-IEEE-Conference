"use client";
import CommitteePageLayout from "@/components/layout/CommitteePageLayout";

const technicalCommitteeCoordinator = {
  name: "Dr. Adhish Kumar Chakraborty",
  affiliation: "Registrar, GNIT",
};

const technicalCommittee = [
  { name: "Prof. Dr. Kaushik Roy", affiliation: "Department of Computer Science, West Bengal State University" },
  { name: "Prof. Dr. Soumya Sen", affiliation: "A.K. Choudhury School of IT, University of Calcutta" },
  { name: "Prof. Trishita Ghosh", affiliation: "Department of Information Technology, GNIT" },
  { name: "Prof. Dr. Suman Bhattacharya", affiliation: "HOD, Department of Computer Science and Engineering, GNIT" },
  { name: "Prof. Dr. Barnali Kundu", affiliation: "HOD, Department of Electrical Engineering, GNIT" },
  { name: "Prof. Dr. Dolanchapa Sikdar", affiliation: "HOD, Department of Food Technology, GNIT" },
  { name: "Prof. Dr. Indrajit Bose", affiliation: "HOD, Department of Applied Science and Humanities, GNIT" },
  { name: "Prof. Dr. Mahamuda Sultana", affiliation: "HOD, Department of Bachelor of Sciences, GNIT" },
  { name: "Prof. Dr. Avali Banerjee (Ghosh)", affiliation: "HOD, Department of Electronics and Communication Engineering, GNIT" },
  { name: "Prof. Dr. Chiranjib Dutta", affiliation: "HOD, Department of Computer Application, GNIT" },
  { name: "Prof. Mr. Gaurav Majumder", affiliation: "HOD, Department of Business Administration, GNIT" },
  { name: "Prof. Mrs. Debashruti Ganguly", affiliation: "HOD, Department of Hospitality Management, GNIT" },
  { name: "Prof. Mrs. Bapita Roy", affiliation: "HOD, Department of Electronics and Computer Science, GNIT" },
];

const convenor = {
  name: "Suparna Karmakar",
  affiliation: "HOD, Department of Information Technology, GNIT",
};

const coConvenors = [
  { name: "Mr. Tridib Chakraborty", affiliation: "Department of Information Technology, GNIT" },
  { name: "Dr. Sudeep Ghosh", affiliation: "Department of Information Technology, GNIT" },
];

export default function TPCCommittees() {
  return (
    <CommitteePageLayout title="Technical Program Committee">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-sky-600 pb-2 mb-6 inline-block">
          TECHNICAL COMMITTEE COORDINATOR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          <div className="flex items-start">
            <span className="text-sky-700 font-bold mr-2 mt-1">◆</span>
            <div>
              <p className="font-bold text-gray-900">{technicalCommitteeCoordinator.name}</p>
              <p className="text-sm text-gray-600">{technicalCommitteeCoordinator.affiliation}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-12" />
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-sky-600 pb-2 mb-6 inline-block">
          TECHNICAL COMMITTEE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {technicalCommittee.map((member) => (
            <div key={member.name} className="flex items-start">
              <span className="text-sky-700 font-bold mr-2 mt-1">◆</span>
              <div>
                <p className="font-bold text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-600">{member.affiliation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-12" />
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-sky-600 pb-2 mb-6 inline-block">
          CONVENOR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          <div className="flex items-start">
            <span className="text-sky-700 font-bold mr-2 mt-1">◆</span>
            <div>
              <p className="font-bold text-gray-900">{convenor.name}</p>
              <p className="text-sm text-gray-600">{convenor.affiliation}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-12" />
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-sky-600 pb-2 mb-6 inline-block">
          CO-CONVENOR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {coConvenors.map((member) => (
            <div key={member.name} className="flex items-start">
              <span className="text-sky-700 font-bold mr-2 mt-1">◆</span>
              <div>
                <p className="font-bold text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-600">{member.affiliation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommitteePageLayout>
  );
}
