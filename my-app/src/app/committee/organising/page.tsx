import CommitteePageLayout from "@/components/layout/CommitteePageLayout";

const organisingCommittee = [
  { name: "Prof. Dr. Hindol Bhattacharya", affiliation: "Department of Information Technology, GNIT" },
  { name: "Prof. Mrs. Debasmita Saha", affiliation: "Department of Information Technology, GNIT" },
  { name: "Prof. Ms. Saptadipa Mazumder", affiliation: "Department of Information Technology, GNIT" },
  { name: "Prof. Mr. Avishek Adak", affiliation: "Department of Information Technology, GNIT" },
  { name: "Prof. Mr. Santanu Dasgupta", affiliation: "Accounts Officer, GNIT" },
  { name: "Prof. Mr. Sinchan Majumdar", affiliation: "System Administrator, GNIT" },
  { name: "Prof. Mr. Biswajit Chaki Choudhury", affiliation: "System Administrator, GNIT" },
];

export default function OrganisingCommittee() {
  return (
    <CommitteePageLayout title="Organising Committee">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            {organisingCommittee.map((member) => (
              <div key={member.name} className="flex items-start">
                <span className="text-sky-700 font-bold mr-2 mt-1">◆</span>
                <div>
                  <p className="font-bold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.affiliation}</p>
                </div>
              </div>
            ))}
        </div>
    </CommitteePageLayout>
  );
}
