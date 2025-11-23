"use client";
import CommitteePageLayout from "@/components/layout/CommitteePageLayout";

const chiefPatron = [{ name: "Sardar Taranjit Singh", affiliation: "MD, JIS Group" }];

const patrons = [
  { name: "Sardar Haranjit Singh", affiliation: "Joint MD, JIS Group" },
  { name: "Sardar Amrik Singh", affiliation: "Deputy MD, JIS Group" },
  { name: "Ms. Manpreet Kaur", affiliation: "CEO, JIS Group" },
  { name: "Sardar Simarpreet Singh", affiliation: "Director, JIS Group" },
  { name: "Ms. Jaspreet Kaur", affiliation: "Director, JIS Group" },
  { name: "Sardar Amanjot Singh", affiliation: "Director, JIS Group" },
  { name: "Sardar Horjot Singh", affiliation: "Director, JIS Group" },
  { name: "Sardar Anmol Singh Narula", affiliation: "Director, JIS Group" },
];

const conferenceChair = [{ name: "Prof. (Dr.) Swarup Kumar Mitra", affiliation: "Principal, GNIT" }];



export default function AdvisoryCommittee() {
  return (
    <CommitteePageLayout title="Advisory Committee">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-sky-600 pb-2 mb-6 inline-block">
          CHIEF PATRON
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {chiefPatron.map((member) => (
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
          PATRONS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {patrons.map((member) => (
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
          CONFERENCE CHAIR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {conferenceChair.map((member) => (
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

