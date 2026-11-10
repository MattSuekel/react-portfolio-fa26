function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border py-4">
      <p className="font-sans text-sm text-muted">&copy; {year} Matthew Suekel</p>

      <a
        href="mailto:hello@matthewsuekel.com"
        className="font-sans text-sm text-muted hover:text-foreground"
      >
        Email
      </a>
    </footer>
  );
}

export default Footer;
