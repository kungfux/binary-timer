const Footer = () => {
  return (
    <footer className="py-4 flex justify-center text-gray-400 dark:text-grey-600">
      <p className="my-4">
        <span className="uppercase">
          <a href="https://github.com/kungfux/binarytimer">
            12-bit binary timer
          </a>
        </span>
        <span className="px-2">by</span>
        <span>
          <a href="https://kungfux.github.io/">kungfux</a> &copy;{" "}
          {new Date().getFullYear()}
        </span>
      </p>
    </footer>
  );
};

export default Footer;
