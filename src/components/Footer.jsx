function Footer() {
  const date = today.getFullYear();

  return (
    <div>
      <p>&copy; {date} Matthew Suekel</p>
      <a href="mailto:hello@matthewsuekel.com">Email</a>
    </div>
  );
}

export default Footer;
