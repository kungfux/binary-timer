const Footer = () => {
  return (
    <footer className="text-black py-4 flex justify-center text-s dark:text-white">
      <p className="my-4">
        <span className="uppercase">12-bit binary timer</span>
        <span className="px-2">😎</span>
        <span>kungfux &copy; {new Date().getFullYear()}</span>
      </p>
    </footer>
  );
};

export default Footer;
