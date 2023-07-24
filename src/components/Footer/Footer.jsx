const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="footer mx-4 md:mx-0 footer-center  font-golos my-14 ">
        <p>
          Copyright &copy; {currentYear} All rights reserved by
          <b className="text-stone-500">College Hives</b>
        </p>
      </footer>
    );
  };
  
  export default Footer;
  