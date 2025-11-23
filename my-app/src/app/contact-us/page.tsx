import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, MapPin, User } from "lucide-react";
import type { ContactPerson } from "@shared/schema";

export default function ContactUs() {
  const { data: contacts, isLoading } = useQuery<ContactPerson[]>({
    queryKey: ["/api/contacts"],
  });

  return (
    <PageLayout>
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4" data-testid="text-page-title">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get in touch with the conference organizing team
            </p>
          </div>

          <div className="space-y-8">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-48 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : contacts && contacts.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold font-heading mb-6">Contact Persons</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {contacts.map((contact) => (
                    <Card key={contact.id} className="hover-elevate transition-shadow" data-testid={`card-contact-${contact.id}`}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold font-heading" data-testid={`text-contact-name-${contact.id}`}>
                                {contact.name}
                              </h3>
                              <p className="text-sm text-primary" data-testid={`text-contact-designation-${contact.id}`}>
                                {contact.designation}
                              </p>
                            </div>
                          </div>

                          {contact.department && (
                            <p className="text-sm text-muted-foreground border-t pt-3" data-testid={`text-contact-department-${contact.id}`}>
                              {contact.department}
                            </p>
                          )}

                          <div className="space-y-3 border-t pt-3">
                            <a 
                              href={`mailto:${contact.email}`}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-2 py-1 -ml-2"
                              data-testid={`link-contact-email-${contact.id}`}
                            >
                              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                              <span className="break-all">{contact.email}</span>
                            </a>

                            <a
                              href={`tel:${contact.phone}`}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-2 py-1 -ml-2"
                              data-testid={`link-contact-phone-${contact.id}`}
                            >
                              <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{contact.phone}</span>
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Conference Venue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold font-heading mb-2">Guru Nanak Institute of Technology</h3>
                    <p className="text-muted-foreground">
                      Department of Computer Science and Engineering
                    </p>
                  </div>
                  <div className="text-muted-foreground">
                    <p>Greater Noida, Uttar Pradesh</p>
                    <p>India</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  For general questions about the conference, paper submissions, or registration, 
                  please feel free to reach out to any of the contact persons listed above. 
                  We aim to respond to all inquiries within 2-3 business days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
