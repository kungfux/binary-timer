import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} py-4 flex justify-center`}>
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
