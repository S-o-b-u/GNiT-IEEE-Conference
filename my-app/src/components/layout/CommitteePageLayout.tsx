import { ReactNode } from "react";
import { PageLayout } from "@/components/layout/PageLayout";

interface CommitteePageLayoutProps {
  children: ReactNode;
  title: string;
}

export default function CommitteePageLayout({ title, children }: CommitteePageLayoutProps) {
  return (
    <PageLayout>
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/comm.png')" }}
      >
      </div>
      <div className="py-12 px-6">
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">{title}</h1>
    
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
      </div>
    </PageLayout>
  );
}
