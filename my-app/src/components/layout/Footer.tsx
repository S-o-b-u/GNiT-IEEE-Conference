import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold font-heading mb-4">About GNIT</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Guru Nanak Institute of Technology is committed to excellence in education and research, fostering innovation in technology and engineering.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-heading mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/call-for-paper" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-2 py-1 -ml-2 inline-block" data-testid="link-footer-call-for-paper">
                  Call for Paper
                </Link>
              </li>
              <li>
                <Link href="/important-dates" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-2 py-1 -ml-2 inline-block" data-testid="link-footer-dates">
                  Important Dates
                </Link>
              </li>
              <li>
                <Link href="/committee" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-2 py-1 -ml-2 inline-block" data-testid="link-footer-committee">
                  Committee
                </Link>
              </li>
              <li>
                <Link href="/registration" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-elevate rounded px-2 py-1 -ml-2 inline-block" data-testid="link-footer-registration">
                  Registration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-heading mb-4">Important Dates</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-medium text-foreground min-w-fit">Feb 15-16, 2026</span>
                <span>Conference Dates</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-heading mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Guru Nanak Institute of Technology, Greater Noida</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:icett@gnit.ac.in" className="hover:text-foreground transition-colors">
                  icett@gnit.ac.in
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+911234567890" className="hover:text-foreground transition-colors">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} Guru Nanak Institute of Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
