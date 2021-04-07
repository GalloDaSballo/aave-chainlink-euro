const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        Acknowledgments: While our implementation is different, I acknowledge
        that I took inspiration from:
        https://medium.com/unstoppabledomains/verifying-twitter-on-your-domain-with-chainlink-c8c88916ba0f
      </div>
      <div>
        Their solution of using a signature helped me with setting up user
        verification with chainlink and twitter
      </div>
    </footer>
  );
};

export default Footer;
