import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header mono">
      <Link href="/">coordina Bim Consulting</Link>
      <nav>
        <Link href="/#work">Work</Link>
        <Link href="/#studio">Studio</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
